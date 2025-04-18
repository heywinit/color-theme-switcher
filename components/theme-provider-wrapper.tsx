"use client";

import React from "react";
import { CustomThemeProvider } from "@/lib/theme-provider";
import { ThemeTransitionOptions } from "@/lib/types";

export interface ThemeProviderWrapperProps {
	children: React.ReactNode;
	defaultPreset?: string;
	transitionType?:
		| "none"
		| "fade"
		| "slide"
		| "zoom"
		| "rotate"
		| "flip"
		| "scale"
		| "pulse";
	transitionDuration?: number;
	transitionEasing?: string;
	targetSelector?: string;
	disableTransition?: boolean;
}

export function ThemeProviderWrapper({
	children,
	defaultPreset,
	transitionType = "fade",
	transitionDuration = 300,
	transitionEasing = "ease-in-out",
	targetSelector = ":root",
	disableTransition = false,
}: ThemeProviderWrapperProps) {
	// Convert props to transition options
	const transitionOptions: ThemeTransitionOptions = {
		type: transitionType,
		duration: transitionDuration,
		easing: transitionEasing,
		targetSelector,
	};

	return (
		<CustomThemeProvider
			defaultPreset={defaultPreset}
			transitionOptions={transitionOptions}
			disableTransition={disableTransition}
		>
			{children}
		</CustomThemeProvider>
	);
}
