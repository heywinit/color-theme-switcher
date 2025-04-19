"use client";

import { ThemeProvider } from "next-themes";
import { CustomThemeProvider } from "@/lib/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<CustomThemeProvider defaultPreset="modern-minimal">
				{children}
			</CustomThemeProvider>
		</ThemeProvider>
	);
}
