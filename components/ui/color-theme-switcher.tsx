/**
 * ColorSwitchCN Component
 * Inspired by and compatible with TweakCN (https://tweakcn.com) by Sahaj (https://github.com/jnsahaj)
 */
"use client";

import * as React from "react";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { ThemePicker } from "./theme-picker";
import { cn } from "@/lib/utils";

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
