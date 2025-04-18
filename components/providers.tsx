"use client";

import { ThemeProvider } from "next-themes";
import { ThemeProviderWrapper } from "./theme-provider-wrapper";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			disableTransitionOnChange
			enableSystem
		>
			<ThemeProviderWrapper
				defaultPreset="modern-minimal"
				transitionType="slide"
				transitionDuration={400}
				transitionEasing="cubic-bezier(0.4, 0, 0.2, 1)"
				targetSelector=":root"
			>
				{children}
			</ThemeProviderWrapper>
		</ThemeProvider>
	);
}
