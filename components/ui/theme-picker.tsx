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
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme-provider";
import { presets } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";
import { ThemeStyleProps } from "@/lib/types";

export function ThemePicker() {
	const { themeState, applyThemePreset } = useTheme();
	const currentPreset = themeState.preset;
	const mode = themeState.currentMode;

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
		return styles[property] || "#cccccc";
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
			<DropdownMenuContent align="end" className="w-[200px]">
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
							onClick={() => applyThemePreset(presetKey)}
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
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
