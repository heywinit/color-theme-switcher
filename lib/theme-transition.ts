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

// Optimization: Use GPU-accelerated properties where possible
// CSS for transitions - optimized for performance
const TRANSITION_CSS: Record<
	ThemeTransitionType,
	(duration: number, easing: string) => string
> = {
	fade: (duration: number, easing: string) => `
    .theme-transition-fade {
      transition: opacity ${duration}ms ${easing},
                 transform ${duration}ms ${easing},
                 background-color ${duration}ms ${easing},
                 color ${duration}ms ${easing},
                 border-color ${duration}ms ${easing};
      will-change: opacity, background-color, color;
    }
    .theme-transition-fade.transitioning {
      opacity: 0.98;
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
      will-change: width, height;
      pointer-events: none;
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
      will-change: transform;
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
      will-change: transform;
      backface-visibility: hidden;
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
      will-change: transform;
      backface-visibility: hidden;
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
      will-change: transform;
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
    .theme-transition-pulse {
      will-change: transform;
    }
    .theme-transition-pulse.transitioning {
      animation: theme-pulse ${duration}ms ${easing};
    }
  `,
	none: () => "",
};

// Optimize stylesheet creation to reduce layout thrashing
let transitionStylesCreated = false;

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

	// Skip if transition is none
	if (type === "none") return;

	// Optimization: Only recreate stylesheet if it doesn't exist
	const existingStyle = document.getElementById("theme-transition-styles");
	if (existingStyle) {
		// If we already have styles for this transition type, just return
		if (existingStyle.dataset.transitionType === type) {
			return;
		}
		existingStyle.remove();
	}

	// Create style element for transitions
	const styleEl = document.createElement("style");
	styleEl.id = "theme-transition-styles";
	styleEl.dataset.transitionType = type;
	styleEl.textContent = TRANSITION_CSS[type](
		duration || 300,
		easing || "ease-in-out",
	);

	// Use requestAnimationFrame to batch changes and reduce layout thrashing
	if (!transitionStylesCreated) {
		window.requestAnimationFrame(() => {
			document.head.appendChild(styleEl);
			transitionStylesCreated = true;
		});
	} else {
		document.head.appendChild(styleEl);
	}
}

// Track ongoing transitions to avoid conflicts
let transitionInProgress = false;
let transitionTimeoutId: ReturnType<typeof setTimeout> | null = null;

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

	// Optimization: If a transition is already in progress, clear the timeout
	// to avoid multiple transitions stacking
	if (transitionInProgress && transitionTimeoutId) {
		clearTimeout(transitionTimeoutId);
		targetElement.classList.remove("transitioning");
	}

	transitionInProgress = true;

	// Use requestAnimationFrame to optimize performance
	window.requestAnimationFrame(() => {
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

		// Use a second rAF to ensure the first changes have been applied
		// This creates a smooth transition
		window.requestAnimationFrame(() => {
			targetElement.classList.add("transitioning");

			// Clear transition classes after animation completes
			transitionTimeoutId = setTimeout(() => {
				targetElement.classList.remove("transitioning");
				transitionInProgress = false;
				transitionTimeoutId = null;
			}, duration + 50); // Add 50ms buffer for safety
		});
	});
}
