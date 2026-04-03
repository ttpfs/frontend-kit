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
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField
					aria-label={label ?? name}
					fullWidth
					isInvalid={invalid}
					isRequired={required}
				>
					<Slider
						className={cn(className?.wrapper, "w-full max-w-xs")}
						formatOptions={format}
						isDisabled={field.disabled ?? disabled}
						label={label}
						maxValue={maxValue}
						minValue={minValue}
						mode={mode}
						onChange={field.onChange}
						orientation={orientation}
						step={step}
						value={field.value ?? 0}
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
