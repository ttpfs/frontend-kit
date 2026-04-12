# @ttpfs/ui-react

> Version: **1.4.5**

A React UI component library built on top of HeroUI and Tailwind CSS v4.

## Installation

```bash
pnpm add @ttpfs/ui-react
```

## Peer Dependencies

The following packages must be installed in your project:

| Package                      | Version   |
| ---------------------------- | --------- |
| `react`                      | `^19`     |
| `react-dom`                  | `^19`     |
| `tailwindcss`                | `^4`      |
| `@iconify/tailwind4`         | `^1.2.1`  |
| `@iconify-json/lucide`       | `^1.2.86` |
| `@iconify-json/logos`        | `^1.2.10` |
| `@iconify-json/svg-spinners` | `^1.2.4`  |

## Setup

Import the global CSS at your app entry point:

```ts
import "@ttpfs/ui-react/global.css";
```

Wrap your application with `ThemeProvider` to using Dark theme mode next-themes-based:

```tsx
import { ThemeProvider } from "@ttpfs/ui-react";

export default function App() {
  return (
    <ThemeProvider>
      {/* your app */}
    </ThemeProvider>
  );
}
```

## Components

### Primitives

* `Button`, `CloseButton`, `ToggleButton`, `ToggleButtonGroup`, `Toolbar`
* `Checkbox`, `CheckboxGroup`, `Radio`, `RadioGroup`
* `Input`, `InputGroup`, `InputOTP`, `TextArea`
* `Switch`, `SwitchGroup`
* `Label`, `Description`, `Header`
* `Spinner`, `Kbd`, `Snippet`, `Link`, `Snippet`, `Icon`

### Composite Fields

* `TextField`, `NumberField`, `ColorField`, `SearchField`
* `DateField`, `TimeField`, `Fieldset`, `ThemeSwitcher`

### Inputs

* `Select`, `Autocomplete`
* `DatePicker`, `DateRangePicker`, `Calendar`, `RangeCalendar`
* `ColorPicker`, `ColorSlider`
* `Slider`

### Data Display

* `Avatar`, `Badge`, `Chip`, `Tag`, `TagGroup`
* `Table`, `Listbox`
* `ProgressBar`, `ProgressCircle`
* `ColorArea`, `ColorSwatch`, `ColorSwatchPicker`
* `ValueDisplay`, `FieldError`

### Layout

* `Card`, `Flex`, `Grid`
* `Collapsible`, `ScrollShadow`, `Separator`, `Surface`

### Navigation

* `Sidebar`, `Tabs`, `Breadcrumbs`, `Pagination`

### Overlay

* `Modal`, `Drawer`, `AlertDialog`
* `Dropdown`, `Popover`, `Tooltip`

### Feedback

* `Alert`, `Accordion`, `Skeleton`
* `Empty`, `ErrorMessage`

### Media

* `ImageZoom`

## Providers

| Provider               | Description                        |
| ---------------------- | ---------------------------------- |
| `ThemeProvider`        | Manages light/dark theme           |
| `NotificationProvider` | Handles toast/notification display |
| `SidebarProvider`      | Manages sidebar state              |

## Hooks

| Hook        | Description                         |
| ----------- | ----------------------------------- |
| `useTheme`  | Access and update the current theme |
| `useMobile` | Detect mobile viewport              |
| `useCopy` 	| Handle clipboard copying with temporary feedback |

## Notification

```ts
import { notification } from "@ttpfs/ui-react";

notification.success("Saved successfully");
notification.error("An error occurred");
```

## Icon Registry

Flexible, type-safe icon usage via `registerIcons`:

```ts
declare module "@ttpfs/ui-react" {
	interface IconRegistry {
		github: IconDefinition;
		facebook: IconDefinition;
		code: IconDefinition;
	}
}

registerIcons({
	code: {
		outline: "icon-[lucide--code-xml]",
	},
	facebook: {
		color: "icon-[logos--facebook]",
	},
	github: {
		outline: "icon-[lucide--github]",
	},
});
```
