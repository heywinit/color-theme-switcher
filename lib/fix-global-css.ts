"use client";

import { colorFormatter } from "./color-converter";
import { ThemeState, ThemeTransitionOptions } from "./types";
import {
	applyThemeTransition,
	DEFAULT_TRANSITION,
	setupTransitionStyles,
} from "./theme-transition";

// Convert any color to Tailwind-compatible HSL format
// Tailwind expects "h s% l%" format without the hsl() wrapper
export function formatHslForCssVar(color: string): string {
	if (!color) return "0 0% 0%";

	// If already in correct format (e.g., "240 10% 3.9%")
	if (/^\d+\s+\d+%\s+\d+%$/.test(color)) {
		return color;
	}

	// Convert to HSL string format first
	const hslValue = colorFormatter(color, "hsl", "4");

	// Then extract just the values without the hsl() wrapper
	if (hslValue.startsWith("hsl(")) {
		return hslValue
			.replace(/^hsl\(/, "")
			.replace(/\)$/, "")
			.replace(/,\s*/g, " ");
	}

	// If it's already space-separated, return as is
	return hslValue;
}

// Get the target element for applying styles
export function getStyleTarget(targetSelector?: string): HTMLElement {
	if (typeof document === "undefined") {
		throw new Error("getStyleTarget can only be called in browser environment");
	}

	// Default to root if no selector or selector not found
	if (!targetSelector) return document.documentElement;

	const target = document.querySelector(targetSelector);
	return (target as HTMLElement) || document.documentElement;
}

// Create a stylesheet with CSS variables instead of inline styles
export function createThemeStylesheet(
	themeState: ThemeState,
	targetSelector?: string,
): void {
	if (typeof document === "undefined") return;

	// Remove existing theme stylesheet if present
	const existingStyle = document.getElementById("theme-variables-stylesheet");
	if (existingStyle) {
		existingStyle.remove();
	}

	const { currentMode, styles } = themeState;
	const themeStyles = styles[currentMode];

	if (!themeStyles) return;

	// Create style elements for variables
	const styleEl = document.createElement("style");
	styleEl.id = "theme-variables-stylesheet";

	// Create CSS selecting the target (default :root)
	const targetRule = targetSelector || ":root";

	// Build CSS variable definitions
	let cssText = `${targetRule} {\n`;

	for (const [key, value] of Object.entries(themeStyles)) {
		if (value && typeof value === "string") {
			try {
				let cssValue = value;

				// Only format color values, not font names, radius, etc.
				if (
					!key.includes("font") &&
					!key.includes("radius") &&
					(key.includes("color") ||
						key.includes("background") ||
						key.includes("foreground") ||
						key.includes("primary") ||
						key.includes("secondary") ||
						key.includes("accent") ||
						key.includes("muted") ||
						key.includes("destructive") ||
						key.includes("border") ||
						key.includes("ring"))
				) {
					cssValue = formatHslForCssVar(value);
				}

				cssText += `  --${key}: ${cssValue};\n`;
			} catch (error) {
				console.error(`Failed to set --${key}:`, error);
			}
		}
	}

	cssText += `}\n`;

	// Add dark mode specific overrides
	if (currentMode === "dark") {
		cssText += `.dark {\n  color-scheme: dark;\n}\n`;
	} else {
		cssText += `:root {\n  color-scheme: light;\n}\n`;
	}

	styleEl.textContent = cssText;
	document.head.appendChild(styleEl);
}

// Emergency fix for directly applying theme styles to document
export function quickApplyTheme(
	themeState: ThemeState,
	transitionOptions: ThemeTransitionOptions = DEFAULT_TRANSITION,
	coords?: { x: number; y: number },
): void {
	if (typeof window === "undefined") return;

	// Setup transition styles if needed
	setupTransitionStyles(transitionOptions);

	const { currentMode } = themeState;
	const root = document.documentElement;

	// Apply light/dark mode class
	if (currentMode === "light") {
		root.classList.remove("dark");
	} else {
		root.classList.add("dark");
	}

	console.log("Applying theme with CSS variables stylesheet");

	// Apply transition effect
	applyThemeTransition(transitionOptions, themeState, coords);

	// Create stylesheet with variables
	createThemeStylesheet(themeState, transitionOptions.targetSelector);
}

// Add a global utility for debugging
if (typeof window !== "undefined") {
	(window as any).__fixTheme = (
		themeState: ThemeState,
		transitionOptions?: ThemeTransitionOptions,
	) => {
		quickApplyTheme(themeState, transitionOptions);
	};
}
