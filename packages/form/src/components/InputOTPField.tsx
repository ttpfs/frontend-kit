import { type InputOTPFieldProps } from "@/types";
import {
	Description,
	FieldError,
	InputOTP,
	Label,
	TextField,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

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
					ref={field.ref}
					validationBehavior="aria"
				>
					<Label className={className?.label}>{label}</Label>
					<InputOTP
						maxLength={digits}
						onChange={field.onChange}
						value={field.value}
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
