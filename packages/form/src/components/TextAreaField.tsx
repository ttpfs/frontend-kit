import {
	Description,
	FieldError,
	Label,
	TextArea,
	TextField,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type TextAreaFieldProps } from "@/types";

export const TextAreaField = <T extends FieldValues>(
	props: TextAreaFieldProps<T>,
) => {
	const {
		label,
		disabled,
		name,
		maxLength,
		className,
		description,
		placeholder = "Enter your input...",
		required = false,
		rows,
		readonly = false,
		control,
	} = props;
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField
					onChange={field.onChange}
					onBlur={field.onBlur}
					ref={field.ref}
					isInvalid={invalid}
					isRequired={required}
					isReadOnly={readonly}
					fullWidth
					name={field.name}
					isDisabled={field.disabled ?? disabled}
					className={className?.wrapper}
					aria-label={label ?? name}
				>
					<Label className={className?.label}>{label}</Label>
					<TextArea
						className={className?.input}
						maxLength={maxLength}
						placeholder={placeholder}
						value={field.value}
						rows={rows}
					/>
					{invalid ? (
						<FieldError>{error?.message}</FieldError>
					) : (
						description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)
					)}
				</TextField>
			)}
		/>
	);
};
