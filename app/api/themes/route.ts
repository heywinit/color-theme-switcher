import { NextResponse } from "next/server";
import { presets } from "@/lib/theme-presets";
import fs from "node:fs";
import path from "node:path";
import type { ThemePreset } from "@/lib/types";

/**
 * GET /api/themes
 *
 * Returns all available theme presets
 * Fetches themes directly from the tweakcn project's file system
 */
export async function GET() {
	try {
		const localPresets = presets;
		let mergedPresets = { ...localPresets };
		let source = "local";

		// Path to tweakcn themes directory (relative to this file)
		// Adjust this path as needed based on your file structure
		const tweakCNThemesPath = path.resolve(
			process.cwd(),
			"../tweakcn/utils/theme-presets.ts",
		);

		// Check if tweakcn theme presets file exists
		if (fs.existsSync(tweakCNThemesPath)) {
			try {
				// Read the file contents
				const fileContent = fs.readFileSync(tweakCNThemesPath, "utf8");

				// This is a more secure way to extract theme presets
				// We'll use a combination of regex and JSON parsing rather than eval

				// Extract individual theme objects from the file content
				const themeRegex =
					/"([\w-]+)":\s*{[\s\S]*?createdAt:\s*"([^"]+)"[\s\S]*?label:\s*"([^"]+)"[\s\S]*?styles:\s*{([\s\S]*?)},/g;
				const themes: Record<string, ThemePreset> = {};

				// Extract theme data
				let themeMatch: RegExpExecArray | null = themeRegex.exec(fileContent);
				while (themeMatch !== null) {
					const themeName = themeMatch[1];
					const createdAt = themeMatch[2];
					const label = themeMatch[3];
					const stylesContent = themeMatch[4];

					// Extract styles content
					const lightStylesMatch = stylesContent.match(
						/light:\s*{([\s\S]*?)},/,
					);
					const darkStylesMatch = stylesContent.match(/dark:\s*{([\s\S]*?)},?/);

					// Create a theme preset object
					const themePreset: ThemePreset = {
						label,
						createdAt,
						styles: {
							light: {},
							dark: {},
						},
					};

					// Parse style properties
					if (lightStylesMatch?.[1]) {
						const lightStyles = extractStyleProps(lightStylesMatch[1]);
						themePreset.styles.light = lightStyles;
					}

					if (darkStylesMatch?.[1]) {
						const darkStyles = extractStyleProps(darkStylesMatch[1]);
						themePreset.styles.dark = darkStyles;
					}

					themes[themeName] = themePreset;

					// Get the next match
					themeMatch = themeRegex.exec(fileContent);
				}

				// Merge presets, preferring tweakCN presets where they exist
				mergedPresets = { ...localPresets };
				for (const [key, preset] of Object.entries(themes)) {
					// Only update if the theme doesn't exist locally or has a newer timestamp
					if (
						!mergedPresets[key] ||
						(preset.createdAt &&
							(!mergedPresets[key].createdAt ||
								new Date(preset.createdAt) >
									new Date(mergedPresets[key].createdAt || "")))
					) {
						mergedPresets[key] = preset;
					}
				}

				if (Object.keys(themes).length > 0) {
					source = "merged";
				}
			} catch (readError) {
				console.warn("Error reading tweakcn presets file:", readError);
			}
		}

		return NextResponse.json({
			presets: mergedPresets,
			timestamp: new Date().toISOString(),
			source,
		});
	} catch (error) {
		console.error("Error processing themes:", error);
		return NextResponse.json(
			{ error: "Failed to fetch themes" },
			{ status: 500 },
		);
	}
}

/**
 * Helper function to extract style properties from a string content
 */
function extractStyleProps(content: string): Record<string, string> {
	const props: Record<string, string> = {};
	const propRegex = /"([\w-]+)":\s*"([^"]+)"/g;

	// Extract property data
	let propMatch: RegExpExecArray | null = propRegex.exec(content);
	while (propMatch !== null) {
		const propName = propMatch[1];
		const propValue = propMatch[2];
		props[propName] = propValue;

		// Get the next match
		propMatch = propRegex.exec(content);
	}

	return props;
}
