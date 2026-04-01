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
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<DatePicker
					className={cn("w-fit min-w-64", className?.wrapper)}
					granularity={granularity}
					hideTimeZone
					hourCycle={24}
					isDisabled={disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					key={granularity}
					minValue={minDay ? todayDate : undefined}
					name={field.name}
					onChange={(value) =>
						field.onChange(formatCalendarToISO(value, granularity))
					}
					shouldForceLeadingZeros
					value={field.value ? parseDate(field.value) : null}
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
											onChange={(v) => state.setTimeValue(v as TimeValue)}
											shouldForceLeadingZeros
											value={state.timeValue}
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
