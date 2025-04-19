# ColorSwitchCN

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
# Using npm
npx shadcn@latest add https://colorswitchcn.heywinit.me/registry/colorswitchcn

# Using pnpm
pnpm dlx shadcn@latest add https://colorswitchcn.heywinit.me/registry/colorswitchcn

# Using yarn
yarn dlx shadcn@latest add https://colorswitchcn.heywinit.me/registry/colorswitchcn

# Using bun
bunx shadcn@latest add https://colorswitchcn.heywinit.me/registry/colorswitchcn
```

## Usage

After installing the components with shadcn, the files will be added to your project's components and lib directories. You can then import and use them:

```tsx
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>My App</h1>
      <ThemeSwitcher />
    </header>
  );
}
```

## Component Props

The `ThemeSwitcher` component accepts the following props:

| Prop      | Type                    | Default       | Description                          |
|-----------|-------------------------|---------------|--------------------------------------|
| className | string                  | -             | Additional CSS classes               |
| align     | "start"/"center"/"end"  | "center"      | Horizontal alignment of components   |

## Theme Management

The component includes a theme provider that needs to be wrapped around your application. Add the following to your root layout:

```tsx
// In your app layout
import { ThemeProvider } from "next-themes";
import { CustomThemeProvider } from "@/lib/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomThemeProvider defaultPreset="modern-minimal">
            {children}
          </CustomThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

You can access and modify the theme programmatically using the `useTheme` hook:

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
