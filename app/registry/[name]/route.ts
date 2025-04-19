import { NextResponse } from "next/server";
import path from "node:path";
import { promises as fs } from "node:fs";
import { registryItemSchema } from "shadcn/registry";

// This route shows an example for serving a component using a route handler.
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ name: string }> },
) {
	try {
		const { name } = await params;
		// Cache the registry import
		const registryData = await import("@/registry.json");
		const registry = registryData.default;

		// Find the component from the registry.
		const component = registry.items.find((c) => c.name === name);

		// If the component is not found, return a 404 error.
		if (!component) {
			return NextResponse.json(
				{ error: "Component not found" },
				{ status: 404 },
			);
		}

		// Validate before file operations.
		const registryItem = registryItemSchema.parse(component);

		// If the component has no files, return a 400 error.
		if (!registryItem.files?.length) {
			return NextResponse.json(
				{ error: "Component has no files" },
				{ status: 400 },
			);
		}

		// Environment detection
		const isVercel = process.env.VERCEL === "1";
		console.log(`Detected environment: ${isVercel ? "Vercel" : "Local"}`);
		console.log(`Current working directory: ${process.cwd()}`);

		// If we're in Vercel environment, we need a different approach
		if (isVercel) {
			// Construct URLs to the public files instead of trying to read them
			const getPublicUrl = (filePath: string) => {
				// Remove leading ./ if present
				const cleanPath = filePath.startsWith("./")
					? filePath.slice(2)
					: filePath;
				// Get the base URL from the request
				const host = request.headers.get("host") || "localhost";
				const protocol = host.includes("localhost") ? "http" : "https";
				const baseUrl = `${protocol}://${host}`;

				// Construct the public URL
				return `${baseUrl}/registry/${cleanPath}`;
			};

			return NextResponse.json({
				...registryItem,
				files: registryItem.files.map((file) => ({
					...file,
					content: `// This component is available at: ${getPublicUrl(file.path)}\n// Please access the code from that URL.`,
					publicUrl: getPublicUrl(file.path),
				})),
				isVercelDeployment: true,
			});
		}

		// For local development, try to read the files normally
		const filesWithContent = await Promise.all(
			registryItem.files.map(async (file) => {
				try {
					// For local development, simplify path resolution
					const normalizedPath = file.path.startsWith("./")
						? file.path.slice(2)
						: file.path;

					const filePath = path.join(process.cwd(), normalizedPath);

					try {
						const content = await fs.readFile(filePath, "utf8");
						return { ...file, content };
					} catch (error) {
						console.error(`Failed to read: ${filePath}`);
						throw error;
					}
				} catch (error) {
					console.error(`Error reading file for path ${file.path}:`, error);
					throw error;
				}
			}),
		);

		// Return the component with the files.
		return NextResponse.json({ ...registryItem, files: filesWithContent });
	} catch (error) {
		console.error("Error processing component request:", error);
		return NextResponse.json(
			{
				error: "Something went wrong",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}
}
