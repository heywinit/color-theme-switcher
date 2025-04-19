"use client";

import { colorFormatter } from "./color-converter";
import type { ThemeState } from "./types";

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
export function getStyleTarget(): HTMLElement {
	if (typeof document === "undefined") {
		throw new Error("getStyleTarget can only be called in browser environment");
	}

	// Always target root
	return document.documentElement;
}

// Create a stylesheet with CSS variables instead of inline styles
export function createThemeStylesheet(themeState: ThemeState): void {
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

	// Create CSS selecting the root
	const targetRule = ":root";

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

	cssText += "}\n";

	// Add dark mode specific overrides
	if (currentMode === "dark") {
		cssText += ".dark {\n  color-scheme: dark;\n}\n";
	} else {
		cssText += ":root {\n  color-scheme: light;\n}\n";
	}

	styleEl.textContent = cssText;
	document.head.appendChild(styleEl);
}

// Apply theme directly
export function applyTheme(themeState: ThemeState): void {
	if (typeof window === "undefined") return;

	// Save scroll position before theme change
	const scrollX = window.scrollX;
	const scrollY = window.scrollY;

	// Batch operations to reduce layout thrashing
	window.requestAnimationFrame(() => {
		const { currentMode } = themeState;
		const root = document.documentElement;

		// Create stylesheet with variables first
		createThemeStylesheet(themeState);

		// Apply light/dark mode class
		if (currentMode === "light") {
			root.classList.remove("dark");
		} else {
			root.classList.add("dark");
		}

		// Restore scroll position after theme change
		if (scrollX !== window.scrollX || scrollY !== window.scrollY) {
			window.scrollTo({
				left: scrollX,
				top: scrollY,
				behavior: "auto",
			});
		}
	});
}
