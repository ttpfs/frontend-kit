import {
	Checkbox,
	Description,
	FieldError,
	Icon,
	Label,
	TextField,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type CheckboxFieldProps } from "@/types";

export const CheckboxField = <T extends FieldValues>(
	props: CheckboxFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		description,
		disabled,
		readonly,
		required,
	} = props;

	return (
		<Controller
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField name={field.name} isInvalid={invalid}>
					<Checkbox
						isDisabled={field.disabled ?? disabled}
						isReadOnly={readonly}
						isSelected={field.value ?? false}
						onChange={field.onChange}
						onBlur={field.onBlur}
						aria-label={label ?? name}
					>
						{label && (
							<Label className={className?.label}>
								{label}
								{required && (
									<Icon name="asterisk" className="text-danger ml-1.5" />
								)}
							</Label>
						)}
						{invalid ? (
							<FieldError>{error?.message}</FieldError>
						) : (
							description && (
								<Description className={className?.description}>
									{description}
								</Description>
							)
						)}
					</Checkbox>
				</TextField>
			)}
			control={control}
		/>
	);
};
