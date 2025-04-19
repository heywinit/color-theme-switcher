import React from "react";
import { Copy, Check } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CodeBlock } from "@/components/ui/code-block";

export function Installation() {
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
				return "pnpm dlx shadcn@latest add https://colorswitchcn.heywinit.me/r/colorswitchcn.json";
			case "npm":
				return "npx shadcn@latest add https://colorswitchcn.heywinit.me/r/colorswitchcn.json";
			case "yarn":
				return "yarn dlx shadcn@latest add https://colorswitchcn.heywinit.me/r/colorswitchcn.json";
			case "bun":
				return "bunx shadcn@latest add https://colorswitchcn.heywinit.me/r/colorswitchcn.json";
			default:
				return "npx shadcn@latest add https://colorswitchcn.heywinit.me/r/colorswitchcn.json";
		}
	};

	return (
		<section id="installation" className="scroll-mt-16">
			<h2 className="text-3xl font-bold tracking-tight mb-6">Installation</h2>
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
								<h3 className="text-xl font-medium">Install the package</h3>
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
	);
}
