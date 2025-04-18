"use client";

import React, { useState } from "react";
import { ThemeModeToggle } from "@/components/ui/theme-mode-toggle";
import { ThemeProviderWrapper } from "@/components/theme-provider-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const transitionTypes = [
	"fade",
	"slide",
	"zoom",
	"rotate",
	"flip",
	"scale",
	"pulse",
	"none",
] as const;

export default function TransitionsDemo() {
	const [selectedTransition, setSelectedTransition] =
		useState<(typeof transitionTypes)[number]>("fade");
	const [duration, setDuration] = useState(300);

	return (
		<div className="container mx-auto py-8">
			<header className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Theme Transition Demos</h1>
				<p className="text-muted-foreground mb-4">
					Explore different theme transition effects
				</p>
				<Link href="/" className="text-primary hover:underline">
					Back to home
				</Link>
			</header>

			<div className="flex flex-col gap-8">
				<div className="flex flex-wrap gap-3">
					<p className="w-full font-medium mb-1">Select transition type:</p>
					{transitionTypes.map((type) => (
						<Button
							key={type}
							variant={selectedTransition === type ? "default" : "outline"}
							onClick={() => setSelectedTransition(type)}
							className="capitalize"
						>
							{type}
						</Button>
					))}
				</div>

				<div className="w-full md:w-1/2">
					<label htmlFor="duration-slider" className="font-medium block mb-2">
						Duration: {duration}ms
					</label>
					<input
						id="duration-slider"
						type="range"
						min="100"
						max="1000"
						step="50"
						value={duration}
						onChange={(e) => setDuration(Number(e.target.value))}
						className="w-full"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Current Selection: {selectedTransition}</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col items-center gap-4">
							<ThemeProviderWrapper
								transitionType={selectedTransition}
								transitionDuration={duration}
							>
								<div className="flex flex-col items-center gap-4 p-6 w-full bg-card rounded-lg border">
									<div className="w-20 h-20 bg-primary rounded-md flex items-center justify-center">
										<span className="text-primary-foreground">Primary</span>
									</div>
									<ThemeModeToggle size="default" />
								</div>
							</ThemeProviderWrapper>
						</CardContent>
					</Card>

					{selectedTransition !== "none" && (
						<Card>
							<CardHeader>
								<CardTitle>How it works</CardTitle>
							</CardHeader>
							<CardContent className="prose dark:prose-invert">
								<p>
									The{" "}
									<strong className="capitalize">{selectedTransition}</strong>{" "}
									transition:
								</p>
								{selectedTransition === "fade" && (
									<p>Smoothly fades between theme colors.</p>
								)}
								{selectedTransition === "slide" && (
									<p>Creates a circular reveal effect from the click point.</p>
								)}
								{selectedTransition === "zoom" && (
									<p>Slightly zooms the content during transition.</p>
								)}
								{selectedTransition === "rotate" && (
									<p>Applies a subtle rotation during the color change.</p>
								)}
								{selectedTransition === "flip" && (
									<p>Adds a perspective flip effect during transition.</p>
								)}
								{selectedTransition === "scale" && (
									<p>Slightly scales down during the transition.</p>
								)}
								{selectedTransition === "pulse" && (
									<p>Creates a pulse animation during theme change.</p>
								)}
							</CardContent>
						</Card>
					)}

					<Card>
						<CardHeader>
							<CardTitle>Implementation</CardTitle>
						</CardHeader>
						<CardContent>
							<pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
								{`<ThemeProviderWrapper
  transitionType="${selectedTransition}"
  transitionDuration={${duration}}
>
  {children}
</ThemeProviderWrapper>`}
							</pre>
							<p className="text-sm mt-4 text-muted-foreground">
								The transition is applied using CSS classes and custom
								properties, with no inline styles on HTML elements.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
