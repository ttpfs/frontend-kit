import { type CheckboxFieldProps } from "@/types";
import { Checkbox, cn, Description, Icon, Label } from "@ttpfs/ui-react";
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
			render={({ field, fieldState: { invalid } }) => (
				<Checkbox
					aria-label={label ?? name}
					isDisabled={disabled ?? field.disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isSelected={field.value ?? false}
					name={field.name}
					onBlur={field.onBlur}
					onChange={field.onChange}
				>
					<Checkbox.Control>
						<Checkbox.Indicator />
					</Checkbox.Control>
					<Checkbox.Content>
						{label && (
							<Label className={className?.label} htmlFor={field.name}>
								{label}
								{required && (
									<Icon className="text-danger ml-1.5" name="asterisk" />
								)}
							</Label>
						)}
						{description && (
							<Description className={cn(className?.description, "px-0")}>
								{description}
							</Description>
						)}
					</Checkbox.Content>
				</Checkbox>
			)}
		/>
	);
};
