import {
	Description,
	FieldError,
	InputOTP,
	Label,
	TextField,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type InputOTPFieldProps } from "@/types";

export const InputOTPField = <T extends FieldValues>(
	props: InputOTPFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		digits = 6,
		format = "otp",
		description,
		disabled,
		readonly,
		required,
	} = props;

	const renderGroup = () => {
		switch (format) {
			case "otp":
				return (
					<>
						<InputOTP.Group>
							<InputOTP.Slot index={0} />
							<InputOTP.Slot index={1} />
							<InputOTP.Slot index={2} />
						</InputOTP.Group>
						<InputOTP.Separator />
						<InputOTP.Group>
							<InputOTP.Slot index={3} />
							<InputOTP.Slot index={4} />
							<InputOTP.Slot index={5} />
						</InputOTP.Group>
					</>
				);
			case "pin-code":
				return (
					<InputOTP.Group>
						<InputOTP.Slot index={0} />
						<InputOTP.Slot index={1} />
						<InputOTP.Slot index={2} />
						<InputOTP.Slot index={3} />
					</InputOTP.Group>
				);
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField
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
					<InputOTP
						onChange={field.onChange}
						value={field.value}
						maxLength={digits}
					>
						{renderGroup()}
					</InputOTP>
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
