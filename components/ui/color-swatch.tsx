"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
	color: string;
	size?: "sm" | "md" | "lg";
}

export function ColorSwatch({
	color,
	size = "md",
	className,
	...props
}: ColorSwatchProps) {
	const sizeClasses = {
		sm: "h-4 w-4",
		md: "h-6 w-6",
		lg: "h-8 w-8",
	};

	return (
		<div
			className={cn(
				"rounded-md flex-shrink-0 border border-border/30",
				sizeClasses[size],
				className,
			)}
			style={{ backgroundColor: color }}
			{...props}
		/>
	);
}
