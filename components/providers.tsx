"use client";

import { ThemeProvider } from "next-themes";
import { CustomThemeProvider } from "@/lib/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			disableTransitionOnChange
			enableSystem
		>
			<CustomThemeProvider>{children}</CustomThemeProvider>
		</ThemeProvider>
	);
}
