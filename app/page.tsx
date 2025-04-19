import * as React from "react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
	return (
		<div className="w-full h-full">
			<div className="max-w-4xl mx-auto px-4 py-8 overflow-auto">
				<header className="mb-8">
					<h1 className="text-3xl font-bold tracking-tight">ColorSwitchCN</h1>
					<p className="text-muted-foreground">
						Ready-to-use theme switch component for shadcn/ui projects.
					</p>
					<div className="flex items-center gap-2 mt-2">
						<Button variant="outline" size="sm" asChild>
							<Link
								href="https://github.com/jnsahaj/tweakcn"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1.5"
							>
								<Github className="h-4 w-4" />
								<span>Based on TweakCN</span>
							</Link>
						</Button>
					</div>
				</header>

				<main className="flex flex-col gap-8">
					<section>
						<h2 className="text-2xl font-semibold tracking-tight mb-4">
							Quick Start
						</h2>
						<Card>
							<CardHeader>
								<CardTitle>Default Horizontal Layout</CardTitle>
								<CardDescription>
									The horizontal layout is ideal for navigation bars
								</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center p-6 bg-muted/20 rounded-md">
								<ThemeSwitcher />
							</CardContent>
							<CardFooter className="bg-muted/10 p-4 rounded-b-lg">
								<CodeBlock code="<ThemeSwitcher />" language="tsx" />
							</CardFooter>
						</Card>
					</section>

					<section>
						<h2 className="text-2xl font-semibold tracking-tight mb-4">
							Installation
						</h2>
						<Card>
							<CardHeader>
								<CardTitle>Add to your project</CardTitle>
								<CardDescription>
									Follow these steps to add the theme switcher
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h3 className="text-lg font-medium mb-2">
											1. Install the package
										</h3>
										<CodeBlock
											code="npm install colorswitchcn"
											language="bash"
										/>
									</div>
									<div>
										<h3 className="text-lg font-medium mb-2">
											2. Import and use
										</h3>
										<CodeBlock
											code={`import { ThemeSwitcher } from "colorswitchcn"

export function Navbar() {
  return (
    <div className="flex items-center gap-4">
      <nav>{/* Your navigation */}</nav>
      <ThemeSwitcher />
    </div>
  )
}`}
											language="tsx"
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					<section>
						<h2 className="text-2xl font-semibold tracking-tight mb-4">
							Color Theme Preview
						</h2>
						<Card>
							<CardHeader>
								<CardTitle>Interactive Color Demo</CardTitle>
								<CardDescription>
									See how colors change in real-time across UI elements
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex justify-center p-4 bg-card rounded-md shadow-sm border">
									<ThemeSwitcher />
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<div className="flex justify-between">
											<span>Button (Primary)</span>
											<span className="text-xs text-muted-foreground">
												bg-primary
											</span>
										</div>
										<Button className="w-full">Primary Button</Button>
									</div>

									<div className="space-y-2">
										<div className="flex justify-between">
											<span>Button (Secondary)</span>
											<span className="text-xs text-muted-foreground">
												bg-secondary
											</span>
										</div>
										<Button variant="secondary" className="w-full">
											Secondary Button
										</Button>
									</div>

									<div className="space-y-2">
										<div className="flex justify-between">
											<span>Card Background</span>
											<span className="text-xs text-muted-foreground">
												bg-card
											</span>
										</div>
										<div className="h-16 bg-card rounded-md border flex items-center justify-center">
											Card Background
										</div>
									</div>

									<div className="space-y-2">
										<div className="flex justify-between">
											<span>Muted Background</span>
											<span className="text-xs text-muted-foreground">
												bg-muted
											</span>
										</div>
										<div className="h-16 bg-muted rounded-md border flex items-center justify-center">
											Muted Background
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					<footer className="mt-8 border-t pt-6 pb-8 text-sm text-muted-foreground">
						<div className="flex flex-col sm:flex-row justify-between gap-4">
							<div>
								Based on{" "}
								<a
									href="https://tweakcn.com"
									className="font-medium underline underline-offset-4"
									target="_blank"
									rel="noopener noreferrer"
								>
									TweakCN
								</a>{" "}
								by Sahaj
							</div>
							<div className="flex gap-4">
								<Link href="/transitions" className="hover:underline">
									Transitions
								</Link>
								<Link href="/hook-example" className="hover:underline">
									Hook API
								</Link>
							</div>
						</div>
					</footer>
				</main>
			</div>
		</div>
	);
}
