# @ttpfs/ui-react

> Version: **1.1.9**

Thư viện UI component cho React, xây dựng trên nền [HeroUI](https://heroui.com) và Tailwind CSS v4.

## Cài đặt

```bash
pnpm add @ttpfs/ui-react
```

## Peer Dependencies

Các package sau cần được cài đặt trong project của bạn:

| Package | Version |
|---|---|
| `react` | `^19` |
| `react-dom` | `^19` |
| `tailwindcss` | `^4` |
| `@tailwindcss/postcss` | `^4` |
| `@iconify/tailwind4` | `^1.2.1` |
| `@iconify-json/lucide` | `^1.2.86` |
| `@iconify-json/solar` | `^1.2.5` |
| `@iconify-json/fluent-color` | `^1.2.21` |
| `@iconify-json/logos` | `^1.2.10` |
| `@iconify-json/svg-spinners` | `^1.2.4` |

## Setup

Import global CSS vào entry point của app:

```ts
import "@ttpfs/ui-react/global.css";
```

Wrap app với `ThemeProvider`:

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
- `Button`, `CloseButton`, `ToggleButton`, `ToggleButtonGroup`, `Toolbar`
- `Checkbox`, `CheckboxGroup`, `Radio`, `RadioGroup`
- `Input`, `InputGroup`, `InputOTP`, `TextArea`
- `Switch`, `SwitchGroup`
- `Label`, `Description`, `Header`
- `Spinner`, `Kbd`, `Snippet`

### Composite Fields
- `TextField`, `NumberField`, `ColorField`, `SearchField`
- `DateField`, `TimeField`

### Inputs
- `Select`, `Autocomplete`
- `DatePicker`, `DateRangePicker`, `Calendar`, `RangeCalendar`
- `ColorPicker`, `ColorSlider`
- `Slider`

### Data Display
- `Avatar`, `Badge`, `Chip`, `Tag`, `TagGroup`
- `Table`, `Listbox`
- `ProgressBar`, `ProgressCircle`
- `ColorArea`, `ColorSwatch`, `ColorSwatchPicker`
- `ValueDisplay`, `FieldError`

### Layout
- `Card`, `Flex`, `Grid`
- `Collapsible`, `ScrollShadow`, `Separator`, `Surface`

### Navigation
- `Sidebar`, `Tabs`, `Breadcrumbs`, `Pagination`

### Overlay
- `Modal`, `Drawer`, `AlertDialog`
- `Dropdown`, `Popover`, `Tooltip`

### Feedback
- `Alert`, `Accordion`, `Skeleton`
- `Empty`, `ErrorMessage`

### Media
- `ImageZoom`

## Providers

| Provider | Mô tả |
|---|---|
| `ThemeProvider` | Quản lý dark/light theme |
| `NotificationProvider` | Hiển thị toast/notification |
| `SidebarProvider` | Quản lý trạng thái sidebar |

## Hooks

| Hook | Mô tả |
|---|---|
| `useTheme` | Đọc và thay đổi theme hiện tại |
| `useMobile` | Detect màn hình mobile |

## Notification

```ts
import { notification } from "@ttpfs/ui-react";

notification.success("Lưu thành công");
notification.error("Có lỗi xảy ra");
```
