"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
	// Create unique keys for thumbs that don't rely on indices
	const defaultValueThumbIds = React.useMemo(
		() =>
			props.defaultValue?.map(
				(value) =>
					`thumb-default-${value}-${Math.random().toString(36).substring(2, 9)}`,
			) || [],
		[props.defaultValue],
	);

	const valueThumbIds = React.useMemo(
		() =>
			props.value?.map(
				(value) =>
					`thumb-value-${value}-${Math.random().toString(36).substring(2, 9)}`,
			) || [],
		[props.value],
	);

	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex w-full touch-none select-none items-center",
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
				<SliderPrimitive.Range className="absolute h-full bg-primary" />
			</SliderPrimitive.Track>

			{/* Use stable identifiers instead of array indices */}
			{props.defaultValue?.map((value, i) => (
				<SliderPrimitive.Thumb
					key={defaultValueThumbIds[i]}
					className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				/>
			))}
			{props.value?.map((value, i) => (
				<SliderPrimitive.Thumb
					key={valueThumbIds[i]}
					className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				/>
			))}
		</SliderPrimitive.Root>
	);
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
