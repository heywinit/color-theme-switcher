/**
 * Theme provider for ColorSwitchCN.
 * Implementation inspired by and compatible with TweakCN (https://tweakcn.com) by Sahaj (https://github.com/jnsahaj).
 */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ThemeMode, ThemeState, ThemeProviderProps } from "./types";
import { defaultThemeState, getPresetThemeStyles } from "./theme-presets";
import { applyTheme } from "./fix-global-css";

// Theme context type
type ThemeContextType = {
	themeState: ThemeState;
	setThemeMode: (mode: ThemeMode) => void;
	applyThemePreset: (preset: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom theme provider component
export function CustomThemeProvider({
	children,
	defaultPreset,
}: ThemeProviderProps) {
	// State to track theme
	const [themeState, setThemeState] = useState<ThemeState>(defaultThemeState);
	const [isInitialized, setIsInitialized] = useState(false);

	// Initialize theme from localStorage or system preference if available
	useEffect(() => {
		if (typeof window === "undefined") return;

		const savedTheme = localStorage.getItem("theme-mode") as ThemeMode | null;
		const savedPreset =
			localStorage.getItem("theme-preset") || defaultPreset || "default";

		// System preference for dark mode
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const initialMode = savedTheme || (prefersDark ? "dark" : "light");

		// Set initial theme state
		const initialState = {
			currentMode: initialMode,
			preset: savedPreset,
			styles: getPresetThemeStyles(savedPreset),
		};

		setThemeState(initialState);
		setIsInitialized(true);

		// Apply initial theme styles
		applyTheme(initialState);
	}, [defaultPreset]);

	// Apply theme whenever it changes
	useEffect(() => {
		if (typeof window === "undefined" || !isInitialized) return;

		// Save preferences
		localStorage.setItem("theme-mode", themeState.currentMode);
		localStorage.setItem("theme-preset", themeState.preset);

		// Apply the theme styles
		applyTheme(themeState);

		console.log(
			`Theme applied: ${themeState.preset}, mode: ${themeState.currentMode}`,
		);
	}, [themeState, isInitialized]);

	// Change theme mode (light/dark)
	const setThemeMode = (mode: ThemeMode) => {
		setThemeState((prev) => ({
			...prev,
			currentMode: mode,
		}));
	};

	// Apply a theme preset
	const applyThemePreset = (preset: string) => {
		console.log(`Applying preset: ${preset}`);
		const newStyles = getPresetThemeStyles(preset);

		setThemeState({
			currentMode: themeState.currentMode,
			preset,
			styles: newStyles,
		});
	};

	// Provider value
	const value = {
		themeState,
		setThemeMode,
		applyThemePreset,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

// Hook to access theme context
export function useTheme(): ThemeContextType {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
