import { type JSX } from "react";
import {
	type UseFormReturn as BaseUseFormReturn,
	type FieldErrors,
	type FieldValues,
	type Path,
} from "react-hook-form";
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
	type SwitchFieldProps,
	type TextAreaFieldProps,
	type TextFieldProps,
	type TimeFieldProps,
} from "./fields";

export interface UseFormReturn<TValues extends FieldValues>
	extends BaseUseFormReturn<TValues> {
	TextField: <TName extends Path<TValues>>(
		props: TextFieldProps<TValues, TName>,
	) => JSX.Element;
	TextAreaField: <TName extends Path<TValues>>(
		props: TextAreaFieldProps<TValues, TName>,
	) => JSX.Element;
	NumberField: <TName extends Path<TValues>>(
		props: NumberFieldProps<TValues, TName>,
	) => JSX.Element;
	TimeField: <TName extends Path<TValues>>(
		props: TimeFieldProps<TValues, TName>,
	) => JSX.Element;
	SelectField: <TName extends Path<TValues>>(
		props: SelectFieldProps<TValues, TName>,
	) => JSX.Element;
	AutocompleteField: <TName extends Path<TValues>>(
		props: AutocompleteFieldProps<TValues, TName>,
	) => JSX.Element;
	CheckboxField: <TName extends Path<TValues>>(
		props: CheckboxFieldProps<TValues, TName>,
	) => JSX.Element;
	SwitchField: <TName extends Path<TValues>>(
		props: SwitchFieldProps<TValues, TName>,
	) => JSX.Element;
	RadioGroupField: <TName extends Path<TValues>>(
		props: RadioGroupFieldProps<TValues, TName>,
	) => JSX.Element;
	DateField: <TName extends Path<TValues>>(
		props: DateFieldProps<TValues, TName>,
	) => JSX.Element;
	DatePickerField: <TName extends Path<TValues>>(
		props: DatePickerFieldProps<TValues, TName>,
	) => JSX.Element;
	ColorField: <TName extends Path<TValues>>(
		props: ColorFieldProps<TValues, TName>,
	) => JSX.Element;
	ColorPickerField: <TName extends Path<TValues>>(
		props: ColorPickerFieldProps<TValues, TName>,
	) => JSX.Element;
	InputOtpField: <TName extends Path<TValues>>(
		props: InputOTPFieldProps<TValues, TName>,
	) => JSX.Element;
	InfinitySelectField: <TName extends Path<TValues>>(
		props: InfinitySelectFieldProps<TValues, TName>,
	) => JSX.Element;
	SliderField: <TName extends Path<TValues>>(
		props: SliderFieldProps<TValues, TName>,
	) => JSX.Element;
	DateRangePicker: <TName extends Path<TValues>>(
		props: DateRangePickerFieldProps<TValues, TName>,
	) => JSX.Element;
}

export interface UseFormSubmitOptions<
	TValues extends FieldValues,
	// biome-ignore lint/suspicious/noExplicitAny: <>
	TSuccess extends Record<string, any> = TValues,
	TError extends Error = Error,
> {
	onValid: (values: TValues) => Promise<void> | void;
	onInvalid?: (
		errors: FieldErrors<TValues>,
		event?: React.BaseSyntheticEvent,
	) => Promise<void> | void;

	onSuccess?: (data: TSuccess) => void;
	onError?: (error: TError) => void;
}
