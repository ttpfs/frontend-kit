import {
	Description,
	FieldError,
	Label,
	Switch,
	TextField,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type SwitchFieldProps } from "@/types";

export const SwitchField = <T extends FieldValues>(
	props: SwitchFieldProps<T>,
) => {
	const { label, name, className, control, description, disabled, readonly } =
		props;
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField name={field.name} isInvalid={invalid}>
					<Switch
						isDisabled={field.disabled ?? disabled}
						isReadOnly={readonly}
						isSelected={field.value ?? false}
						onChange={field.onChange}
						onBlur={field.onBlur}
						aria-label={label ?? name}
					>
						{label && <Label className={className?.label}>{label}</Label>}
						{invalid ? (
							<FieldError>{error?.message}</FieldError>
						) : (
							description && (
								<Description className={className?.description}>
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
