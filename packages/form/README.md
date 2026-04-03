# @ttpfs/form-react

> Version: **0.2.4**

Thư viện form fields cho React, tích hợp [react-hook-form](https://react-hook-form.com) và [Zod](https://zod.dev) validation, xây dựng trên `@ttpfs/ui-react`.

## Cài đặt

```bash
pnpm add @ttpfs/form-react
```

## Peer Dependencies

| Package | Version |
|---|---|
| `react` | `^19` |
| `react-dom` | `^19` |
| `zod` | `^4` |

## Dependencies

Package này yêu cầu `@ttpfs/ui-react` được cài đặt (tự động kéo theo khi cài package này).

## Setup

Wrap form với `FormProvider` và dùng `useForm` để khởi tạo:

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
      <TextField name="name" label="Tên" />
      <FormSubmitButton>Lưu</FormSubmitButton>
    </FormProvider>
  );
}
```

## Field Components

| Component | Mô tả |
|---|---|
| `TextField` | Input văn bản |
| `NumberField` | Input số |
| `TextAreaField` | Textarea nhiều dòng |
| `CheckboxField` | Checkbox |
| `SwitchField` | Toggle switch |
| `RadioGroupField` | Nhóm radio button |
| `SelectField` | Dropdown select |
| `InfinitySelectField` | Select với infinite scroll |
| `AutocompleteField` | Input với gợi ý tự động |
| `DateField` | Input ngày |
| `DatePickerField` | Date picker |
| `DateRangePickerField` | Chọn khoảng ngày |
| `TimeField` | Input giờ |
| `ColorField` | Input màu sắc |
| `ColorPickerField` | Color picker |
| `SliderField` | Thanh trượt |
| `InputOTPField` | Input OTP |
| `FormSubmitButton` | Nút submit tích hợp loading state |

## Hooks

| Hook | Mô tả |
|---|---|
| `useForm` | Khởi tạo form với schema Zod |
| `useFieldArray` | Quản lý mảng field động |
| `useFormSubmit` | Xử lý submit logic |
| `useStore` | Truy cập form store |

## Field Registry

Package hỗ trợ đăng ký custom field thông qua `fieldRegistry`, cho phép mở rộng thêm loại field mới.

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
