import { NextResponse } from "next/server";
import { presets } from "@/lib/theme-presets";

/**
 * GET /api/themes
 *
 * Returns all available theme presets
 */
export async function GET() {
	try {
		// In a real implementation, you might want to fetch the latest themes
		// from tweakcn here and merge them with the local presets

		return NextResponse.json({
			presets,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error fetching themes:", error);
		return NextResponse.json(
			{ error: "Failed to fetch themes" },
			{ status: 500 },
		);
	}
}
