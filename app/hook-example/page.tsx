"use client";

import { useThemeSwitch } from "@/lib/use-theme-switch";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HookExamplePage() {
	const { theme, setTheme, preset, setPreset, presets } = useThemeSwitch();

	return (
		<div className="container py-10 space-y-8">
			<h1 className="text-3xl font-bold tracking-tight">
				useThemeSwitch Hook API
			</h1>

			<Card>
				<CardHeader>
					<CardTitle>Overview</CardTitle>
					<CardDescription>
						The useThemeSwitch hook provides a comprehensive way to control
						theme settings in your application.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<p>
						This hook handles both light/dark mode toggling and custom color
						presets. It&apos;s inspired by the TweakCN theme system.
					</p>

					<h3 className="text-lg font-semibold">Installation</h3>
					<Code>
						{`import { useThemeSwitch } from "@/lib/use-theme-switch";`}
					</Code>

					<h3 className="text-lg font-semibold">Basic Usage</h3>
					<Code>
						{`const { theme, setTheme, preset, setPreset, presets } = useThemeSwitch();

// Toggle between light/dark
setTheme(theme === 'light' ? 'dark' : 'light');

// Apply a different color preset
setPreset('blue');`}
					</Code>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Live Example</CardTitle>
					<CardDescription>
						See the hook in action with this interactive example
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex flex-wrap gap-4">
						<div>
							<h3 className="text-sm font-medium mb-2">Theme Mode</h3>
							<div className="flex gap-2">
								<Button
									variant={theme === "light" ? "default" : "outline"}
									onClick={() => setTheme("light")}
								>
									Light
								</Button>
								<Button
									variant={theme === "dark" ? "default" : "outline"}
									onClick={() => setTheme("dark")}
								>
									Dark
								</Button>
							</div>
						</div>

						<div>
							<h3 className="text-sm font-medium mb-2">
								Current Preset: {preset}
							</h3>
							<div className="flex flex-wrap gap-2">
								{presets.slice(0, 5).map((p) => (
									<Button
										key={p.id}
										variant={preset === p.id ? "default" : "outline"}
										onClick={() => setPreset(p.id)}
									>
										{p.label}
									</Button>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Tabs defaultValue="options">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="options">Hook Options</TabsTrigger>
					<TabsTrigger value="returnValues">Return Values</TabsTrigger>
				</TabsList>
				<TabsContent value="options" className="mt-4">
					<Card>
						<CardHeader>
							<CardTitle>Hook Options</CardTitle>
							<CardDescription>
								Configure the useThemeSwitch hook with these options
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<Code>
								{`useThemeSwitch({
  defaultPreset: "default",           // Default preset to use
  transitionOptions: {                // Options for theme transitions
    type: "fade",                     // "fade" | "circular" | "none"
    duration: 300,                    // Duration in milliseconds
    easing: "ease-in-out"             // CSS easing function
  },
  disableTransition: false,           // Whether to disable transitions
});`}
							</Code>

							<div className="grid gap-4">
								<div>
									<h3 className="text-sm font-semibold">defaultPreset</h3>
									<p className="text-sm text-muted-foreground">
										The preset to use when no preset is saved in localStorage.
									</p>
								</div>
								<div>
									<h3 className="text-sm font-semibold">transitionOptions</h3>
									<p className="text-sm text-muted-foreground">
										Configure how theme transitions animate when changing
										themes.
									</p>
								</div>
								<div>
									<h3 className="text-sm font-semibold">disableTransition</h3>
									<p className="text-sm text-muted-foreground">
										Disable all transitions for immediate theme changes.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="returnValues" className="mt-4">
					<Card>
						<CardHeader>
							<CardTitle>Return Values</CardTitle>
							<CardDescription>
								The hook returns these values and functions
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4">
								<div>
									<h3 className="text-sm font-semibold">theme</h3>
									<p className="text-sm text-muted-foreground">
										Current theme mode (&apos;light&apos; or &apos;dark&apos;)
									</p>
								</div>
								<div>
									<h3 className="text-sm font-semibold">
										setTheme(mode, coords)
									</h3>
									<p className="text-sm text-muted-foreground">
										Function to set the theme mode. Optional coords parameter
										for circular transitions.
									</p>
								</div>
								<div>
									<h3 className="text-sm font-semibold">preset</h3>
									<p className="text-sm text-muted-foreground">
										Current color preset ID
									</p>
								</div>
								<div>
									<h3 className="text-sm font-semibold">setPreset(presetId)</h3>
									<p className="text-sm text-muted-foreground">
										Function to apply a different color preset
									</p>
								</div>
								<div>
									<h3 className="text-sm font-semibold">styles</h3>
									<p className="text-sm text-muted-foreground">
										Current theme styles object
									</p>
								</div>
								<div>
									<h3 className="text-sm font-semibold">presets</h3>
									<p className="text-sm text-muted-foreground">
										Array of all available presets with their IDs and labels
									</p>
								</div>
								<div>
									<h3 className="text-sm font-semibold">
										getPresetLabel(presetId)
									</h3>
									<p className="text-sm text-muted-foreground">
										Function to get a human-readable label for a preset ID
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<p className="text-sm text-muted-foreground">
				Theme system inspired by TweakCN (https://tweakcn.com)
			</p>
		</div>
	);
}
