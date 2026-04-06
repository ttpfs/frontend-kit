import { type DateFieldProps } from "@/types";
import { formatCalendarToISO } from "@/utils";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
	Description,
	DateField as Field,
	FieldError,
	Icon,
	Label,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

export const DateField = <T extends FieldValues>(props: DateFieldProps<T>) => {
	const {
		label,
		name,
		className,
		control,
		description,
		disabled,
		granularity = "day",
		readonly,
		minDay,
		required,
	} = props;

	const todayDate = today(getLocalTimeZone());

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<Field
					className={className?.wrapper}
					fullWidth
					granularity={granularity}
					hideTimeZone
					hourCycle={24}
					isDisabled={field.disabled ?? disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					minValue={minDay ? todayDate : undefined}
					name={field.name}
					onBlur={field.onBlur}
					onChange={(value) =>
						field.onChange(formatCalendarToISO(value, granularity))
					}
					ref={field.ref}
					shouldForceLeadingZeros
					validationBehavior="aria"
					value={field.value ? parseDate(field.value) : null}
				>
					<Label className={className?.label}>{label}</Label>
					<Field.Group className={className?.group}>
						<Field.Prefix>
							<Icon className="text-muted" name="calendar" />
						</Field.Prefix>
						<Field.Input className={className?.input}>
							{(segment) => <Field.Segment segment={segment} />}
						</Field.Input>
					</Field.Group>
					{invalid ? (
						<FieldError>{error?.message}</FieldError>
					) : (
						description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)
					)}
				</Field>
			)}
		/>
	);
};
