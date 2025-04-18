export type ThemeMode = "light" | "dark";

export interface ThemeStyleProps {
	background?: string;
	foreground?: string;
	card?: string;
	"card-foreground"?: string;
	popover?: string;
	"popover-foreground"?: string;
	primary?: string;
	"primary-foreground"?: string;
	secondary?: string;
	"secondary-foreground"?: string;
	muted?: string;
	"muted-foreground"?: string;
	accent?: string;
	"accent-foreground"?: string;
	destructive?: string;
	"destructive-foreground"?: string;
	border?: string;
	input?: string;
	ring?: string;
	"chart-1"?: string;
	"chart-2"?: string;
	"chart-3"?: string;
	"chart-4"?: string;
	"chart-5"?: string;
	radius?: string;
	sidebar?: string;
	"sidebar-foreground"?: string;
	"sidebar-primary"?: string;
	"sidebar-primary-foreground"?: string;
	"sidebar-accent"?: string;
	"sidebar-accent-foreground"?: string;
	"sidebar-border"?: string;
	"sidebar-ring"?: string;
	"font-sans"?: string;
	"font-serif"?: string;
	"font-mono"?: string;
	"shadow-color"?: string;
	"shadow-opacity"?: string;
	"shadow-blur"?: string;
	"shadow-spread"?: string;
	"shadow-offset-x"?: string;
	"shadow-offset-y"?: string;
	[key: string]: string | undefined;
}

export interface ThemeStyles {
	light: ThemeStyleProps;
	dark: ThemeStyleProps;
}

export interface ThemePreset {
	label: string;
	createdAt?: string;
	styles: {
		light: ThemeStyleProps;
		dark?: ThemeStyleProps;
	};
}

export interface ThemeState {
	currentMode: ThemeMode;
	preset: string;
	styles: ThemeStyles;
}

export type ColorFormat = "hsl" | "hex" | "rgb" | "oklch";

export type ThemeTransitionType =
	| "none"
	| "fade"
	| "slide"
	| "zoom"
	| "rotate"
	| "flip"
	| "scale"
	| "pulse";

export interface ThemeTransitionOptions {
	type: ThemeTransitionType;
	duration?: number; // in ms
	easing?: string;
	targetSelector?: string; // CSS selector for target element (defaults to :root)
}

export interface ThemeProviderProps {
	children: React.ReactNode;
	defaultPreset?: string;
	transitionOptions?: ThemeTransitionOptions;
	disableTransition?: boolean;
}
