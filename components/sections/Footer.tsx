import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
	return (
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
									href="#hook-api"
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
									href="https://github.com/heywinit/colorswitchcn"
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
									href="https://github.com/heywinit/colorswitchcn"
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
	);
}
