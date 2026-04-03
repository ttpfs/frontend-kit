import {
	TimeField as BaseTimeField,
	Description,
	FieldError,
	Label,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type TimeFieldProps } from "@/types";

export const TimeField = <T extends FieldValues>(props: TimeFieldProps<T>) => {
	const {
		label,
		name,
		className,
		control,
		description,
		disabled,
		maxValue,
		minValue,
		readonly,
		required,
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<BaseTimeField
					aria-label={label ?? name}
					className={className?.wrapper}
					fullWidth
					isDisabled={field.disabled ?? disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					maxValue={maxValue}
					minValue={minValue}
					name={field.name}
					onBlur={field.onBlur}
					onChange={field.onChange}
					ref={field.ref}
					value={field.value ?? null}
				>
					<Label className={className?.label}>{label}</Label>
					<BaseTimeField.Group className={className?.group}>
						<BaseTimeField.Input className={className?.input}>
							{(segment) => <BaseTimeField.Segment segment={segment} />}
						</BaseTimeField.Input>
					</BaseTimeField.Group>
					{error ? (
						<FieldError>{error?.message}</FieldError>
					) : (
						description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)
					)}
				</BaseTimeField>
			)}
		/>
	);
};
