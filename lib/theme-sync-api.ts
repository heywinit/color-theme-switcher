"use client";

import type { ThemePreset } from "./types";

interface TweakCNThemeResponse {
	presets: Record<string, ThemePreset>;
	timestamp: string;
}

/**
 * Fetch the latest theme presets from TweakCN
 *
 * @param baseUrl The base URL for the TweakCN API (defaults to production)
 * @returns A promise that resolves to the theme presets and timestamp
 */
export async function fetchTweakCNThemes(
	baseUrl = "https://tweakcn.com",
): Promise<TweakCNThemeResponse> {
	try {
		const response = await fetch(`${baseUrl}/api/themes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch themes: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching themes:", error);
		throw error;
	}
}

/**
 * Merge the fetched themes with the local themes
 *
 * @param localThemes The local theme presets
 * @param remoteThemes The remote theme presets from TweakCN
 * @returns The merged theme presets
 */
export function mergeThemePresets(
	localThemes: Record<string, ThemePreset>,
	remoteThemes: Record<string, ThemePreset>,
): Record<string, ThemePreset> {
	// Start with a copy of local themes
	const mergedThemes = { ...localThemes };

	// Add or update with remote themes
	for (const [key, preset] of Object.entries(remoteThemes)) {
		// If the theme doesn't exist locally or has a newer timestamp, use the remote one
		if (
			!mergedThemes[key] ||
			(preset.createdAt &&
				(!mergedThemes[key].createdAt ||
					new Date(preset.createdAt) >
						new Date(mergedThemes[key].createdAt || "")))
		) {
			mergedThemes[key] = preset;
		}
	}

	return mergedThemes;
}

/**
 * Save the merged themes to local storage for offline use
 *
 * @param mergedThemes The merged theme presets
 * @param timestamp The timestamp of the last fetch
 */
export function saveThemesToLocalStorage(
	mergedThemes: Record<string, ThemePreset>,
	timestamp: string,
): void {
	try {
		localStorage.setItem("theme-presets", JSON.stringify(mergedThemes));
		localStorage.setItem("theme-presets-timestamp", timestamp);
	} catch (error) {
		console.error("Error saving themes to local storage:", error);
	}
}

/**
 * Load themes from local storage
 *
 * @returns The theme presets from local storage, or null if not found
 */
export function loadThemesFromLocalStorage(): {
	presets: Record<string, ThemePreset> | null;
	timestamp: string | null;
} {
	try {
		const presets = localStorage.getItem("theme-presets");
		const timestamp = localStorage.getItem("theme-presets-timestamp");

		return {
			presets: presets ? JSON.parse(presets) : null,
			timestamp,
		};
	} catch (error) {
		console.error("Error loading themes from local storage:", error);
		return { presets: null, timestamp: null };
	}
}

/**
 * Check if themes need to be updated based on the timestamp
 *
 * @param timestamp The timestamp of the last fetch
 * @param updateIntervalInHours The interval in hours to check for updates (default: 24)
 * @returns True if themes need to be updated, false otherwise
 */
export function shouldUpdateThemes(
	timestamp: string | null,
	updateIntervalInHours = 24,
): boolean {
	if (!timestamp) return true;

	const lastUpdate = new Date(timestamp);
	const now = new Date();

	// Calculate the time difference in hours
	const hoursSinceUpdate =
		Math.abs(now.getTime() - lastUpdate.getTime()) / 36e5;

	return hoursSinceUpdate > updateIntervalInHours;
}

/**
 * Save user's sync settings to local storage
 *
 * @param settings The user's sync settings
 */
export function saveUserSyncSettings({
	autoSync,
	syncInterval,
	syncUrl,
}: {
	autoSync?: boolean;
	syncInterval?: number;
	syncUrl?: string;
}): void {
	try {
		if (autoSync !== undefined) {
			localStorage.setItem("theme-auto-sync", String(autoSync));
		}

		if (syncInterval !== undefined) {
			localStorage.setItem("theme-sync-interval", String(syncInterval));
		}

		if (syncUrl !== undefined) {
			localStorage.setItem("theme-sync-url", syncUrl);
		}
	} catch (error) {
		console.error("Error saving sync settings:", error);
	}
}

/**
 * Apply theme sync settings
 *
 * Applies the user's theme sync settings and optionally triggers an immediate sync
 *
 * @param settings The sync settings to apply
 * @param syncFunction Optional function to trigger an immediate sync
 */
export function applyThemeSyncSettings({
	autoSync,
	syncInterval,
	syncUrl,
	syncNow = false,
	syncFunction,
}: {
	autoSync?: boolean;
	syncInterval?: number;
	syncUrl?: string;
	syncNow?: boolean;
	syncFunction?: () => Promise<void>;
}): void {
	// Save settings
	saveUserSyncSettings({ autoSync, syncInterval, syncUrl });

	// Trigger sync if requested
	if (syncNow && syncFunction) {
		syncFunction().catch((err) => {
			console.error("Error during immediate sync:", err);
		});
	}
}
