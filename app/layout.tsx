import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
	title: "Color Theme Switcher",
	description: "A comprehensive color theme switcher for ShadCN UI",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-background">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
