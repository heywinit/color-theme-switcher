"use client";

import * as React from "react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Check,
	Copy,
	Github,
	ArrowRight,
	Code,
	Palette,
	Paintbrush,
	Sparkles,
} from "lucide-react";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
	const [packageManager, setPackageManager] = React.useState<
		"pnpm" | "npm" | "yarn" | "bun"
	>("npm");
	const [registryCopied, setRegistryCopied] = React.useState(false);

	const copyRegistryCommand = () => {
		navigator.clipboard.writeText(getRegistryCommand());
		setRegistryCopied(true);
		setTimeout(() => setRegistryCopied(false), 2000);
	};

	const getRegistryCommand = () => {
		switch (packageManager) {
			case "pnpm":
				return "pnpm add colorswitchcn";
			case "npm":
				return "npm install colorswitchcn";
			case "yarn":
				return "yarn add colorswitchcn";
			case "bun":
				return "bun add colorswitchcn";
			default:
				return "npm install colorswitchcn";
		}
	};

	const features = [
		{
			id: "easy-integration",
			title: "Easy Integration",
			description:
				"Drop-in replacement for shadcn/ui projects with zero configuration",
			icon: <Code className="h-5 w-5" />,
		},
		{
			id: "theme-presets",
			title: "Theme Presets",
			description:
				"Beautiful pre-designed themes for both light and dark modes",
			icon: <Palette className="h-5 w-5" />,
		},
		{
			id: "smooth-transitions",
			title: "Smooth Transitions",
			description: "Elegant animations when switching between themes",
			icon: <Paintbrush className="h-5 w-5" />,
		},
		{
			id: "customizable",
			title: "Customizable",
			description: "Fully customizable with simple API and hooks",
			icon: <Sparkles className="h-5 w-5" />,
		},
	];

	return (
		<div className="w-full min-h-screen flex flex-col">
			{/* Hero Section */}
			<section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
				<div className="container px-4 md:px-6 mx-auto">
					<div className="flex flex-col items-center text-center space-y-4 mb-8">
						<Badge
							className="mb-2 rounded-full px-4 py-1.5 text-sm font-medium"
							variant="secondary"
						>
							<span className="mr-1 text-primary">✦</span> Theme Switcher for
							shadcn/ui
						</Badge>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
							ColorSwitch<span className="text-primary">CN</span>
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-[42rem] mx-auto">
							A beautiful, accessible theme switcher component for your
							shadcn/ui projects with smooth transitions and multiple theme
							presets.
						</p>
						<div className="flex items-center justify-center mt-2">
							<Badge
								variant="outline"
								className="px-3 py-1 text-xs gap-1 border-primary/20"
							>
								<span>Powered by</span>
								<a
									href="https://tweakcn.com"
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold text-primary hover:underline"
								>
									TweakCN
								</a>
							</Badge>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 mt-6">
							<Button size="lg" asChild>
								<Link href="#installation">
									Get Started <ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button variant="outline" size="lg" asChild>
								<Link
									href="https://github.com/heywinit/colorswitchcn"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5"
								>
									<Github className="h-4 w-4" />
									<span>View on GitHub</span>
								</Link>
							</Button>
						</div>
					</div>

					<div className="flex justify-center items-center mt-10 mb-4">
						<div className="bg-card rounded-2xl border shadow-sm p-8 flex flex-col items-center gap-8 w-full max-w-2xl">
							<div className="flex flex-col items-center gap-2">
								<h3 className="text-2xl font-medium">Interactive Preview</h3>
								<p className="text-muted-foreground text-center max-w-md">
									Experience the theme switcher in action. Try switching between
									themes and color modes.
								</p>
							</div>

							<div className="flex flex-col items-center gap-6 w-full">
								<ThemeSwitcher />

								<div className="text-sm text-center text-muted-foreground">
									<p className="flex items-center justify-center gap-2">
										<span className="inline-block size-2 rounded-full bg-primary" />
										See real-time theme changes as you interact with the
										component
									</p>
								</div>
							</div>

							<div className="border-t w-full pt-6 flex justify-center">
								<Link
									href="https://github.com/heywinit"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5"
								>
									<Github className="h-3 w-3" />
									<span>Created by Winit.</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="w-full py-16 border-t bg-muted/30">
				<div className="container px-4 md:px-6 mx-auto">
					<div className="text-center mb-10">
						<h2 className="text-3xl font-bold tracking-tight mb-4">Features</h2>
						<p className="text-muted-foreground max-w-[42rem] mx-auto">
							Designed with developer experience and user interface in mind
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{features.map((feature) => (
							<Card
								key={feature.id}
								className="bg-card border transition-all hover:shadow-md"
							>
								<CardHeader>
									<div className="bg-primary/10 text-primary h-10 w-10 rounded-lg flex items-center justify-center mb-3">
										{feature.icon}
									</div>
									<CardTitle className="text-xl">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{feature.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<div className="flex-1 container px-4 md:px-6 mx-auto py-16">
				<main className="flex flex-col gap-16 max-w-4xl mx-auto">
					<section id="installation" className="scroll-mt-16">
						<h2 className="text-3xl font-bold tracking-tight mb-6">
							Installation
						</h2>
						<Card className="border shadow-sm">
							<CardHeader>
								<CardTitle className="text-2xl">Add to your project</CardTitle>
								<CardDescription>
									Follow these simple steps to integrate the theme switcher
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-8">
									<div className="space-y-4">
										<div className="flex items-center gap-2">
											<div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center">
												1
											</div>
											<h3 className="text-xl font-medium">
												Install the package
											</h3>
										</div>

										<div className="rounded-md border overflow-hidden">
											<div className="flex border-b bg-muted/50">
												{(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
													<button
														key={pm}
														type="button"
														onClick={() => setPackageManager(pm)}
														className={`px-4 py-2 text-sm font-medium transition-colors ${
															packageManager === pm
																? "bg-background text-foreground border-r border-l border-t rounded-t-md -mb-px"
																: "text-muted-foreground hover:text-foreground"
														}`}
													>
														{pm}
													</button>
												))}

												<Button
													variant="ghost"
													size="sm"
													onClick={copyRegistryCommand}
													className="h-9 ml-auto"
													aria-label={
														registryCopied
															? "Copied to clipboard"
															: "Copy to clipboard"
													}
												>
													{registryCopied ? (
														<Check className="size-4" />
													) : (
														<Copy className="size-4" />
													)}
												</Button>
											</div>
											<div className="p-4 bg-muted/20 flex justify-between items-center">
												<ScrollArea className="w-full">
													<div className="whitespace-nowrap overflow-y-hidden pb-2">
														<code className="text-sm font-mono">
															{getRegistryCommand()}
														</code>
													</div>
													<ScrollBar orientation="horizontal" />
												</ScrollArea>
											</div>
										</div>
									</div>

									<div className="space-y-4">
										<div className="flex items-center gap-2">
											<div className="bg-primary/10 text-primary h-8 w-8 rounded-full flex items-center justify-center">
												2
											</div>
											<h3 className="text-xl font-medium">Import and use</h3>
										</div>

										<div className="rounded-md overflow-hidden border">
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
								</div>
							</CardContent>
						</Card>
					</section>

					<section id="preview" className="scroll-mt-16">
						<h2 className="text-3xl font-bold tracking-tight mb-6">
							Theme Preview
						</h2>
						<Card className="border shadow-sm">
							<CardHeader>
								<CardTitle className="text-2xl">Interactive Demo</CardTitle>
								<CardDescription>
									See how colors change in real-time across UI elements
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-8">
								<div className="flex justify-center p-6 bg-card rounded-lg shadow-sm border">
									<ThemeSwitcher />
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="font-medium">Button (Primary)</span>
											<span className="text-xs text-muted-foreground font-mono">
												bg-primary
											</span>
										</div>
										<Button className="w-full" size="lg">
											Primary Button
										</Button>
									</div>

									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="font-medium">Button (Secondary)</span>
											<span className="text-xs text-muted-foreground font-mono">
												bg-secondary
											</span>
										</div>
										<Button variant="secondary" className="w-full" size="lg">
											Secondary Button
										</Button>
									</div>

									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="font-medium">Card Background</span>
											<span className="text-xs text-muted-foreground font-mono">
												bg-card
											</span>
										</div>
										<div className="h-20 bg-card rounded-md border flex items-center justify-center shadow-sm">
											Card Background
										</div>
									</div>

									<div className="space-y-2">
										<div className="flex justify-between">
											<span className="font-medium">Muted Background</span>
											<span className="text-xs text-muted-foreground font-mono">
												bg-muted
											</span>
										</div>
										<div className="h-20 bg-muted rounded-md border flex items-center justify-center shadow-sm">
											Muted Background
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>

					<section id="api" className="scroll-mt-16">
						<h2 className="text-3xl font-bold tracking-tight mb-6">
							API Reference
						</h2>
						<Card className="border shadow-sm">
							<CardContent className="pt-6">
								<div className="space-y-4">
									<div className="space-y-2">
										<h3 className="text-xl font-medium">
											ThemeSwitcher Component
										</h3>
										<p className="text-muted-foreground">
											The main component that includes both mode toggle and
											theme picker.
										</p>
										<div className="mt-4 font-mono text-sm rounded-md bg-muted p-4">
											&lt;ThemeSwitcher /&gt;
										</div>
									</div>

									<Separator className="my-4" />

									<div className="space-y-2">
										<h3 className="text-xl font-medium">Props</h3>
										<div className="grid grid-cols-1 gap-4">
											<div className="grid grid-cols-3 gap-4 font-mono text-sm">
												<div className="font-medium">className</div>
												<div className="col-span-2 text-muted-foreground">
													string
												</div>
											</div>
											<div className="grid grid-cols-3 gap-4 font-mono text-sm">
												<div className="font-medium">align</div>
												<div className="col-span-2 text-muted-foreground">
													&quot;start&quot; | &quot;center&quot; |
													&quot;end&quot;
												</div>
											</div>
											<div className="grid grid-cols-3 gap-4 font-mono text-sm">
												<div className="font-medium">transitionType</div>
												<div className="col-span-2 text-muted-foreground">
													&quot;none&quot; | &quot;fade&quot; |
													&quot;slide&quot; | &quot;zoom&quot; |
													&quot;rotate&quot; | &quot;flip&quot; |
													&quot;scale&quot; | &quot;pulse&quot;
												</div>
											</div>
											<div className="grid grid-cols-3 gap-4 font-mono text-sm">
												<div className="font-medium">transitionDuration</div>
												<div className="col-span-2 text-muted-foreground">
													number
												</div>
											</div>
											<div className="grid grid-cols-3 gap-4 font-mono text-sm">
												<div className="font-medium">disableTransition</div>
												<div className="col-span-2 text-muted-foreground">
													boolean
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>
				</main>
			</div>

			<footer className="border-t py-12 bg-muted/30">
				<div className="container px-4 md:px-6 mx-auto">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						<div>
							<h3 className="font-bold text-lg mb-3">ColorSwitchCN</h3>
							<p className="text-muted-foreground text-sm">
								A beautiful theme switcher component for shadcn/ui projects.
							</p>
						</div>
						<div>
							<h3 className="font-bold text-lg mb-3">Links</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="#installation"
										className="text-sm text-muted-foreground hover:text-foreground"
									>
										Installation
									</Link>
								</li>
								<li>
									<Link
										href="/transitions"
										className="text-sm text-muted-foreground hover:text-foreground"
									>
										Transitions
									</Link>
								</li>
								<li>
									<Link
										href="/hook-example"
										className="text-sm text-muted-foreground hover:text-foreground"
									>
										Hook API
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-bold text-lg mb-3">Resources</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="https://github.com/jnsahaj/tweakcn"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-muted-foreground hover:text-foreground"
									>
										GitHub
									</Link>
								</li>
								<li>
									<Link
										href="https://tweakcn.com"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-muted-foreground hover:text-foreground"
									>
										TweakCN
									</Link>
								</li>
								<li>
									<Link
										href="https://ui.shadcn.com"
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-muted-foreground hover:text-foreground"
									>
										shadcn/ui
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-bold text-lg mb-3">About</h3>
							<p className="text-sm text-muted-foreground">
								Based on{" "}
								<a
									href="https://tweakcn.com"
									className="font-medium underline underline-offset-4"
									target="_blank"
									rel="noopener noreferrer"
								>
									TweakCN
								</a>{" "}
								by Sahaj, a visual editor for shadcn/ui themes with beautiful
								preset designs.
							</p>
							<div className="mt-4">
								<Button variant="outline" size="sm" asChild>
									<Link
										href="https://github.com/jnsahaj/tweakcn"
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1.5"
									>
										<Github className="h-4 w-4" />
										<span>Star on GitHub</span>
									</Link>
								</Button>
							</div>
						</div>
					</div>
					<div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
						<p>
							© {new Date().getFullYear()} ColorSwitchCN. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
