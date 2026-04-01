import {
	ColorField as BaseColorField,
	ColorSwatch,
	Description,
	FieldError,
	Label,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type ColorFieldProps } from "@/types";

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
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<BaseColorField
					fullWidth
					isDisabled={field.disabled ?? disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					className={className?.wrapper}
					onChange={field.onChange}
					onBlur={field.onBlur}
					name={field.name}
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
