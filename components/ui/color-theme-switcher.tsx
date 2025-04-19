/**
 * ColorSwitchCN Component
 * Inspired by and compatible with TweakCN (https://tweakcn.com) by Sahaj (https://github.com/jnsahaj)
 */
"use client";

import * as React from "react";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { ThemePicker } from "./theme-picker";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-provider";
import { useEffect } from "react";

interface ColorThemeSwitcherProps {
	className?: string;
	align?: "start" | "center" | "end";
}

export function ColorThemeSwitcher({
	className,
	align = "center",
}: ColorThemeSwitcherProps) {
	const alignClass = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
	};

	// Get theme state from the theme provider
	const { themeState } = useTheme();

	// Log when theme changes for debugging
	useEffect(() => {
		console.log("Theme state updated:", {
			mode: themeState.currentMode,
			preset: themeState.preset,
		});
	}, [themeState]);

	// Pass down theme mode toggle props
	const themeModeToggleProps = {
		variant: "outline" as const,
		size: "icon" as const,
	};

	return (
		<div className={cn("flex flex-row gap-4", alignClass[align], className)}>
			<ThemeModeToggle {...themeModeToggleProps} />
			<ThemePicker />
		</div>
	);
}
