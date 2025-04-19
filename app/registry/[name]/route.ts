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

		// List of potential path resolvers to try
		const pathResolvers = [
			// Original path
			(path: string) => path,
			// Try with ./ prefix removed
			(path: string) => (path.startsWith("./") ? path.slice(2) : path),
			// Try with colorswitchcn/ prefix
			(path: string) => {
				const normalized = path.startsWith("./") ? path.slice(2) : path;
				return `colorswitchcn/${normalized}`;
			},
			// Try with src/ prefix
			(path: string) => {
				const normalized = path.startsWith("./") ? path.slice(2) : path;
				return `src/${normalized}`;
			},
		];

		console.log(`Current working directory: ${process.cwd()}`);

		// Try to find existing files
		const filesWithContent = await Promise.all(
			registryItem.files.map(async (file) => {
				try {
					// Try each path resolver in sequence
					for (const resolver of pathResolvers) {
						const resolvedPath = resolver(file.path);
						const filePath = path.join(process.cwd(), resolvedPath);

						console.log(`Trying path: ${filePath}`);

						try {
							// Try to read the file
							const content = await fs.readFile(filePath, "utf8");
							console.log(`Successfully read file: ${filePath}`);
							return { ...file, content };
						} catch {
							// Continue to next resolver if file not found
							console.log(`Failed to read: ${filePath}`);
						}
					}

					// If we get here, we've tried all resolvers and failed
					throw new Error(`Could not resolve file path: ${file.path}`);
				} catch (error) {
					console.error(`Error reading file for path ${file.path}:`, error);
					console.error(`CWD: ${process.cwd()}`);

					// Let's try direct fs.readdir to see what files are available
					try {
						const dir = path.dirname(
							path.join(process.cwd(), file.path.replace(/^\.\//, "")),
						);
						console.log(`Trying to list directory: ${dir}`);
						const files = await fs.readdir(dir, { withFileTypes: true });
						console.log(
							`Available files in ${dir}: ${files.map((f) => f.name).join(", ")}`,
						);
					} catch (dirError) {
						console.error("Could not list directory:", dirError);
					}

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
