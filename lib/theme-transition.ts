import type {
	ThemeState,
	ThemeTransitionOptions,
	ThemeTransitionType,
} from "./types";

// Default transition options
export const DEFAULT_TRANSITION: ThemeTransitionOptions = {
	type: "fade",
	duration: 300,
	easing: "ease-in-out",
};

// CSS for transitions
const TRANSITION_CSS: Record<
	ThemeTransitionType,
	(duration: number, easing: string) => string
> = {
	fade: (duration: number, easing: string) => `
    .theme-transition-fade {
      transition: background-color ${duration}ms ${easing},
                 color ${duration}ms ${easing},
                 border-color ${duration}ms ${easing},
                 box-shadow ${duration}ms ${easing};
    }
  `,
	slide: (duration: number, easing: string) => `
    .theme-transition-slide {
      position: relative;
      overflow: hidden;
    }
    .theme-transition-slide::before {
      content: '';
      position: absolute;
      top: var(--y, 50%);
      left: var(--x, 50%);
      width: 0;
      height: 0;
      border-radius: 100%;
      background: var(--theme-transition-bg, rgba(0, 0, 0, 0.1));
      transform: translate(-50%, -50%);
      transition: width ${duration}ms ${easing}, height ${duration}ms ${easing};
      z-index: -1;
    }
    .theme-transition-slide.transitioning::before {
      width: calc(100% * 2.5);
      height: calc(100% * 2.5);
    }
  `,
	zoom: (duration: number, easing: string) => `
    .theme-transition-zoom {
      transition: transform ${duration}ms ${easing},
                 background-color ${duration}ms ${easing},
                 color ${duration}ms ${easing};
    }
    .theme-transition-zoom.transitioning {
      transform: scale(1.01);
    }
  `,
	rotate: (duration: number, easing: string) => `
    .theme-transition-rotate {
      transition: transform ${duration}ms ${easing},
                 background-color ${duration}ms ${easing},
                 color ${duration}ms ${easing};
    }
    .theme-transition-rotate.transitioning {
      transform: rotate(2deg);
    }
  `,
	flip: (duration: number, easing: string) => `
    .theme-transition-flip {
      transition: transform ${duration}ms ${easing},
                 background-color ${duration}ms ${easing},
                 color ${duration}ms ${easing};
      transform-style: preserve-3d;
      perspective: 1000px;
    }
    .theme-transition-flip.transitioning {
      transform: rotateY(5deg);
    }
  `,
	scale: (duration: number, easing: string) => `
    .theme-transition-scale {
      transition: transform ${duration}ms ${easing},
                 background-color ${duration}ms ${easing},
                 color ${duration}ms ${easing};
    }
    .theme-transition-scale.transitioning {
      transform: scale(0.98);
    }
  `,
	pulse: (duration: number, easing: string) => `
    @keyframes theme-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.01); }
      100% { transform: scale(1); }
    }
    .theme-transition-pulse.transitioning {
      animation: theme-pulse ${duration}ms ${easing};
    }
  `,
	none: () => "",
};

// Setup transition styles
export function setupTransitionStyles(
	options: ThemeTransitionOptions = DEFAULT_TRANSITION,
): void {
	if (typeof window === "undefined") return;

	const {
		type,
		duration = DEFAULT_TRANSITION.duration,
		easing = DEFAULT_TRANSITION.easing,
	} = options;

	// Remove any existing transition styles
	const existingStyle = document.getElementById("theme-transition-styles");
	if (existingStyle) {
		existingStyle.remove();
	}

	// Skip if transition is none
	if (type === "none") return;

	// Create style element for transitions
	const styleEl = document.createElement("style");
	styleEl.id = "theme-transition-styles";
	styleEl.textContent = TRANSITION_CSS[type](
		duration || 300,
		easing || "ease-in-out",
	);
	document.head.appendChild(styleEl);
}

// Apply transition
export function applyThemeTransition(
	options: ThemeTransitionOptions,
	themeState: ThemeState,
	coords?: { x: number; y: number },
): void {
	if (typeof window === "undefined") return;

	const { type, duration = 300, targetSelector = ":root" } = options;
	if (type === "none") return;

	// Get target element
	const targetElement =
		targetSelector === ":root"
			? document.documentElement
			: document.querySelector(targetSelector);

	if (!targetElement) return;

	// Set coordinates for slide transition if provided
	if (type === "slide" && coords) {
		const htmlElement = targetElement as HTMLElement;
		htmlElement.style.setProperty("--x", `${coords.x}px`);
		htmlElement.style.setProperty("--y", `${coords.y}px`);
		htmlElement.style.setProperty(
			"--theme-transition-bg",
			themeState.currentMode === "dark"
				? "rgba(0, 0, 0, 0.8)"
				: "rgba(255, 255, 255, 0.8)",
		);
	}

	// Apply transition class
	targetElement.classList.add(`theme-transition-${type}`);
	targetElement.classList.add("transitioning");

	// Remove classes after transition completes
	setTimeout(() => {
		targetElement.classList.remove("transitioning");
		// Keep the base class for continuous properties like color transitions
	}, duration);
}
