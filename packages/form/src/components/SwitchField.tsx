import { type SwitchFieldProps } from "@/types";
import {
	cn,
	Description,
	FieldError,
	Label,
	Switch,
	TextField,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

export const SwitchField = <T extends FieldValues>(
	props: SwitchFieldProps<T>,
) => {
	const { label, name, className, control, description, disabled, readonly } =
		props;
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField isInvalid={invalid} name={field.name}>
					<Switch
						aria-label={label ?? name}
						isDisabled={disabled ?? field.disabled}
						isReadOnly={readonly}
						isSelected={field.value ?? false}
						onBlur={field.onBlur}
						onChange={field.onChange}
					>
						{label && <Label className={className?.label}>{label}</Label>}
						{invalid ? (
							<FieldError>{error?.message}</FieldError>
						) : (
							description && (
								<Description className={cn(className?.description, "px-0")}>
									{description}
								</Description>
							)
						)}
					</Switch>
				</TextField>
			)}
		/>
	);
};
