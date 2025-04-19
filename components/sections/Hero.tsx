import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
	return (
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
						A beautiful, accessible theme switcher component for your shadcn/ui
						projects with instant theme changes and multiple theme presets.
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
									See instant theme changes as you interact with the component
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
	);
}
