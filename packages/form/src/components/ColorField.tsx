import { type ColorFieldProps } from "@/types";
import {
	ColorField as BaseColorField,
	ColorSwatch,
	Description,
	FieldError,
	Label,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

export const ColorField = <T extends FieldValues>(
	props: ColorFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		description,
		disabled,
		placeholder = "#000000",
		readonly,
		required,
	} = props;
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<BaseColorField
					className={className?.wrapper}
					fullWidth
					isDisabled={disabled ?? field.disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					name={field.name}
					onBlur={field.onBlur}
					onChange={field.onChange}
					validationBehavior="aria"
					value={field.value}
				>
					<Label className={className?.label}>{label}</Label>
					<BaseColorField.Group className={className?.group}>
						<BaseColorField.Prefix>
							<ColorSwatch color={field.value ?? undefined} size="xs" />
						</BaseColorField.Prefix>
						<BaseColorField.Input
							className={className?.input}
							placeholder={placeholder}
						/>
					</BaseColorField.Group>
					{invalid ? (
						<FieldError>{error?.message}</FieldError>
					) : (
						description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)
					)}
				</BaseColorField>
			)}
		/>
	);
};
