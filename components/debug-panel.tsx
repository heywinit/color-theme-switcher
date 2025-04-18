"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";
import { quickApplyTheme } from "@/lib/fix-global-css";
import { Button } from "@/components/ui/button";

export function DebugPanel() {
	const { themeState } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [cssVars, setCssVars] = useState<Record<string, string>>({});

	// Update CSS variables info when theme changes or panel is opened
	useEffect(() => {
		if (!isOpen) return;

		const styles = getComputedStyle(document.documentElement);
		const vars = {
			"--background": styles.getPropertyValue("--background"),
			"--foreground": styles.getPropertyValue("--foreground"),
			"--primary": styles.getPropertyValue("--primary"),
			"--secondary": styles.getPropertyValue("--secondary"),
			"--accent": styles.getPropertyValue("--accent"),
			"--muted": styles.getPropertyValue("--muted"),
		};

		setCssVars(vars);
	}, [isOpen]);

	if (!isOpen) {
		return (
			<Button
				variant="outline"
				size="sm"
				className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100"
				onClick={() => setIsOpen(true)}
			>
				Debug Theme
			</Button>
		);
	}

	const forceApplyTheme = () => {
		console.log("Forcing theme application");
		quickApplyTheme(themeState);

		// Refresh CSS vars
		const styles = getComputedStyle(document.documentElement);
		const vars = {
			"--background": styles.getPropertyValue("--background"),
			"--foreground": styles.getPropertyValue("--foreground"),
			"--primary": styles.getPropertyValue("--primary"),
			"--secondary": styles.getPropertyValue("--secondary"),
			"--accent": styles.getPropertyValue("--accent"),
			"--muted": styles.getPropertyValue("--muted"),
		};

		setCssVars(vars);
	};

	return (
		<div className="fixed bottom-4 right-4 z-50 p-4 bg-card border shadow-lg rounded-lg w-80 max-h-96 overflow-auto">
			<div className="flex justify-between items-center mb-2">
				<h3 className="font-bold">Theme Debug</h3>
				<Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
					Close
				</Button>
			</div>

			<div className="space-y-2 text-xs">
				<div className="flex justify-between">
					<span>Current Mode:</span>
					<span className="font-mono">{themeState.currentMode}</span>
				</div>
				<div className="flex justify-between">
					<span>Current Preset:</span>
					<span className="font-mono">{themeState.preset}</span>
				</div>

				<h4 className="font-semibold mt-4">CSS Variables:</h4>
				<div className="space-y-1 border p-2 rounded">
					{Object.entries(cssVars).map(([key, value]) => (
						<div key={key} className="flex justify-between gap-2">
							<span className="font-mono">{key}:</span>
							<span className="font-mono truncate">{value || "<empty>"}</span>
						</div>
					))}
				</div>

				<div className="flex flex-col gap-2 mt-4">
					<Button size="sm" onClick={forceApplyTheme}>
						Force Apply Theme
					</Button>
				</div>
			</div>
		</div>
	);
}
