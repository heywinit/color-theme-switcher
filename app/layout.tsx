import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
	title: "ColorSwitchCN",
	description:
		"A beautiful, accessible theme switcher component for your shadcn/ui projects with instant theme changes and multiple theme presets.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-background">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
