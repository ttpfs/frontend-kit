import { zodResolver } from "@hookform/resolvers/zod";
import {
	type UseFormProps as BaseUseFormProps,
	type FieldValues,
	type Resolver,
	useForm as useRhfForm,
} from "react-hook-form";
import { type ZodType, type z } from "zod";
import {
	AutocompleteField,
	CheckboxField,
	ColorField,
	ColorPickerField,
	DateField,
	DatePickerField,
	DateRangePickerField,
	InfinitySelectField,
	InputOTPField,
	NumberField,
	RadioGroupField,
	SelectField,
	SliderField,
	SwitchField,
	TextAreaField,
	TextField,
	TimeField,
} from "@/components";
import { type UseFormReturn } from "@/types";

interface UseFormProps<TSchema extends ZodType<FieldValues, FieldValues>> {
	schema: TSchema;
	options?: Omit<BaseUseFormProps<z.infer<TSchema>>, "resolver">;
}

export const useForm = <TSchema extends ZodType<FieldValues, FieldValues>>(
	props: UseFormProps<TSchema>,
): UseFormReturn<z.infer<TSchema>> => {
	const { options, schema } = props;

	const form = useRhfForm<z.infer<TSchema>>({
		...options,
		mode: "all",
		resolver: zodResolver(schema) as Resolver<z.infer<TSchema>>,
		shouldUnregister: false,
	});

	return {
		...form,
		AutocompleteField: AutocompleteField,
		CheckboxField: CheckboxField,
		ColorField: ColorField,
		ColorPickerField: ColorPickerField,
		DateField: DateField,
		DatePickerField: DatePickerField,
		DateRangePicker: DateRangePickerField,
		InfinitySelectField: InfinitySelectField,
		InputOtpField: InputOTPField,
		NumberField: NumberField,
		RadioGroupField: RadioGroupField,
		SelectField: SelectField,
		SliderField: SliderField,
		SwitchField: SwitchField,
		TextAreaField: TextAreaField,
		TextField: TextField,
		TimeField: TimeField,
	};
};
