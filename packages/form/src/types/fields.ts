import { type TimeValue } from "@ttpfs/ui-react";
import { type Control, type FieldValues, type Path } from "react-hook-form";
import { type Granularity, type InputType } from "./core";

export interface OptionItem {
	id: string;
	label: string;
	meta?: {
		description?: string;
		thumbnailUrl?: string;
	};
}

export type SectionOptionItem = {
	label: string;
	options: OptionItem[];
};

export interface FormFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues>,
> {
	name: TName;
	label: string;
	required?: boolean;
	readonly?: boolean;
	disabled?: boolean;
	description?: string;
	placeholder?: string;
	className?: {
		label?: string;
		description?: string;
	};
	control?: Control<TValues>;
}

export interface TextFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends FormFieldProps<TValues, TName> {
	className?: FormFieldProps<TValues, TName>["className"] & {
		input?: string;
		wrapper?: string;
		group?: string;
	};
	type?: InputType; // default 'text'
}

export interface TextAreaFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends FormFieldProps<TValues, TName> {
	className?: FormFieldProps<TValues, TName>["className"] & {
		input?: string;
		wrapper?: string;
	};
	rows?: number; // default 6
	maxLength?: number; // default 512
}

export interface NumberFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<FormFieldProps<TValues, TName>, "placeholder"> {
	className?: FormFieldProps<TValues, TName>["className"] & {
		input?: string;
		wrapper?: string;
		group?: string;
		increment?: string;
		decrement?: string;
	};
	minValue?: number; // default 0
	maxValue?: number; // default undefine
	step?: number; // Increments by Step, default 1
	format?: Intl.NumberFormatOptions; // default unit
}

export interface TimeFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<FormFieldProps<TValues, TName>, "placeholder"> {
	className?: FormFieldProps<TValues, TName>["className"] & {
		input?: string;
		wrapper?: string;
		group?: string;
	};
	maxValue?: TimeValue;
	minValue?: TimeValue;
}

type BaseSelectFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> = Omit<FormFieldProps<TValues, TName>, "readonly"> & {
	mode?: "multiple" | "single";
};

type SelectFieldSingleOptions<
	TValues extends FieldValues,
	TName extends Path<TValues>,
> = BaseSelectFieldProps<TValues, TName> & {
	variant?: "default"; // default 'default'
	options: OptionItem[];
};

type SelectFieldSectionOptions<
	TValues extends FieldValues,
	TName extends Path<TValues>,
> = BaseSelectFieldProps<TValues, TName> & {
	variant: "section";
	options: SectionOptionItem[];
};

export type SelectFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> =
	| SelectFieldSingleOptions<TValues, TName>
	| SelectFieldSectionOptions<TValues, TName>;

export type InfinitySelectFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> =
	| (SelectFieldSingleOptions<TValues, TName> & {
			isFetching?: boolean;
			onLoadMore?: () => void;
			loadMoreLabel?: string;
	  })
	| (SelectFieldSectionOptions<TValues, TName> & {
			isFetching?: boolean;
			onLoadMore?: () => void;
			loadMoreLabel?: string;
	  });

export type AutocompleteFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> = BaseSelectFieldProps<TValues, TName> & {
	options: OptionItem[];
	onSearch?: (keyword: string | undefined) => Promise<void> | void;
	isFetching?: boolean;
};

export interface InputOTPFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<FormFieldProps<TValues, TName>, "placeholder"> {
	className?: FormFieldProps<TValues, TName>["className"] & {
		input?: string;
		wrapper?: string;
	};
	digits?: 6 | 4; // default 6
	format?: "otp" | "pin-code"; // default 'otp'
}

export interface DateFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<FormFieldProps<TValues, TName>, "placeholder"> {
	className?: FormFieldProps<TValues, TName>["className"] & {
		input?: string;
		wrapper?: string;
		group?: string;
	};
	minDay?: boolean;
	granularity?: Granularity; // default 'second'
}

export interface DatePickerFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<FormFieldProps<TValues, TName>, "placeholder"> {
	className?: FormFieldProps<TValues, TName>["className"] & {
		input?: string;
		wrapper?: string;
		group?: string;
	};
	minDay?: boolean;
	granularity?: Granularity; // default 'second'
}

export interface DateRangePickerFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<FormFieldProps<TValues, TName>, "placeholder"> {
	className?: FormFieldProps<TValues, TName>["className"] & {
		input?: string;
		wrapper?: string;
		group?: string;
	};
	minDay?: boolean;
}

export interface ColorFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends FormFieldProps<TValues, TName> {
	className?: FormFieldProps<TValues, TName>["className"] & {
		input?: string;
		wrapper?: string;
		group?: string;
	};
}

export interface ColorPickerFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<FormFieldProps<TValues, TName>, "readonly"> {}

export interface CheckboxFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<FormFieldProps<TValues, TName>, "label" | "placeholder"> {
	label?: string;
}

export interface SwitchFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<
		FormFieldProps<TValues, TName>,
		"label" | "placeholder" | "required"
	> {
	label?: string;
}
export interface RadioGroupFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<FormFieldProps<TValues, TName>, "placeholder"> {
	options: OptionItem[];
	orientation?: "vertical" | "horizontal";
}

export interface SliderFieldProps<
	TValues extends FieldValues,
	TName extends Path<TValues> = Path<TValues>,
> extends Omit<
		FormFieldProps<TValues, TName>,
		"placeholder" | "readonly" | "className"
	> {
	orientation?: "vertical" | "horizontal";
	mode?: "range" | "default";
	maxValue?: number; // default 100
	minValue?: number; // default 0
	format?: Intl.NumberFormatOptions;
	step?: number; // default 1
	className?: {
		description?: string;
		wrapper?: string;
	};
}
