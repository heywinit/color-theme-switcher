"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import {
	getPresetThemeStyles,
	presets as defaultPresets,
} from "./theme-presets";
import type { ThemeState, ThemeMode } from "./types";
import { applyTheme } from "./fix-global-css";

export interface UseThemeSwitchOptions {
	defaultPreset?: string;
}

export function useThemeSwitch({
	defaultPreset = "default",
}: UseThemeSwitchOptions = {}) {
	// Use next-themes for base theme functionality
	const { setTheme, resolvedTheme } = useTheme();

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

	// Handle component mount - only runs on client
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Initialize theme state from localStorage on component mount
	useEffect(() => {
		if (!isMounted || hasInitialized.current) return;

		try {
			const currentMode = (resolvedTheme || "light") as ThemeMode;
			const savedPreset = localStorage.getItem("theme-preset") || defaultPreset;

			// Set theme state
			setThemeState({
				currentMode,
				preset: savedPreset,
				styles: getPresetThemeStyles(savedPreset),
			});

			setIsInitialized(true);
			hasInitialized.current = true;
		} catch (error) {
			console.error("Error initializing theme:", error);
		}
	}, [isMounted, resolvedTheme, defaultPreset]);

	// Apply theme changes whenever state changes
	useEffect(() => {
		if (!isMounted) return;

		try {
			// Apply theme to document
			applyTheme(themeState);

			// Save to localStorage
			localStorage.setItem("theme-preset", themeState.preset);
			localStorage.setItem("theme-mode", themeState.currentMode);
		} catch (error) {
			console.error("Error applying theme changes:", error);
		}
	}, [themeState, isMounted]);

	// Switch to another theme preset
	const switchPreset = (presetName: string) => {
		try {
			let finalPresetName = presetName;
			if (!allPresets[presetName]) {
				console.warn(`Preset "${presetName}" not found, using default`);
				finalPresetName = defaultPreset;
			}

			// Update theme state
			setThemeState((prevState) => ({
				...prevState,
				preset: finalPresetName,
				styles: getPresetThemeStyles(finalPresetName),
			}));

			console.log(`Switched to preset: ${finalPresetName}`);
		} catch (error) {
			console.error("Error switching theme preset:", error);
		}
	};

	// Switch between light and dark mode
	const toggleMode = () => {
		const newMode = themeState.currentMode === "dark" ? "light" : "dark";

		// Update both next-themes and our local state
		setTheme(newMode);
		setThemeState((prevState) => ({
			...prevState,
			currentMode: newMode,
		}));

		console.log(`Toggled theme mode to: ${newMode}`);
	};

	return {
		theme: themeState,
		isInitialized,
		switchPreset,
		toggleMode,
		allPresets,
	};
}
