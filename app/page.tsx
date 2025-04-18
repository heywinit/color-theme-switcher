import * as React from "react";
import { ColorThemeSwitcher } from "@/components/ui/color-theme-switcher";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DebugPanel } from "@/components/debug-panel";
import Link from "next/link";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
	return (
		<div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
			<header className="flex flex-col gap-1">
				<h1 className="text-3xl font-bold tracking-tight">
					Color Theme Switcher
				</h1>
				<p className="text-muted-foreground">
					A customizable theme switcher component for shadcn/ui
				</p>
				<Link href="/transitions" className="text-primary hover:underline mt-2">
					View transition demos →
				</Link>
			</header>
			<main className="flex flex-col flex-1 gap-8">
				<Card className="flex flex-col gap-4 rounded-lg p-4 min-h-[450px] relative">
					<CardHeader>
						<CardTitle>Theme Demonstration</CardTitle>
						<CardDescription>
							This component allows switching between light/dark modes and
							different color schemes.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-6">
						<div className="flex items-center justify-center bg-card rounded-md p-6 shadow-sm border">
							<ColorThemeSwitcher />
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardHeader>
									<CardTitle className="text-primary">Primary</CardTitle>
									<CardDescription>Primary theme color</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="h-24 bg-primary rounded-md" />
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-secondary-foreground">
										Secondary
									</CardTitle>
									<CardDescription>Secondary theme color</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="h-24 bg-secondary rounded-md" />
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-accent-foreground">
										Accent
									</CardTitle>
									<CardDescription>Accent theme color</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="h-24 bg-accent rounded-md" />
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-muted-foreground">Muted</CardTitle>
									<CardDescription>Muted theme color</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="h-24 bg-muted rounded-md" />
								</CardContent>
							</Card>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<p className="text-sm text-muted-foreground">
							Try selecting different themes to see how the colors change.
						</p>
						<ColorThemeSwitcher align="end" />
					</CardFooter>
				</Card>
			</main>

			{/* Debug Panel */}
			<DebugPanel />
		</div>
	);
}
