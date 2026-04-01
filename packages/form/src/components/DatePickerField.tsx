import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
	Calendar,
	cn,
	DateField,
	DatePicker,
	Description,
	FieldError,
	Label,
	TimeField,
	type TimeValue,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type DatePickerFieldProps } from "@/types";
import { formatCalendarToISO } from "@/utils";

export const DatePickerField = <T extends FieldValues>(
	props: DatePickerFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		description,
		disabled,
		readonly,
		required,
		granularity = "day",
		minDay,
	} = props;

	const todayDate = today(getLocalTimeZone());
	const timeGranularity = granularity !== "day" ? granularity : undefined;
	const showTimeField = !!timeGranularity;

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<DatePicker
					key={granularity}
					minValue={minDay ? todayDate : undefined}
					className={cn("w-fit min-w-64", className?.wrapper)}
					granularity={granularity}
					hideTimeZone
					hourCycle={24}
					name={field.name}
					shouldForceLeadingZeros
					onChange={(value) =>
						field.onChange(formatCalendarToISO(value, granularity))
					}
					value={field.value ? parseDate(field.value) : null}
					isDisabled={disabled}
					isInvalid={invalid}
					isRequired={required}
					isReadOnly={readonly}
				>
					{({ state }) => (
						<>
							<Label className={className?.label}>{label}</Label>
							<DateField.Group className={className?.group} fullWidth>
								<DateField.Input className={className?.input}>
									{(segment) => <DateField.Segment segment={segment} />}
								</DateField.Input>
								<DateField.Suffix>
									<DatePicker.Trigger>
										<DatePicker.TriggerIndicator />
									</DatePicker.Trigger>
								</DateField.Suffix>
							</DateField.Group>
							{invalid ? (
								<FieldError>{error?.message}</FieldError>
							) : (
								description && (
									<Description className={className?.description}>
										{description}
									</Description>
								)
							)}
							<DatePicker.Popover className="flex flex-col gap-3">
								<Calendar aria-label="Event date">
									<Calendar.Header>
										<Calendar.YearPickerTrigger>
											<Calendar.YearPickerTriggerHeading />
											<Calendar.YearPickerTriggerIndicator />
										</Calendar.YearPickerTrigger>
										<Calendar.NavButton slot="previous" />
										<Calendar.NavButton slot="next" />
									</Calendar.Header>
									<Calendar.Grid>
										<Calendar.GridHeader>
											{(day) => (
												<Calendar.HeaderCell>{day}</Calendar.HeaderCell>
											)}
										</Calendar.GridHeader>
										<Calendar.GridBody>
											{(date) => <Calendar.Cell date={date} />}
										</Calendar.GridBody>
									</Calendar.Grid>
									<Calendar.YearPickerGrid>
										<Calendar.YearPickerGridBody>
											{({ year }) => <Calendar.YearPickerCell year={year} />}
										</Calendar.YearPickerGridBody>
									</Calendar.YearPickerGrid>
								</Calendar>
								{!!showTimeField && (
									<div className="flex items-center justify-between">
										<Label>Time</Label>
										<TimeField
											aria-label="Time"
											granularity={timeGranularity}
											hideTimeZone
											hourCycle={24}
											name="time"
											shouldForceLeadingZeros
											value={state.timeValue}
											onChange={(v) => state.setTimeValue(v as TimeValue)}
										>
											<TimeField.Group variant="secondary">
												<TimeField.Input>
													{(segment) => <TimeField.Segment segment={segment} />}
												</TimeField.Input>
											</TimeField.Group>
										</TimeField>
									</div>
								)}
							</DatePicker.Popover>
						</>
					)}
				</DatePicker>
			)}
		/>
	);
};
