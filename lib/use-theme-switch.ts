"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useTheme } from "next-themes";
import {
	getPresetThemeStyles,
	presets as defaultPresets,
} from "./theme-presets";
import { quickApplyTheme } from "./fix-global-css";
import type { ThemeMode, ThemeState, ThemeTransitionOptions } from "./types";
import { useThemeSync } from "./use-theme-sync";

export interface UseThemeSwitchOptions {
	defaultPreset?: string;
	transitionOptions?: ThemeTransitionOptions;
	disableTransition?: boolean;
	syncThemes?: boolean; // Whether to sync themes with tweakcn
	syncBaseUrl?: string; // Base URL for the tweakcn API
}

export function useThemeSwitch({
	defaultPreset = "default",
	transitionOptions = { type: "fade", duration: 300, easing: "ease-in-out" },
	disableTransition = false,
	syncThemes = true,
	syncBaseUrl = "https://tweakcn.com",
}: UseThemeSwitchOptions = {}) {
	// Use next-themes for base theme functionality
	const { theme, setTheme, resolvedTheme } = useTheme();

	// Track if we've already initialized to prevent infinite updates
	const hasInitialized = useRef(false);

	// Sync themes with tweakcn if enabled
	const {
		presets: syncedPresets,
		isSyncing,
		lastSyncTime,
		syncThemes: triggerSync,
	} = useThemeSync({
		syncOnMount: syncThemes,
		baseUrl: syncBaseUrl,
	});

	// Use a safe initial state for server rendering
	const initialState: ThemeState = {
		currentMode: "light", // Default for SSR
		preset: defaultPreset,
		styles: getPresetThemeStyles(defaultPreset),
	};

	// Custom theme state
	const [themeState, setThemeState] = useState<ThemeState>(initialState);
	const [isInitialized, setIsInitialized] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [actualTransitionOptions, setActualTransitionOptions] =
		useState<ThemeTransitionOptions>(
			disableTransition ? { type: "none" } : transitionOptions,
		);

	// Combine default presets with synced presets
	const allPresets = useMemo(() => {
		// During server rendering or before sync, use default presets
		if (!isMounted) return defaultPresets;

		return syncedPresets;
	}, [syncedPresets, isMounted]);

	// Handle component mount - only runs on client
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Initialize theme from localStorage on first client render
	// Only run once to prevent infinite loops
	useEffect(() => {
		if (typeof window === "undefined" || hasInitialized.current) return;

		// Skip if theme is not yet available
		if (!theme && !resolvedTheme) return;

		// Use resolved theme from next-themes
		const actualTheme = ((resolvedTheme || theme) as ThemeMode) || "light";
		const savedPreset = localStorage.getItem("theme-preset") || defaultPreset;

		// Set initial theme state
		const initialState = {
			currentMode: actualTheme,
			preset: savedPreset,
			styles: getPresetThemeStyles(savedPreset, allPresets),
		};

		setThemeState(initialState);
		setIsInitialized(true);
		hasInitialized.current = true;

		// Apply initial theme directly (avoid delay)
		quickApplyTheme(initialState, { type: "none" });
	}, [defaultPreset, theme, resolvedTheme, allPresets]);

	// Update currentMode when theme changes from next-themes
	// This handles system theme changes and external theme changes
	useEffect(() => {
		if (!isMounted || !isInitialized) return;

		const newMode = (resolvedTheme || theme) as ThemeMode;
		if (newMode && newMode !== themeState.currentMode) {
			setThemeState((prev) => ({
				...prev,
				currentMode: newMode,
			}));
		}
	}, [theme, resolvedTheme, isMounted, isInitialized, themeState.currentMode]);

	// Update transition options if props change
	useEffect(() => {
		setActualTransitionOptions(
			disableTransition ? { type: "none" } : transitionOptions,
		);
	}, [disableTransition, transitionOptions]);

	// Apply theme whenever it changes
	useEffect(() => {
		if (typeof window === "undefined" || !isInitialized) return;

		// Save preferences
		localStorage.setItem("theme-preset", themeState.preset);
	}, [themeState.preset, isInitialized]);

	// Change theme mode (light/dark)
	const setThemeMode = (mode: ThemeMode, coords?: { x: number; y: number }) => {
		// First update next-themes - this will later trigger the effect above
		setTheme(mode);

		// Immediately apply visual change with transition
		const newState = {
			...themeState,
			currentMode: mode,
		};

		// Apply theme with transition immediately
		quickApplyTheme(newState, actualTransitionOptions, coords);
	};

	// Apply a theme preset
	const applyThemePreset = (preset: string) => {
		if (!allPresets[preset]) {
			console.warn(`Theme preset "${preset}" not found, using default`);
			return;
		}

		const newStyles = getPresetThemeStyles(preset, allPresets);

		// Apply the new theme state
		const newState = {
			...themeState,
			preset,
			styles: newStyles,
		};

		// Also apply immediately with transition
		quickApplyTheme(newState, actualTransitionOptions);

		// Update state
		setThemeState(newState);
		localStorage.setItem("theme-preset", preset);
	};

	// Get preset display name
	const getPresetLabel = (presetKey: string) => {
		return (
			allPresets[presetKey]?.label ||
			presetKey
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ")
		);
	};

	// Get all available presets
	const getAllPresets = () => {
		return Object.keys(allPresets).map((key) => ({
			id: key,
			label: getPresetLabel(key),
			styles: allPresets[key].styles,
		}));
	};

	// Return safe values for SSR, and actual values on the client
	return {
		theme: isMounted ? themeState.currentMode : "light",
		setTheme: setThemeMode,
		preset: isMounted ? themeState.preset : defaultPreset,
		setPreset: applyThemePreset,
		styles: themeState.styles,
		presets: getAllPresets(),
		getPresetLabel,
		isMounted,

		// Theme sync related
		syncStatus: {
			isSyncing,
			lastSyncTime,
		},
		syncThemes: triggerSync,
	};
}
