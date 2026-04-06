# @ttpfs/form-react

> Version: **0.3.5**

A React form field library built on top of `react-hook-form` and Zod for validation, designed to integrate seamlessly with `@ttpfs/ui-react`.

## Installation

```bash
pnpm add @ttpfs/form-react
```

## Peer Dependencies

| Package     | Version |
| ----------- | ------- |
| `react`     | `^19`   |
| `react-dom` | `^19`   |
| `zod`       | `^4`    |

## Dependencies

This package requires `@ttpfs/ui-react` (installed automatically as a dependency).

## Setup

Import the form styles after the UI library styles to ensure proper overrides:

```css
@import "@ttpfs/ui-react/styles.css";
@import "@ttpfs/form-react/styles.css";
```

Wrap your form with `FormProvider` and initialize it using `useForm`:

```tsx
import { FormProvider, useForm, TextField, FormSubmitButton } from "@ttpfs/form-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
});

export function MyForm() {
  const form = useForm({ schema });

  return (
    <FormProvider form={form} onSubmit={(data) => console.log(data)}>
      <TextField name="name" label="Name" />
      <FormSubmitButton>Save</FormSubmitButton>
    </FormProvider>
  );
}
```

## Field Components

| Component              | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `TextField`            | Text input                                        |
| `NumberField`          | Numeric input                                     |
| `TextAreaField`        | Multiline textarea                                |
| `CheckboxField`        | Checkbox input                                    |
| `SwitchField`          | Toggle switch                                     |
| `RadioGroupField`      | Radio button group                                |
| `SelectField`          | Dropdown select                                   |
| `InfinitySelectField`  | Select with infinite scrolling                    |
| `AutocompleteField`    | Input with suggestions                            |
| `DateField`            | Date input                                        |
| `DatePickerField`      | Date picker                                       |
| `DateRangePickerField` | Date range picker                                 |
| `TimeField`            | Time input                                        |
| `ColorField`           | Color input                                       |
| `ColorPickerField`     | Color picker                                      |
| `SliderField`          | Range slider                                      |
| `InputOTPField`        | OTP input                                         |
| `SlugField`            | Automatically generates a slug from another field |
| `FormSubmitButton`     | Submit button with built-in loading state         |

## Hooks

| Hook            | Description                     |
| --------------- | ------------------------------- |
| `useForm`       | Initialize form with Zod schema |
| `useFieldArray` | Manage dynamic field arrays     |
| `useFormSubmit` | Handle submit logic             |
| `useStore`      | Access form state store         |

## Field Registry

The package supports custom field registration via `fieldRegistry`, allowing you to extend with new field types:

```ts
import { fieldRegistry } from "@ttpfs/form-react";

declare module "@ttpfs/form-react" {
	interface FieldTypeMap {
		CustomField: <TValues extends FieldValues>(
			props: CustomFieldProps<TValues>
		) => JSX.Element;
	}
}

fieldRegistry.register("CustomField", CustomFieldComponent);
```
