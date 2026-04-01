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
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<BaseNumberField
					fullWidth
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					formatOptions={format}
					maxValue={maxValue}
					minValue={minValue}
					name={field.name}
					ref={field.ref}
					onBlur={field.onBlur}
					isDisabled={field.disabled ?? disabled}
					step={step}
					value={field.value ?? 0}
					onChange={field.onChange}
					className={className?.wrapper}
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
