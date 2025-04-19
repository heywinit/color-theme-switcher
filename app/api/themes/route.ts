import { NextResponse } from "next/server";
import { presets } from "@/lib/theme-presets";

/**
 * GET /api/themes
 *
 * Returns all available theme presets
 * Based on code from TweakCN (https://tweakcn.com) by Sahaj (https://github.com/jnsahaj)
 */
export async function GET() {
	try {
		// Use only local presets
		const localPresets = presets;

		return NextResponse.json({
			presets: localPresets,
			timestamp: new Date().toISOString(),
			source: "local",
		});
	} catch (error) {
		console.error("Error processing themes:", error);
		return NextResponse.json(
			{ error: "Failed to fetch themes" },
			{ status: 500 },
		);
	}
}
