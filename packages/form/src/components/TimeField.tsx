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
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<BaseTimeField
					fullWidth
					isRequired={required}
					className={className?.wrapper}
					name={field.name}
					value={field.value ?? null}
					ref={field.ref}
					onChange={field.onChange}
					onBlur={field.onBlur}
					isDisabled={field.disabled ?? disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					maxValue={maxValue}
					minValue={minValue}
					aria-label={label ?? name}
				>
					<Label className={className?.label}>{label}</Label>
					<BaseTimeField.Group className={className?.group}>
						<BaseTimeField.Input className={className?.input}>
							{(segment) => <BaseTimeField.Segment segment={segment} />}
						</BaseTimeField.Input>
					</BaseTimeField.Group>
					{invalid ? (
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
