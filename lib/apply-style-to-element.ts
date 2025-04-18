export function applyStyleToElement(
	element: HTMLElement,
	property: string,
	value: string,
): void {
	try {
		element.style.setProperty(`--${property}`, value);
	} catch (error) {
		console.error(`Error setting CSS variable --${property}:`, error);
	}
}
