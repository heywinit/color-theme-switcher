"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-provider";

export function ThemeModeToggle() {
	const { themeState, setThemeMode } = useTheme();
	const isDarkMode = themeState.currentMode === "dark";

	const toggleTheme = () => {
		setThemeMode(isDarkMode ? "light" : "dark");
	};

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
			aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
		>
			{isDarkMode ? (
				<Sun className="h-[1.2rem] w-[1.2rem]" />
			) : (
				<Moon className="h-[1.2rem] w-[1.2rem]" />
			)}
		</Button>
	);
}
