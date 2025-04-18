"use client";

import { cn } from "@/lib/utils";

export function Code({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLPreElement>) {
	return (
		<pre
			className={cn(
				"rounded-md bg-muted p-4 overflow-x-auto text-sm",
				className,
			)}
			{...props}
		>
			<code>{children}</code>
		</pre>
	);
}
