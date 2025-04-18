"use client";

import { useState, useEffect, useCallback } from "react";
import {
	fetchTweakCNThemes,
	mergeThemePresets,
	loadThemesFromLocalStorage,
	saveThemesToLocalStorage,
	shouldUpdateThemes,
} from "./theme-sync-api";
import { presets as localPresets } from "./theme-presets";
import type { ThemePreset } from "./types";

interface UseThemeSyncOptions {
	/**
	 * Whether to sync automatically on mount
	 */
	syncOnMount?: boolean;

	/**
	 * The interval in hours to check for updates
	 */
	updateInterval?: number;

	/**
	 * The base URL for the TweakCN API
	 */
	baseUrl?: string;
}

interface UseThemeSyncResult {
	/**
	 * All theme presets (local + remote)
	 */
	presets: Record<string, ThemePreset>;

	/**
	 * Whether a sync is currently in progress
	 */
	isSyncing: boolean;

	/**
	 * Last time the themes were synced
	 */
	lastSyncTime: Date | null;

	/**
	 * Any error that occurred during syncing
	 */
	error: Error | null;

	/**
	 * Manually trigger a sync
	 */
	syncThemes: () => Promise<void>;
}

// Load user preferences from localStorage
function loadUserPreferences(): {
	autoSync: boolean;
	syncInterval: number;
	baseUrl: string;
} {
	if (typeof window === "undefined") {
		return {
			autoSync: true,
			syncInterval: 24,
			baseUrl: "https://tweakcn.com",
		};
	}

	try {
		const autoSync = localStorage.getItem("theme-auto-sync");
		const syncInterval = localStorage.getItem("theme-sync-interval");
		const baseUrl = localStorage.getItem("theme-sync-url");

		return {
			autoSync: autoSync === null ? true : autoSync === "true",
			syncInterval: syncInterval ? Number.parseInt(syncInterval, 10) : 24,
			baseUrl: baseUrl || "https://tweakcn.com",
		};
	} catch (error) {
		console.error("Error loading user preferences:", error);
		return {
			autoSync: true,
			syncInterval: 24,
			baseUrl: "https://tweakcn.com",
		};
	}
}

export function useThemeSync({
	syncOnMount: forceSyncOnMount,
	updateInterval: forceUpdateInterval,
	baseUrl: forceBaseUrl,
}: UseThemeSyncOptions = {}): UseThemeSyncResult {
	// Load user preferences
	const userPrefs = loadUserPreferences();

	// Use provided options or fallback to user preferences
	const effectiveSyncOnMount =
		forceSyncOnMount !== undefined ? forceSyncOnMount : userPrefs.autoSync;
	const effectiveUpdateInterval = forceUpdateInterval || userPrefs.syncInterval;
	const effectiveBaseUrl = forceBaseUrl || userPrefs.baseUrl;

	// State to track all theme presets (local + remote)
	const [allPresets, setAllPresets] =
		useState<Record<string, ThemePreset>>(localPresets);
	const [isSyncing, setIsSyncing] = useState(false);
	const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
	const [error, setError] = useState<Error | null>(null);

	// Function to sync themes - use useCallback to avoid dependency issues
	const syncThemes = useCallback(async (): Promise<void> => {
		if (isSyncing) return;

		setIsSyncing(true);
		setError(null);

		try {
			// Fetch remote themes
			const { presets: remotePresets, timestamp } =
				await fetchTweakCNThemes(effectiveBaseUrl);

			// Merge with local themes
			const merged = mergeThemePresets(localPresets, remotePresets);

			// Save to state and local storage
			setAllPresets(merged);
			setLastSyncTime(new Date());
			saveThemesToLocalStorage(merged, timestamp || new Date().toISOString());
		} catch (err) {
			console.error("Error syncing themes:", err);
			setError(err instanceof Error ? err : new Error(String(err)));

			// Fallback to local storage if available
			const { presets, timestamp } = loadThemesFromLocalStorage();
			if (presets) {
				setAllPresets(presets);
				setLastSyncTime(timestamp ? new Date(timestamp) : null);
			}
		} finally {
			setIsSyncing(false);
		}
	}, [effectiveBaseUrl, isSyncing]);

	// Load themes from local storage and check if update is needed
	useEffect(() => {
		const { presets, timestamp } = loadThemesFromLocalStorage();

		// If we have cached themes, use them initially
		if (presets) {
			setAllPresets(mergeThemePresets(localPresets, presets));
			setLastSyncTime(timestamp ? new Date(timestamp) : null);
		}

		// Check if we need to update based on user preferences
		if (
			effectiveSyncOnMount &&
			shouldUpdateThemes(timestamp, effectiveUpdateInterval)
		) {
			syncThemes();
		}
	}, [effectiveSyncOnMount, effectiveUpdateInterval, syncThemes]);

	return {
		presets: allPresets,
		isSyncing,
		lastSyncTime,
		error,
		syncThemes,
	};
}
