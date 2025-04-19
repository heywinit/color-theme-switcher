/**
 * Theme provider for ColorSwitchCN.
 * Implementation inspired by and compatible with TweakCN (https://tweakcn.com) by Sahaj (https://github.com/jnsahaj).
 */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type {
	ThemeMode,
	ThemeState,
	ThemeProviderProps,
	ThemeTransitionOptions,
	ThemeTransitionType,
} from "./types";
import { defaultThemeState, getPresetThemeStyles } from "./theme-presets";
import { quickApplyTheme } from "./fix-global-css";
import { DEFAULT_TRANSITION } from "./theme-transition";

// Theme context type
type ThemeContextType = {
	themeState: ThemeState;
	setThemeMode: (mode: ThemeMode, coords?: { x: number; y: number }) => void;
	applyThemePreset: (preset: string) => void;
	transitionOptions: ThemeTransitionOptions;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Get transition options from localStorage if available
function getTransitionOptionsFromStorage(): ThemeTransitionOptions | null {
	if (typeof window === "undefined") return null;

	try {
		// Read values from localStorage
		const type = localStorage.getItem(
			"theme-transition-type",
		) as ThemeTransitionType;
		const durationStr = localStorage.getItem("theme-transition-duration");
		const disabledStr = localStorage.getItem("theme-transition-disabled");

		if (!type && !durationStr && !disabledStr) return null;

		// Convert values to appropriate types
		const duration = durationStr ? Number.parseInt(durationStr, 10) : undefined;
		const disabled = disabledStr ? disabledStr === "true" : undefined;

		// If transition is disabled, return none type
		if (disabled) {
			return { type: "none" };
		}

		// Return combined transition options
		return {
			type: type || DEFAULT_TRANSITION.type,
			duration:
				duration !== undefined && !Number.isNaN(duration)
					? duration
					: DEFAULT_TRANSITION.duration,
			easing: DEFAULT_TRANSITION.easing,
		};
	} catch (error) {
		console.error("Error reading transition options from localStorage:", error);
		return null;
	}
}

// Custom theme provider component
export function CustomThemeProvider({
	children,
	defaultPreset,
	transitionOptions = DEFAULT_TRANSITION,
	disableTransition = false,
}: ThemeProviderProps) {
	// State to track theme
	const [themeState, setThemeState] = useState<ThemeState>(defaultThemeState);
	const [isInitialized, setIsInitialized] = useState(false);
	const [actualTransitionOptions, setActualTransitionOptions] =
		useState<ThemeTransitionOptions>(
			disableTransition ? { type: "none" } : transitionOptions,
		);

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

		// Check for stored transition options
		const storedTransitionOptions = getTransitionOptionsFromStorage();
		if (storedTransitionOptions) {
			setActualTransitionOptions(storedTransitionOptions);
		}

		// Apply initial theme directly (avoid delay)
		quickApplyTheme(initialState, { type: "none" });
	}, [defaultPreset]);

	// Update transition options if props change or localStorage changes
	useEffect(() => {
		const storedTransitionOptions = getTransitionOptionsFromStorage();

		// Prioritize localStorage values over props
		if (storedTransitionOptions) {
			setActualTransitionOptions(storedTransitionOptions);
		} else {
			setActualTransitionOptions(
				disableTransition ? { type: "none" } : transitionOptions,
			);
		}
	}, [disableTransition, transitionOptions]);

	// Listen for storage events to update transitions
	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleStorageChange = () => {
			const storedOptions = getTransitionOptionsFromStorage();
			if (storedOptions) {
				setActualTransitionOptions(storedOptions);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	// Apply theme whenever it changes
	useEffect(() => {
		if (typeof window === "undefined" || !isInitialized) return;

		// Save preferences
		localStorage.setItem("theme-mode", themeState.currentMode);
		localStorage.setItem("theme-preset", themeState.preset);

		console.log(
			`Theme applied: ${themeState.preset}, mode: ${themeState.currentMode}`,
		);
	}, [themeState, isInitialized]);

	// Change theme mode (light/dark)
	const setThemeMode = (mode: ThemeMode, coords?: { x: number; y: number }) => {
		setThemeState((prev) => {
			const newState = {
				...prev,
				currentMode: mode,
			};

			// Apply theme with transition immediately
			quickApplyTheme(newState, actualTransitionOptions, coords);

			return newState;
		});
	};

	// Apply a theme preset
	const applyThemePreset = (preset: string) => {
		console.log(`Applying preset: ${preset}`);
		const newStyles = getPresetThemeStyles(preset);

		// Apply the new theme state
		const newState = {
			currentMode: themeState.currentMode,
			preset,
			styles: newStyles,
		};

		// Also apply immediately with transition
		quickApplyTheme(newState, actualTransitionOptions);

		// Update state
		setThemeState(newState);
	};

	// Provider value
	const value = {
		themeState,
		setThemeMode,
		applyThemePreset,
		transitionOptions: actualTransitionOptions,
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
