/**
 * Color Theme Switcher Component
 * Inspired by and compatible with TweakCN (https://tweakcn.com) by Sahaj (https://github.com/jnsahaj)
 */
"use client";

import * as React from "react";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { ThemePicker } from "./theme-picker";
import { cn } from "@/lib/utils";
import type { ThemeTransitionType } from "@/lib/types";

interface ColorThemeSwitcherProps {
	className?: string;
	align?: "start" | "center" | "end";
	mode?: "horizontal" | "vertical";
	// These props are kept for the API but not used directly in this component
	transitionType?: ThemeTransitionType;
	transitionDuration?: number;
	disableTransition?: boolean;
}

export function ColorThemeSwitcher({
	className,
	align = "center",
	mode = "horizontal",
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	transitionType = "fade",
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	transitionDuration = 300,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	disableTransition = false,
}: ColorThemeSwitcherProps) {
	const alignClass = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
	};

	const modeClass = {
		horizontal: "flex-row gap-4",
		vertical: "flex-col gap-2",
	};

	// Pass down theme mode toggle props
	const themeModeToggleProps = {
		variant: "outline" as const,
		size: "icon" as const,
	};

	return (
		<div className={cn("flex", alignClass[align], modeClass[mode], className)}>
			<ThemeModeToggle {...themeModeToggleProps} />
			<ThemePicker />
		</div>
	);
}
