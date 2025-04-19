/**
 * ColorSwitchCN Component
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
	transitionType?: ThemeTransitionType;
	transitionDuration?: number;
	disableTransition?: boolean;
}

export function ColorThemeSwitcher({
	className,
	align = "center",
	transitionType = "fade",
	transitionDuration = 300,
	disableTransition = false,
}: ColorThemeSwitcherProps) {
	const alignClass = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
	};

	// Apply custom transition options if provided
	React.useEffect(() => {
		if (typeof window === "undefined") return;

		// Update transition options in localStorage for persistence
		if (transitionType) {
			localStorage.setItem("theme-transition-type", transitionType);
		}
		if (transitionDuration) {
			localStorage.setItem(
				"theme-transition-duration",
				transitionDuration.toString(),
			);
		}
		if (disableTransition !== undefined) {
			localStorage.setItem(
				"theme-transition-disabled",
				disableTransition.toString(),
			);
		}
	}, [transitionType, transitionDuration, disableTransition]);

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
