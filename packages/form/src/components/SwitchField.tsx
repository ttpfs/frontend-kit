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
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField isInvalid={invalid} name={field.name}>
					<Switch
						aria-label={label ?? name}
						isDisabled={field.disabled ?? disabled}
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
