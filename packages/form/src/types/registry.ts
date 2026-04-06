import { type JSX } from "react";
import { type FieldValues } from "react-hook-form";
import {
	type AutocompleteFieldProps,
	type CheckboxFieldProps,
	type ColorFieldProps,
	type ColorPickerFieldProps,
	type DateFieldProps,
	type DatePickerFieldProps,
	type DateRangePickerFieldProps,
	type InfinitySelectFieldProps,
	type InputOTPFieldProps,
	type NumberFieldProps,
	type RadioGroupFieldProps,
	type SelectFieldProps,
	type SliderFieldProps,
	type SlugFieldProps,
	type SwitchFieldProps,
	type TextAreaFieldProps,
	type TextFieldProps,
	type TimeFieldProps,
} from "./fields";

interface FieldTypeMap {
	TextField: <TValues extends FieldValues>(
		props: TextFieldProps<TValues>,
	) => JSX.Element;
	TextAreaField: <TValues extends FieldValues>(
		props: TextAreaFieldProps<TValues>,
	) => JSX.Element;
	NumberField: <TValues extends FieldValues>(
		props: NumberFieldProps<TValues>,
	) => JSX.Element;
	TimeField: <TValues extends FieldValues>(
		props: TimeFieldProps<TValues>,
	) => JSX.Element;
	SelectField: <TValues extends FieldValues>(
		props: SelectFieldProps<TValues>,
	) => JSX.Element;
	AutocompleteField: <TValues extends FieldValues>(
		props: AutocompleteFieldProps<TValues>,
	) => JSX.Element;
	CheckboxField: <TValues extends FieldValues>(
		props: CheckboxFieldProps<TValues>,
	) => JSX.Element;
	SwitchField: <TValues extends FieldValues>(
		props: SwitchFieldProps<TValues>,
	) => JSX.Element;
	RadioGroupField: <TValues extends FieldValues>(
		props: RadioGroupFieldProps<TValues>,
	) => JSX.Element;
	DateField: <TValues extends FieldValues>(
		props: DateFieldProps<TValues>,
	) => JSX.Element;
	DatePickerField: <TValues extends FieldValues>(
		props: DatePickerFieldProps<TValues>,
	) => JSX.Element;
	ColorField: <TValues extends FieldValues>(
		props: ColorFieldProps<TValues>,
	) => JSX.Element;
	ColorPickerField: <TValues extends FieldValues>(
		props: ColorPickerFieldProps<TValues>,
	) => JSX.Element;
	InputOtpField: <TValues extends FieldValues>(
		props: InputOTPFieldProps<TValues>,
	) => JSX.Element;
	InfinitySelectField: <TValues extends FieldValues>(
		props: InfinitySelectFieldProps<TValues>,
	) => JSX.Element;
	SliderField: <TValues extends FieldValues>(
		props: SliderFieldProps<TValues>,
	) => JSX.Element;
	DateRangePicker: <TValues extends FieldValues>(
		props: DateRangePickerFieldProps<TValues>,
	) => JSX.Element;
	SlugField: <TValues extends FieldValues>(
		props: SlugFieldProps<TValues>,
	) => JSX.Element;
}

type FieldKey = keyof FieldTypeMap;

type FieldComponent<K extends FieldKey = FieldKey> = FieldTypeMap[K];

type FieldRegistry = Record<FieldKey, FieldComponent>;

type BoundFields = {
	[K in FieldKey]: FieldTypeMap[K];
};

export type {
	BoundFields,
	FieldComponent,
	FieldKey,
	FieldRegistry,
	FieldTypeMap,
};
