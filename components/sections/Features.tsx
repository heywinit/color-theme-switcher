import { Code, Palette, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Features() {
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
			id: "customizable",
			title: "Customizable",
			description: "Fully customizable with simple API and hooks",
			icon: <Sparkles className="h-5 w-5" />,
		},
	];

	return (
		<section className="w-full py-16 border-t bg-muted/30">
			<div className="container px-4 md:px-6 mx-auto">
				<div className="text-center mb-10">
					<h2 className="text-3xl font-bold tracking-tight mb-4">Features</h2>
					<p className="text-muted-foreground max-w-[42rem] mx-auto">
						Designed with developer experience and user interface in mind
					</p>
				</div>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
	);
}
