"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorSwatch } from "@/components/ui/color-swatch";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme-provider";
import { presets } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";
import type { ThemeStyleProps } from "@/lib/types";
import { colorFormatter } from "@/lib/color-converter";

// Format color for CSS var (space-separated HSL format)
const formatColorForCssVar = (color: string): string => {
	if (!color) return "#cccccc";

	if (/^\d+\s+\d+%\s+\d+%$/.test(color)) {
		return color;
	}

	// Hex or other format - convert to HSL
	const hslValue = colorFormatter(color, "hsl", "0");

	// Extract values from HSL format
	return hslValue
		.replace(/^hsl\(/, "")
		.replace(/\)$/, "")
		.replace(/,\s*/g, " ");
};

export function ThemePicker() {
	const { themeState, applyThemePreset } = useTheme();
	const currentPreset = themeState.preset;
	const mode = themeState.currentMode;
	const [error, setError] = React.useState<string | null>(null);

	// Get preset display name
	const getPresetLabel = (presetKey: string) => {
		return (
			presets[presetKey]?.label ||
			presetKey
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ")
		);
	};

	// Get safe color value, always returning a string even if undefined
	const getSafeColor = (
		styles: ThemeStyleProps,
		property: keyof ThemeStyleProps,
	) => {
		if (!styles || !styles[property]) return "#cccccc";
		return styles[property] as string;
	};

	// Apply theme preset with error handling
	const handlePresetChange = (preset: string) => {
		try {
			console.log(`ThemePicker: Applying preset ${preset}`);
			applyThemePreset(preset);
			setError(null);
		} catch (err) {
			console.error("Error applying theme preset:", err);
			setError(
				err instanceof Error ? err.message : "Unknown error applying theme",
			);
		}
	};

	// Force a CSS update for debugging
	const forceUpdateCSS = () => {
		const root = document.documentElement;
		const colors = themeState.styles[mode];

		if (!colors) return;

		for (const [key, value] of Object.entries(colors)) {
			if (
				value &&
				typeof value === "string" &&
				!key.includes("font") &&
				!key.includes("radius")
			) {
				const formattedValue = formatColorForCssVar(value);
				root.style.setProperty(`--${key}`, formattedValue);
				console.log(`Directly setting --${key} to ${formattedValue}`);
			}
		}

		// Toggle a class to force a repaint
		root.classList.add("theme-transition");
		setTimeout(() => root.classList.remove("theme-transition"), 500);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex items-center gap-2">
					<div className="flex gap-1">
						<ColorSwatch
							color={getSafeColor(themeState.styles[mode], "primary")}
							size="sm"
						/>
						<ColorSwatch
							color={getSafeColor(themeState.styles[mode], "accent")}
							size="sm"
						/>
						<ColorSwatch
							color={getSafeColor(themeState.styles[mode], "secondary")}
							size="sm"
						/>
					</div>
					<span className="hidden sm:inline-block">
						{getPresetLabel(currentPreset)}
					</span>
					<ChevronDown className="h-4 w-4 text-muted-foreground" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[220px]">
				{error && (
					<>
						<DropdownMenuLabel className="text-destructive">
							Error: {error}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</>
				)}

				{Object.keys(presets).map((presetKey) => {
					const isActive = currentPreset === presetKey;
					const styles = presets[presetKey].styles[mode] || {};

					return (
						<DropdownMenuItem
							key={presetKey}
							className={cn(
								"flex items-center gap-2 cursor-pointer",
								isActive && "font-medium bg-accent text-accent-foreground",
							)}
							onClick={() => handlePresetChange(presetKey)}
						>
							<div className="flex gap-1">
								<ColorSwatch
									color={getSafeColor(styles, "primary")}
									size="sm"
								/>
								<ColorSwatch color={getSafeColor(styles, "accent")} size="sm" />
								<ColorSwatch
									color={getSafeColor(styles, "secondary")}
									size="sm"
								/>
							</div>
							<span>{getPresetLabel(presetKey)}</span>
							{isActive && <Check className="h-4 w-4 ml-auto" />}
						</DropdownMenuItem>
					);
				})}

				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={forceUpdateCSS}>
					Force Update CSS
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
