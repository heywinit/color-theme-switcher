import * as React from "react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
	return (
		<div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
			<header className="flex flex-col gap-1">
				<h1 className="text-3xl font-bold tracking-tight">Theme Switcher</h1>
				<p className="text-muted-foreground">
					A customizable theme switcher component for shadcn/ui
				</p>
				<div className="flex gap-4 mt-2">
					<Link href="/transitions" className="text-primary hover:underline">
						View transition demos →
					</Link>
					<Link href="/hook-example" className="text-primary hover:underline">
						useThemeSwitch hook example →
					</Link>
				</div>
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
							<ThemeSwitcher />
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
				</Card>
			</main>
		</div>
	);
}
