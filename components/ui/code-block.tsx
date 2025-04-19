"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-provider";

interface CodeBlockProps {
	code: string;
	language?: string;
	className?: string;
	showLineNumbers?: boolean;
}

export function CodeBlock({
	code,
	language = "tsx",
	className,
	showLineNumbers = false,
}: CodeBlockProps) {
	const { themeState } = useTheme();
	const [highlightedElement, setHighlightedElement] =
		React.useState<React.ReactNode>(null);

	React.useEffect(() => {
		async function highlight() {
			try {
				// Dynamically import shiki
				const shiki = await import("shiki");

				const highlighter = await shiki.createHighlighter({
					themes: ["github-dark", "github-light"],
					langs: [language],
				});

				const theme =
					themeState.currentMode === "dark" ? "github-dark" : "github-light";
				const html = highlighter.codeToHtml(code, {
					lang: language,
					theme,
				});

				// Create a wrapper element
				const wrapper = document.createElement("div");
				wrapper.className = cn(
					"code-block-wrapper",
					showLineNumbers && "has-line-numbers",
					className,
				);
				wrapper.setAttribute("data-language", language);
				wrapper.innerHTML = html;

				// If show line numbers is true, add line numbers
				if (showLineNumbers) {
					const codeElement = wrapper.querySelector("code");

					if (codeElement) {
						const codeLines = codeElement.querySelectorAll(".line");
						codeLines.forEach((line, index) => {
							line.classList.add("line-number");
							line.setAttribute("data-line", String(index + 1));
						});
					}
				}

				// Create a container ref callback
				const refCallback = (el: HTMLDivElement | null) => {
					if (el) {
						el.innerHTML = "";
						el.appendChild(wrapper);
					}
				};

				setHighlightedElement(<div ref={refCallback} />);
			} catch (error) {
				console.error("Failed to highlight code:", error);
				// Fallback to plain text
				setHighlightedElement(
					<pre
						className={cn("rounded-md bg-muted p-4 overflow-x-auto", className)}
					>
						<code>{code}</code>
					</pre>,
				);
			}
		}

		highlight();
	}, [code, language, themeState.currentMode, showLineNumbers, className]);

	// Fallback while loading
	if (!highlightedElement) {
		return (
			<pre className={cn("rounded-md bg-muted p-4 overflow-x-auto", className)}>
				<code>{code}</code>
			</pre>
		);
	}

	return <>{highlightedElement}</>;
}
