"use client";

import type * as React from "react";
import { useState, useEffect, useRef } from "react";
import type { ThemeTransitionType } from "@/lib/types";

interface TransitionControlsProps {
	onChange?: (options: {
		type: ThemeTransitionType;
		duration: number;
		disabled: boolean;
	}) => void;
}

export function TransitionControls({ onChange }: TransitionControlsProps) {
	// Available transition types
	const transitionTypes: { value: ThemeTransitionType; label: string }[] = [
		{ value: "fade", label: "Fade" },
		{ value: "slide", label: "Slide" },
		{ value: "zoom", label: "Zoom" },
		{ value: "rotate", label: "Rotate" },
		{ value: "flip", label: "Flip" },
		{ value: "scale", label: "Scale" },
		{ value: "pulse", label: "Pulse" },
		{ value: "none", label: "None" },
	];

	// State for the current settings
	const [transitionType, setTransitionType] =
		useState<ThemeTransitionType>("fade");
	const [duration, setDuration] = useState<number>(300);
	const [disabled, setDisabled] = useState<boolean>(false);

	// Track whether we've initialized from localStorage to prevent loops
	const initialized = useRef(false);
	// Track previous values to prevent unnecessary updates
	const prevValues = useRef({ type: "fade", duration: 300, disabled: false });

	// Load settings from localStorage on mount
	useEffect(() => {
		if (typeof window === "undefined" || initialized.current) return;

		try {
			const storedType = localStorage.getItem(
				"theme-transition-type",
			) as ThemeTransitionType;
			const storedDuration = localStorage.getItem("theme-transition-duration");
			const storedDisabled = localStorage.getItem("theme-transition-disabled");

			if (storedType && transitionTypes.some((t) => t.value === storedType)) {
				setTransitionType(storedType);
				prevValues.current.type = storedType;
			}

			if (storedDuration) {
				const parsedDuration = Number.parseInt(storedDuration, 10);
				if (!Number.isNaN(parsedDuration)) {
					setDuration(parsedDuration);
					prevValues.current.duration = parsedDuration;
				}
			}

			if (storedDisabled) {
				const isDisabled = storedDisabled === "true";
				setDisabled(isDisabled);
				prevValues.current.disabled = isDisabled;
			}

			initialized.current = true;
		} catch (error) {
			console.error("Error loading transition settings:", error);
		}
	}, []);

	// Update localStorage and call onChange when settings change
	useEffect(() => {
		if (typeof window === "undefined" || !initialized.current) return;

		// Check if values actually changed before updating localStorage
		const hasChanges =
			prevValues.current.type !== transitionType ||
			prevValues.current.duration !== duration ||
			prevValues.current.disabled !== disabled;

		if (!hasChanges) return;

		// Update stored previous values
		prevValues.current = {
			type: transitionType,
			duration,
			disabled,
		};

		// Update localStorage
		localStorage.setItem("theme-transition-type", transitionType);
		localStorage.setItem("theme-transition-duration", duration.toString());
		localStorage.setItem("theme-transition-disabled", disabled.toString());

		// Call onChange handler
		onChange?.({
			type: transitionType,
			duration,
			disabled,
		});
	}, [transitionType, duration, disabled, onChange]);

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTransitionType(e.target.value as ThemeTransitionType);
	};

	const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDuration(Number(e.target.value));
	};

	const handleDisabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDisabled(e.target.checked);
	};

	return (
		<div className="space-y-6 p-2">
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="transition-type" className="text-sm font-medium">
						Transition Type
					</label>
					<span className="text-xs text-muted-foreground">
						Visual effect during theme change
					</span>
				</div>
				<select
					id="transition-type"
					className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
					value={transitionType}
					onChange={handleTypeChange}
					disabled={disabled}
				>
					{transitionTypes.map((type) => (
						<option key={type.value} value={type.value}>
							{type.label}
						</option>
					))}
				</select>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="transition-duration" className="text-sm font-medium">
						Duration: {duration}ms
					</label>
					<span className="text-xs text-muted-foreground">
						How long the transition takes
					</span>
				</div>
				<input
					id="transition-duration"
					type="range"
					min={100}
					max={1000}
					step={50}
					value={duration}
					onChange={handleDurationChange}
					disabled={disabled || transitionType === "none"}
					className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer disabled:opacity-50"
				/>
			</div>

			<div className="flex items-center space-x-2">
				<input
					id="disable-transition"
					type="checkbox"
					checked={disabled}
					onChange={handleDisabledChange}
					className="rounded border-input h-4 w-4"
				/>
				<label htmlFor="disable-transition" className="text-sm font-medium">
					Disable transitions
				</label>
			</div>
		</div>
	);
}
