import { ThemePreset, ThemeStyles } from "./types";

// Default theme state that will be used as a fallback
export const defaultThemeState = {
	currentMode: "light" as const,
	preset: "default",
	styles: {
		light: {
			background: "hsl(0 0% 100%)",
			foreground: "hsl(0 0% 14.5%)",
			card: "hsl(0 0% 100%)",
			"card-foreground": "hsl(0 0% 14.5%)",
			popover: "hsl(0 0% 100%)",
			"popover-foreground": "hsl(0 0% 14.5%)",
			primary: "hsl(0 0% 20.5%)",
			"primary-foreground": "hsl(0 0% 98.5%)",
			secondary: "hsl(0 0% 97%)",
			"secondary-foreground": "hsl(0 0% 20.5%)",
			muted: "hsl(0 0% 97%)",
			"muted-foreground": "hsl(0 0% 55.6%)",
			accent: "hsl(0 0% 97%)",
			"accent-foreground": "hsl(0 0% 20.5%)",
			destructive: "hsl(0 80% 57.7%)",
			"destructive-foreground": "hsl(0 0% 100%)",
			border: "hsl(0 0% 92.2%)",
			input: "hsl(0 0% 92.2%)",
			ring: "hsl(0 0% 70.8%)",
			"chart-1": "hsl(41 78% 64.6%)",
			"chart-2": "hsl(185 68% 60%)",
			"chart-3": "hsl(227 65% 39.8%)",
			"chart-4": "hsl(84 63% 82.8%)",
			"chart-5": "hsl(70 68% 76.9%)",
			radius: "0.625rem",
			sidebar: "hsl(0 0% 98.5%)",
			"sidebar-foreground": "hsl(0 0% 14.5%)",
			"sidebar-primary": "hsl(0 0% 20.5%)",
			"sidebar-primary-foreground": "hsl(0 0% 98.5%)",
			"sidebar-accent": "hsl(0 0% 97%)",
			"sidebar-accent-foreground": "hsl(0 0% 20.5%)",
			"sidebar-border": "hsl(0 0% 92.2%)",
			"sidebar-ring": "hsl(0 0% 70.8%)",
			"font-sans": "var(--font-sans)",
			"font-serif": "var(--font-serif)",
			"font-mono": "var(--font-mono)",
			"shadow-color": "hsl(0 0% 0%)",
			"shadow-opacity": "0.1",
			"shadow-blur": "3px",
			"shadow-spread": "0px",
			"shadow-offset-x": "0",
			"shadow-offset-y": "1px",
		},
		dark: {
			background: "hsl(240 10% 3.9%)",
			foreground: "hsl(0 0% 98%)",
			card: "hsl(240 10% 3.9%)",
			"card-foreground": "hsl(0 0% 98%)",
			popover: "hsl(240 10% 3.9%)",
			"popover-foreground": "hsl(0 0% 98%)",
			primary: "hsl(0 0% 98%)",
			"primary-foreground": "hsl(240 5.9% 10%)",
			secondary: "hsl(240 3.7% 15.9%)",
			"secondary-foreground": "hsl(0 0% 98%)",
			muted: "hsl(240 3.7% 15.9%)",
			"muted-foreground": "hsl(240 5% 64.9%)",
			accent: "hsl(240 3.7% 15.9%)",
			"accent-foreground": "hsl(0 0% 98%)",
			destructive: "hsl(0 62.8% 30.6%)",
			"destructive-foreground": "hsl(0 0% 98%)",
			border: "hsl(240 3.7% 15.9%)",
			input: "hsl(240 3.7% 15.9%)",
			ring: "hsl(240 4.9% 83.9%)",
			"chart-1": "hsl(220 70% 50%)",
			"chart-2": "hsl(160 60% 45%)",
			"chart-3": "hsl(30 80% 55%)",
			"chart-4": "hsl(280 65% 60%)",
			"chart-5": "hsl(340 75% 55%)",
			sidebar: "hsl(240 5.9% 10%)",
			"sidebar-foreground": "hsl(240 4.8% 95.9%)",
			"sidebar-primary": "hsl(224.3 76.3% 48%)",
			"sidebar-primary-foreground": "hsl(0 0% 100%)",
			"sidebar-accent": "hsl(240 3.7% 15.9%)",
			"sidebar-accent-foreground": "hsl(240 4.8% 95.9%)",
			"sidebar-border": "hsl(240 3.7% 15.9%)",
			"sidebar-ring": "hsl(217.2 91.2% 59.8%)",
			"font-sans": "var(--font-sans)",
			"font-serif": "var(--font-serif)",
			"font-mono": "var(--font-mono)",
			"shadow-color": "hsl(0 0% 0%)",
			"shadow-opacity": "0.3",
			"shadow-blur": "8px",
			"shadow-spread": "0px",
			"shadow-offset-x": "0",
			"shadow-offset-y": "4px",
		},
	},
};

// Function to get theme styles for a preset
export function getPresetThemeStyles(name: string): ThemeStyles {
	const defaultTheme = defaultThemeState.styles;
	if (name === "default") {
		return defaultTheme;
	}

	const preset = presets[name];
	if (!preset) {
		return defaultTheme;
	}

	return {
		light: {
			...defaultTheme.light,
			...(preset.styles.light || {}),
		},
		dark: {
			...defaultTheme.dark,
			...(preset.styles.light || {}),
			...(preset.styles.dark || {}),
		},
	};
}

// Theme presets
export const presets: Record<string, ThemePreset> = {
	"modern-minimal": {
		label: "Modern Minimal",
		styles: {
			light: {
				background: "#ffffff",
				foreground: "#333333",
				card: "#ffffff",
				"card-foreground": "#333333",
				popover: "#ffffff",
				"popover-foreground": "#333333",
				primary: "#3b82f6",
				"primary-foreground": "#ffffff",
				secondary: "#f3f4f6",
				"secondary-foreground": "#4b5563",
				muted: "#f9fafb",
				"muted-foreground": "#6b7280",
				accent: "#e0f2fe",
				"accent-foreground": "#1e3a8a",
				destructive: "#ef4444",
				"destructive-foreground": "#ffffff",
				border: "#e5e7eb",
				input: "#e5e7eb",
				ring: "#3b82f6",
				"chart-1": "#3b82f6",
				"chart-2": "#2563eb",
				"chart-3": "#1d4ed8",
				"chart-4": "#1e40af",
				"chart-5": "#1e3a8a",
				radius: "0.375rem",
				sidebar: "#f9fafb",
				"sidebar-foreground": "#333333",
				"sidebar-primary": "#3b82f6",
				"sidebar-primary-foreground": "#ffffff",
				"sidebar-accent": "#e0f2fe",
				"sidebar-accent-foreground": "#1e3a8a",
				"sidebar-border": "#e5e7eb",
				"sidebar-ring": "#3b82f6",
				"font-sans": "Inter, sans-serif",
				"font-serif": "Source Serif 4, serif",
				"font-mono": "JetBrains Mono, monospace",
			},
			dark: {
				background: "#171717",
				foreground: "#e5e5e5",
				card: "#262626",
				"card-foreground": "#e5e5e5",
				popover: "#262626",
				"popover-foreground": "#e5e5e5",
				primary: "#3b82f6",
				"primary-foreground": "#ffffff",
				secondary: "#262626",
				"secondary-foreground": "#e5e5e5",
				muted: "#262626",
				"muted-foreground": "#a3a3a3",
				accent: "#1e3a8a",
				"accent-foreground": "#bfdbfe",
				destructive: "#ef4444",
				"destructive-foreground": "#ffffff",
				border: "#404040",
				input: "#404040",
				ring: "#3b82f6",
				"chart-1": "#60a5fa",
				"chart-2": "#3b82f6",
				"chart-3": "#2563eb",
				"chart-4": "#1d4ed8",
				"chart-5": "#1e40af",
				radius: "0.375rem",
				sidebar: "#171717",
				"sidebar-foreground": "#e5e5e5",
				"sidebar-primary": "#3b82f6",
				"sidebar-primary-foreground": "#ffffff",
				"sidebar-accent": "#1e3a8a",
				"sidebar-accent-foreground": "#bfdbfe",
				"sidebar-border": "#404040",
				"sidebar-ring": "#3b82f6",
			},
		},
	},

	bubblegum: {
		label: "Bubblegum",
		styles: {
			light: {
				background: "#f6e6ee",
				foreground: "#5b5b5b",
				card: "#fdedc9",
				"card-foreground": "#5b5b5b",
				popover: "#ffffff",
				"popover-foreground": "#5b5b5b",
				primary: "#d04f99",
				"primary-foreground": "#ffffff",
				secondary: "#8acfd1",
				"secondary-foreground": "#333333",
				muted: "#b2e1eb",
				"muted-foreground": "#7a7a7a",
				accent: "#fbe2a7",
				"accent-foreground": "#333333",
				destructive: "#f96f70",
				"destructive-foreground": "#ffffff",
				border: "#d04f99",
				input: "#e4e4e4",
				ring: "#e670ab",
				"chart-1": "#e670ab",
				"chart-2": "#84d2e2",
				"chart-3": "#fbe2a7",
				"chart-4": "#f3a0ca",
				"chart-5": "#d7488e",
				sidebar: "#f8d8ea",
				"sidebar-foreground": "#333333",
				"sidebar-primary": "#ec4899",
				"sidebar-primary-foreground": "#ffffff",
				"sidebar-accent": "#f9a8d4",
				"sidebar-accent-foreground": "#333333",
				"sidebar-border": "#f3e8ff",
				"sidebar-ring": "#ec4899",
				radius: "0.4rem",
			},
			dark: {
				background: "#12242e",
				foreground: "#f3e3ea",
				card: "#1c2e38",
				"card-foreground": "#f3e3ea",
				popover: "#1c2e38",
				"popover-foreground": "#f3e3ea",
				primary: "#fbe2a7",
				"primary-foreground": "#12242e",
				secondary: "#e4a2b1",
				"secondary-foreground": "#12242e",
				muted: "#24272b",
				"muted-foreground": "#e4a2b1",
				accent: "#c67b96",
				"accent-foreground": "#f3e3ea",
				destructive: "#e35ea4",
				"destructive-foreground": "#12242e",
				border: "#324859",
				input: "#20333d",
				ring: "#50afb6",
				"chart-1": "#50afb6",
				"chart-2": "#e4a2b1",
				"chart-3": "#c67b96",
				"chart-4": "#175c6c",
				"chart-5": "#24272b",
				sidebar: "#101f28",
				"sidebar-foreground": "#f3f4f6",
				"sidebar-primary": "#ec4899",
				"sidebar-primary-foreground": "#ffffff",
				"sidebar-accent": "#f9a8d4",
				"sidebar-accent-foreground": "#1f2937",
				"sidebar-border": "#374151",
				"sidebar-ring": "#ec4899",
				radius: "0.4rem",
			},
		},
	},

	cyberpunk: {
		label: "Cyberpunk",
		styles: {
			light: {
				background: "#fcfcfc",
				foreground: "#1a202c",
				card: "#ffffff",
				"card-foreground": "#1a202c",
				popover: "#ffffff",
				"popover-foreground": "#1a202c",
				primary: "#ff00ff",
				"primary-foreground": "#ffffff",
				secondary: "#fbff00",
				"secondary-foreground": "#1a202c",
				muted: "#f0f0f0",
				"muted-foreground": "#64748b",
				accent: "#00fbff",
				"accent-foreground": "#1a202c",
				destructive: "#ff3060",
				"destructive-foreground": "#ffffff",
				border: "#e2e8f0",
				input: "#e2e8f0",
				ring: "#ff00ff",
				"chart-1": "#ff00ff",
				"chart-2": "#00fbff",
				"chart-3": "#fbff00",
				"chart-4": "#ff3060",
				"chart-5": "#9333ea",
				radius: "0.4rem",
			},
			dark: {
				background: "#0f0f13",
				foreground: "#f8fafc",
				card: "#151520",
				"card-foreground": "#f8fafc",
				popover: "#151520",
				"popover-foreground": "#f8fafc",
				primary: "#ff00ff",
				"primary-foreground": "#0f0f13",
				secondary: "#fbff00",
				"secondary-foreground": "#0f0f13",
				muted: "#1e1e2f",
				"muted-foreground": "#a1a1aa",
				accent: "#00fbff",
				"accent-foreground": "#0f0f13",
				destructive: "#ff3060",
				"destructive-foreground": "#f8fafc",
				border: "#2d2d3d",
				input: "#2d2d3d",
				ring: "#ff00ff",
				"chart-1": "#ff00ff",
				"chart-2": "#00fbff",
				"chart-3": "#fbff00",
				"chart-4": "#ff3060",
				"chart-5": "#9333ea",
				radius: "0.4rem",
			},
		},
	},

	forest: {
		label: "Forest",
		styles: {
			light: {
				background: "#f8fafc",
				foreground: "#334155",
				card: "#ffffff",
				"card-foreground": "#334155",
				popover: "#ffffff",
				"popover-foreground": "#334155",
				primary: "#22c55e",
				"primary-foreground": "#ffffff",
				secondary: "#f0fff4",
				"secondary-foreground": "#334155",
				muted: "#f8fafc",
				"muted-foreground": "#64748b",
				accent: "#dcfce7",
				"accent-foreground": "#334155",
				destructive: "#ef4444",
				"destructive-foreground": "#ffffff",
				border: "#e2e8f0",
				input: "#e2e8f0",
				ring: "#22c55e",
				"chart-1": "#22c55e",
				"chart-2": "#10b981",
				"chart-3": "#059669",
				"chart-4": "#047857",
				"chart-5": "#065f46",
				radius: "0.5rem",
			},
			dark: {
				background: "#0f172a",
				foreground: "#f8fafc",
				card: "#1e293b",
				"card-foreground": "#f8fafc",
				popover: "#1e293b",
				"popover-foreground": "#f8fafc",
				primary: "#22c55e",
				"primary-foreground": "#ffffff",
				secondary: "#1e293b",
				"secondary-foreground": "#f8fafc",
				muted: "#1e293b",
				"muted-foreground": "#94a3b8",
				accent: "#076234",
				"accent-foreground": "#dcfce7",
				destructive: "#ef4444",
				"destructive-foreground": "#f8fafc",
				border: "#334155",
				input: "#334155",
				ring: "#22c55e",
				"chart-1": "#22c55e",
				"chart-2": "#10b981",
				"chart-3": "#059669",
				"chart-4": "#047857",
				"chart-5": "#065f46",
				radius: "0.5rem",
			},
		},
	},

	sunset: {
		label: "Sunset",
		styles: {
			light: {
				background: "#fefbfa",
				foreground: "#4a3538",
				card: "#ffffff",
				"card-foreground": "#4a3538",
				popover: "#ffffff",
				"popover-foreground": "#4a3538",
				primary: "#f76b15",
				"primary-foreground": "#ffffff",
				secondary: "#fef2ee",
				"secondary-foreground": "#4a3538",
				muted: "#fff5f0",
				"muted-foreground": "#a08789",
				accent: "#fff5f0",
				"accent-foreground": "#4a3538",
				destructive: "#e11d48",
				"destructive-foreground": "#ffffff",
				border: "#fbe4dc",
				input: "#fbe4dc",
				ring: "#f76b15",
				"chart-1": "#f76b15",
				"chart-2": "#ef4444",
				"chart-3": "#f59e0b",
				"chart-4": "#f43f5e",
				"chart-5": "#fb923c",
				radius: "0.5rem",
			},
			dark: {
				background: "#27141c",
				foreground: "#fef2ee",
				card: "#381b26",
				"card-foreground": "#fef2ee",
				popover: "#381b26",
				"popover-foreground": "#fef2ee",
				primary: "#f76b15",
				"primary-foreground": "#ffffff",
				secondary: "#381b26",
				"secondary-foreground": "#fef2ee",
				muted: "#381b26",
				"muted-foreground": "#d1bbbc",
				accent: "#5c2738",
				"accent-foreground": "#fef2ee",
				destructive: "#e11d48",
				"destructive-foreground": "#fef2ee",
				border: "#5c2738",
				input: "#5c2738",
				ring: "#f76b15",
				"chart-1": "#f76b15",
				"chart-2": "#ef4444",
				"chart-3": "#f59e0b",
				"chart-4": "#f43f5e",
				"chart-5": "#fb923c",
				radius: "0.5rem",
			},
		},
	},
};
