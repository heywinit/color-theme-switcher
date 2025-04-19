"use client";

import * as React from "react";
import {
	Hero,
	Features,
	Installation,
	ThemePreview,
	HookApi,
	Footer,
} from "@/components/sections";

export default function Home() {
	return (
		<div className="w-full min-h-screen flex flex-col">
			<Hero />
			<Features />

			<div className="flex-1 container px-4 md:px-6 mx-auto py-16">
				<main className="flex flex-col gap-16 max-w-4xl mx-auto">
					<Installation />
					<ThemePreview />
					<HookApi />
				</main>
			</div>

			<Footer />
		</div>
	);
}
