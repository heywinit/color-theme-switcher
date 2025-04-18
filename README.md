# Color Theme Switcher for ShadCN

A comprehensive color theme switcher component for ShadCN UI. This component allows users to toggle between light and dark modes and select from a variety of predefined color schemes.

This component is inspired by and compatible with [TweakCN](https://tweakcn.com), a powerful Visual Theme Editor for tailwind CSS & shadcn/ui components created by [Sahaj](https://github.com/jnsahaj).

## Features

- Toggle between light and dark modes
- Select from multiple color schemes
- Persist theme preferences in local storage
- Automatically apply theme changes to the document
- Fully customizable and extensible

## Installation

```bash
# Using bun
bun add @radix-ui/react-dropdown-menu @radix-ui/react-slot lucide-react

# Using npm
npm install @radix-ui/react-dropdown-menu @radix-ui/react-slot lucide-react

# Using yarn
yarn add @radix-ui/react-dropdown-menu @radix-ui/react-slot lucide-react

# Using pnpm
pnpm add @radix-ui/react-dropdown-menu @radix-ui/react-slot lucide-react
```

## Usage

1. Import the Color Theme Switcher component:

```tsx
import { ColorThemeSwitcher } from "@/components/ui/color-theme-switcher";
```

2. Use it in your application:

```tsx
export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <ColorThemeSwitcher />
    </header>
  );
}
```

## Component Props

The `ColorThemeSwitcher` component accepts the following props:

| Prop      | Type                    | Default       | Description                          |
|-----------|-------------------------|---------------|--------------------------------------|
| className | string                  | -             | Additional CSS classes               |
| align     | "start"/"center"/"end"  | "center"      | Horizontal alignment of components   |
| mode      | "horizontal"/"vertical" | "horizontal"  | Layout direction                     |

## Theme Management

The theme state is managed through a dedicated context provider. You can access and modify the theme programmatically using the `useTheme` hook:

```tsx
import { useTheme } from "@/lib/theme-provider";

function MyComponent() {
  const { themeState, setThemeMode, applyThemePreset } = useTheme();

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setThemeMode(themeState.currentMode === "light" ? "dark" : "light");
  };

  // Apply a specific theme preset
  const applyTheme = (presetName: string) => {
    applyThemePreset(presetName);
  };

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme Mode</button>
      <button onClick={() => applyTheme("cyberpunk")}>Apply Cyberpunk Theme</button>
    </div>
  );
}
```

## Adding Custom Themes

You can add your own theme presets by modifying the `presets` object in `theme-presets.ts`:

```tsx
// Add your custom theme preset
export const presets: Record<string, ThemePreset> = {
  // Existing presets...
  
  "my-custom-theme": {
    label: "My Custom Theme",
    styles: {
      light: {
        // Light mode colors
        background: "#ffffff",
        foreground: "#333333",
        primary: "#ff0000",
        // ... other properties
      },
      dark: {
        // Dark mode colors
        background: "#000000",
        foreground: "#ffffff",
        primary: "#ff0000",
        // ... other properties
      }
    }
  }
};
```

## License

MIT
