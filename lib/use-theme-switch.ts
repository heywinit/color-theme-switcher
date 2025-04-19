"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useTheme } from "next-themes";
import {
	getPresetThemeStyles,
	presets as defaultPresets,
} from "./theme-presets";
import { quickApplyTheme } from "./fix-global-css";
import type { ThemeMode, ThemeState, ThemeTransitionOptions } from "./types";

export interface UseThemeSwitchOptions {
	defaultPreset?: string;
	transitionOptions?: ThemeTransitionOptions;
	disableTransition?: boolean;
}

export function useThemeSwitch({
	defaultPreset = "default",
	transitionOptions = { type: "fade", duration: 300, easing: "ease-in-out" },
	disableTransition = false,
}: UseThemeSwitchOptions = {}) {
	// Use next-themes for base theme functionality
	const { theme, setTheme, resolvedTheme } = useTheme();

	// Track if we've already initialized to prevent infinite updates
	const hasInitialized = useRef(false);

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

	// Use local presets
	const allPresets = useMemo(() => {
		return defaultPresets;
	}, []);

	// Memoize transition options to prevent re-renders
	const memoizedTransitionOptions = useMemo(
		() => (disableTransition ? { type: "none" as const } : transitionOptions),
		[disableTransition, transitionOptions],
	);

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
		quickApplyTheme(newState, memoizedTransitionOptions, coords);
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
		quickApplyTheme(newState, memoizedTransitionOptions);

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
	};
}
