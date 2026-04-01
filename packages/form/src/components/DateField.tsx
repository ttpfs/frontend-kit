import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
	Description,
	DateField as Field,
	FieldError,
	Icon,
	Label,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type DateFieldProps } from "@/types";
import { formatCalendarToISO } from "@/utils";

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
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<Field	
					granularity={granularity}
					hourCycle={24}
					hideTimeZone
					shouldForceLeadingZeros
					minValue={minDay ? todayDate ? undefined}
					isInvalid={invalid}
					isDisabled={field.disabled ?? disabled}
					isReadOnly={readonly}
					isRequired={required}
					className={className?.wrapper}
					name={field.name}
					onChange={(value) => field.onChange(formatCalendarToISO(value, granularity))}
					value={field.value ? parseDate(field.value) : null}
					onBlur={field.onBlur}
					ref={field.ref}
					fullWidth
				>
					<Label className={className?.label}>{label}</Label>
					<Field.Group className={className?.group}>
						<Field.Prefix>
							<Icon name="calendar" className="text-muted" />
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
