import { type CheckboxFieldProps } from "@/types";
import {
	Checkbox,
	cn,
	Description,
	FieldError,
	Icon,
	Label,
	TextField,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

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
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField isInvalid={invalid} name={field.name}>
					<Checkbox
						aria-label={label ?? name}
						isDisabled={field.disabled ?? disabled}
						isReadOnly={readonly}
						isSelected={field.value ?? false}
						onBlur={field.onBlur}
						onChange={field.onChange}
					>
						{label && (
							<Label className={className?.label}>
								{label}
								{required && (
									<Icon className="text-danger ml-1.5" name="asterisk" />
								)}
							</Label>
						)}
						{invalid ? (
							<FieldError>{error?.message}</FieldError>
						) : (
							description && (
								<Description className={cn(className?.description, "px-0")}>
									{description}
								</Description>
							)
						)}
					</Checkbox>
				</TextField>
			)}
		/>
	);
};
