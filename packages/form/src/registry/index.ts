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
import { fieldRegistry } from "./fieldRegistry";

export { fieldRegistry } from "./fieldRegistry";

// Register default fields for at most case
fieldRegistry.registerMany({
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
});
