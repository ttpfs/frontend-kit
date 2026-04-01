import {
	cn,
	Description,
	FieldError,
	Slider,
	TextField,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type SliderFieldProps } from "@/types";

export const SliderField = <T extends FieldValues>(
	props: SliderFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		mode = "default",
		description,
		disabled,
		orientation = "horizontal",
		required,
		maxValue = 100,
		format,
		minValue = 0,
		step,
	} = props;
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField
					isInvalid={invalid}
					isRequired={required}
					fullWidth
					aria-label={label ?? name}
				>
					<Slider
						className={cn(className?.wrapper, "w-full max-w-xs")}
						step={step}
						value={field.value ?? 0}
						onChange={field.onChange}
						formatOptions={format}
						maxValue={maxValue}
						minValue={minValue}
						orientation={orientation}
						mode={mode}
						isDisabled={field.disabled ?? disabled}
						label={label}
					/>
					{invalid ? (
						<FieldError>{error?.message}</FieldError>
					) : (
						description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)
					)}
				</TextField>
			)}
		/>
	);
};
