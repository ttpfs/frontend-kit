import { type TextAreaFieldProps } from "@/types";
import {
	cn,
	Description,
	FieldError,
	Label,
	TextArea,
	TextField,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

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
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField
					aria-label={label ?? name}
					className={className?.wrapper}
					fullWidth
					isDisabled={field.disabled ?? disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					name={field.name}
					onBlur={field.onBlur}
					onChange={field.onChange}
					ref={field.ref}
				>
					<Label className={className?.label}>{label}</Label>
					<TextArea
						className={cn(className?.input, "text-sm placeholder:text-sm")}
						maxLength={maxLength}
						placeholder={placeholder}
						rows={rows}
						value={field.value}
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
