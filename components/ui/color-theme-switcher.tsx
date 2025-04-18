"use client";

import * as React from "react";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { ThemePicker } from "./theme-picker";
import { cn } from "@/lib/utils";

interface ColorThemeSwitcherProps {
	className?: string;
	align?: "start" | "center" | "end";
	mode?: "horizontal" | "vertical";
}

export function ColorThemeSwitcher({
	className,
	align = "center",
	mode = "horizontal",
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

	return (
		<div className={cn("flex", alignClass[align], modeClass[mode], className)}>
			<ThemeModeToggle />
			<ThemePicker />
		</div>
	);
}
