import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

export function ThemePreview() {
	return (
		<section id="preview" className="scroll-mt-16">
			<h2 className="text-3xl font-bold tracking-tight mb-6">Theme Preview</h2>
			<Card className="border shadow-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Interactive Demo</CardTitle>
					<CardDescription>
						See how colors change instantly across UI elements
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
	);
}
