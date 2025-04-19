import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ApiReference() {
	return (
		<section id="api" className="scroll-mt-16">
			<h2 className="text-3xl font-bold tracking-tight mb-6">API Reference</h2>
			<Card className="border shadow-sm">
				<CardContent className="pt-6">
					<div className="space-y-4">
						<div className="space-y-2">
							<h3 className="text-xl font-medium">ThemeSwitcher Component</h3>
							<p className="text-muted-foreground">
								The main component that includes both mode toggle and theme
								picker.
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
									<div className="col-span-2 text-muted-foreground">string</div>
								</div>
								<div className="grid grid-cols-3 gap-4 font-mono text-sm">
									<div className="font-medium">align</div>
									<div className="col-span-2 text-muted-foreground">
										&quot;start&quot; | &quot;center&quot; | &quot;end&quot;
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
