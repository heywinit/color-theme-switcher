import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useThemeSwitch } from "@/lib/use-theme-switch";
import { useEffect } from "react";

export function HookApi() {
	const { theme, switchPreset, toggleMode, allPresets, isInitialized } =
		useThemeSwitch();

	// Debug current theme state
	useEffect(() => {
		if (isInitialized) {
			console.log("Current theme state:", theme);
		}
	}, [theme, isInitialized]);

	const handleModeToggle = (targetMode: "light" | "dark") => {
		console.log(
			`Toggling to ${targetMode} mode, current is ${theme.currentMode}`,
		);
		if (theme.currentMode !== targetMode) {
			toggleMode();
		}
	};

	const handlePresetChange = (presetId: string) => {
		console.log(`Switching to preset ${presetId}, current is ${theme.preset}`);
		if (theme.preset !== presetId) {
			switchPreset(presetId);
		}
	};

	return (
		<section id="hook-api" className="scroll-mt-16">
			<h2 className="text-3xl font-bold tracking-tight mb-6">
				useThemeSwitch Hook API
			</h2>
			<Card className="border shadow-sm">
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
					<CodeBlock
						code={`import { useThemeSwitch } from "colorswitchcn";`}
						language="tsx"
					/>

					<h3 className="text-lg font-semibold">Basic Usage</h3>
					<CodeBlock
						code={`const { theme, switchPreset, toggleMode, allPresets } = useThemeSwitch();

// Toggle between light/dark
toggleMode();

// Apply a different color preset
switchPreset('blue');`}
						language="tsx"
					/>
				</CardContent>
			</Card>

			<div className="mt-8">
				<Card className="border shadow-sm">
					<CardHeader>
						<CardTitle>Live Example</CardTitle>
						<CardDescription>
							See the hook in action with this interactive example
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex flex-wrap gap-4">
							<div>
								<h3 className="text-sm font-medium mb-2">
									Theme Mode: {theme.currentMode}
								</h3>
								<div className="flex gap-2">
									<Button
										variant={
											theme.currentMode === "light" ? "default" : "outline"
										}
										onClick={() => handleModeToggle("light")}
									>
										Light
									</Button>
									<Button
										variant={
											theme.currentMode === "dark" ? "default" : "outline"
										}
										onClick={() => handleModeToggle("dark")}
									>
										Dark
									</Button>
								</div>
							</div>

							<div>
								<h3 className="text-sm font-medium mb-2">
									Current Preset: {theme.preset}
								</h3>
								<div className="flex flex-wrap gap-2">
									{Object.entries(allPresets)
										.slice(0, 5)
										.map(([id, preset]) => (
											<Button
												key={id}
												variant={theme.preset === id ? "default" : "outline"}
												onClick={() => handlePresetChange(id)}
											>
												{preset.label}
											</Button>
										))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="mt-8">
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
								<CodeBlock
									code={`useThemeSwitch({
  defaultPreset: "default",           // Default preset to use
});`}
									language="tsx"
								/>

								<div className="grid gap-4">
									<div>
										<h3 className="text-sm font-semibold">defaultPreset</h3>
										<p className="text-sm text-muted-foreground">
											The preset to use when no preset is saved in localStorage.
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
											Current theme state object with currentMode, preset, and
											styles properties
										</p>
									</div>
									<div>
										<h3 className="text-sm font-semibold">toggleMode()</h3>
										<p className="text-sm text-muted-foreground">
											Function to toggle between light and dark mode
										</p>
									</div>
									<div>
										<h3 className="text-sm font-semibold">isInitialized</h3>
										<p className="text-sm text-muted-foreground">
											Whether the theme has been initialized
										</p>
									</div>
									<div>
										<h3 className="text-sm font-semibold">
											switchPreset(presetId)
										</h3>
										<p className="text-sm text-muted-foreground">
											Function to apply a different color preset
										</p>
									</div>
									<div>
										<h3 className="text-sm font-semibold">allPresets</h3>
										<p className="text-sm text-muted-foreground">
											Record of all available presets with their IDs and
											configuration
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
