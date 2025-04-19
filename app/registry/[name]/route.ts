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

		// Read all files in parallel.
		const filesWithContent = await Promise.all(
			registryItem.files.map(async (file) => {
				try {
					// In Vercel, we need to use relative imports from the project root
					// Remove leading './' if present
					const normalizedPath = file.path.startsWith("./")
						? file.path.slice(2)
						: file.path;

					// First try the path as specified in registry
					let filePath = path.join(process.cwd(), normalizedPath);

					try {
						const content = await fs.readFile(filePath, "utf8");
						return { ...file, content };
					} catch {
						// If that fails, try with "/colorswitchcn" prefix
						filePath = path.join(
							process.cwd(),
							"colorswitchcn",
							normalizedPath,
						);
						const content = await fs.readFile(filePath, "utf8");
						return { ...file, content };
					}
				} catch (error) {
					console.error(`Error reading file for path ${file.path}:`, error);
					console.error(`CWD: ${process.cwd()}`);
					throw error;
				}
			}),
		);

		// Return the component with the files.
		return NextResponse.json({ ...registryItem, files: filesWithContent });
	} catch (error) {
		console.error("Error processing component request:", error);
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 },
		);
	}
}
