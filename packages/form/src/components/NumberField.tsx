import {
	NumberField as BaseNumberField,
	Description,
	FieldError,
	Label,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type NumberFieldProps } from "@/types";

export const NumberField = <T extends FieldValues>(
	props: NumberFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		description,
		format = {
			style: "unit",
		},
		maxValue,
		minValue,
		readonly,
		disabled,
		required,
		step,
	} = props;
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<BaseNumberField
					className={className?.wrapper}
					formatOptions={format}
					fullWidth
					isDisabled={field.disabled ?? disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					maxValue={maxValue}
					minValue={minValue}
					name={field.name}
					onBlur={field.onBlur}
					onChange={field.onChange}
					ref={field.ref}
					step={step}
					value={field.value ?? 0}
				>
					<Label className={className?.label}>{label}</Label>
					<BaseNumberField.Group className={className?.group}>
						<BaseNumberField.DecrementButton className={className?.decrement} />
						<BaseNumberField.Input className={className?.input} />
						<BaseNumberField.IncrementButton className={className?.increment} />
					</BaseNumberField.Group>
					{invalid ? (
						<FieldError>{error?.message}</FieldError>
					) : (
						description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)
					)}
				</BaseNumberField>
			)}
		/>
	);
};
