"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { colorFormatter } from "./color-converter";
import { ThemeMode, ThemeState, ThemeStyles } from "./types";
import { applyStyleToElement } from "./apply-style-to-element";
import { defaultThemeState, getPresetThemeStyles } from "./theme-presets";

// Theme context type
type ThemeContextType = {
	themeState: ThemeState;
	setThemeMode: (mode: ThemeMode) => void;
	applyThemePreset: (preset: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Common non-color styling properties
const COMMON_STYLES = [
	"radius",
	"font-sans",
	"font-serif",
	"font-mono",
	"shadow-color",
	"shadow-opacity",
	"shadow-blur",
	"shadow-spread",
	"shadow-offset-x",
	"shadow-offset-y",
];

// Helper function to apply common styles
const applyCommonStyles = (
	root: HTMLElement,
	themeStyles: Record<string, string | undefined>,
) => {
	Object.entries(themeStyles)
		.filter(([key]) => COMMON_STYLES.includes(key))
		.forEach(([key, value]) => {
			if (value) {
				applyStyleToElement(root, key, value);
			}
		});
};

// Helper function to apply theme colors
const applyThemeColors = (
	root: HTMLElement,
	themeStyles: ThemeStyles,
	mode: ThemeMode,
) => {
	Object.entries(themeStyles[mode]).forEach(([key, value]) => {
		if (value && typeof value === "string" && !COMMON_STYLES.includes(key)) {
			const hslValue = colorFormatter(value, "hsl", "4");
			applyStyleToElement(root, key, hslValue);
		}
	});
};

// Helper function to update theme class
const updateThemeClass = (root: HTMLElement, mode: ThemeMode) => {
	if (mode === "light") {
		root.classList.remove("dark");
	} else {
		root.classList.add("dark");
	}
};

// Set shadow CSS variables based on theme
const setShadowVariables = (state: ThemeState) => {
	const mode = state.currentMode;
	const styles = state.styles[mode];

	if (typeof window === "undefined") return;

	const root = document.documentElement;

	// Base shadow properties
	const color = styles["shadow-color"] || "hsl(0 0% 0%)";
	const opacity = styles["shadow-opacity"] || "0.1";
	const blur = styles["shadow-blur"] || "3px";
	const spread = styles["shadow-spread"] || "0px";
	const offsetX = styles["shadow-offset-x"] || "0px";
	const offsetY = styles["shadow-offset-y"] || "1px";

	// Create shadow strings
	const boxShadow = `${offsetX} ${offsetY} ${blur} ${spread} ${color.replace("hsl", "hsla").replace(")", `, ${opacity})`)}`;

	// Apply shadows to root
	root.style.setProperty("--shadow", boxShadow);
};

// Custom theme provider component
export function CustomThemeProvider({
	children,
}: { children: React.ReactNode }) {
	// State to track theme
	const [themeState, setThemeState] = useState<ThemeState>(defaultThemeState);

	// Initialize theme from localStorage or system preference if available
	useEffect(() => {
		if (typeof window === "undefined") return;

		const savedTheme = localStorage.getItem("theme-mode") as ThemeMode | null;
		const savedPreset = localStorage.getItem("theme-preset") || "default";

		// System preference for dark mode
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const initialMode = savedTheme || (prefersDark ? "dark" : "light");

		// Set initial theme state
		setThemeState({
			currentMode: initialMode,
			preset: savedPreset,
			styles: getPresetThemeStyles(savedPreset),
		});
	}, []);

	// Apply theme whenever it changes
	useEffect(() => {
		if (typeof window === "undefined") return;

		const root = document.documentElement;
		const { currentMode: mode, styles: themeStyles } = themeState;

		// Save preferences
		localStorage.setItem("theme-mode", mode);
		localStorage.setItem("theme-preset", themeState.preset);

		// Apply theme
		updateThemeClass(root, mode);
		applyCommonStyles(root, themeStyles.light);
		applyThemeColors(root, themeStyles, mode);
		setShadowVariables(themeState);
	}, [themeState]);

	// Change theme mode (light/dark)
	const setThemeMode = (mode: ThemeMode) => {
		setThemeState((prev) => ({
			...prev,
			currentMode: mode,
		}));
	};

	// Apply a theme preset
	const applyThemePreset = (preset: string) => {
		setThemeState((prev) => ({
			...prev,
			preset,
			styles: getPresetThemeStyles(preset),
		}));
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

// Hook to use theme
export function useTheme() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within a CustomThemeProvider");
	}

	return context;
}
