import { getLocalTimeZone, today } from "@internationalized/date";
import {
	DateField,
	DateRangePicker,
	Description,
	FieldError,
	Label,
	RangeCalendar,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type DateRangePickerFieldProps } from "@/types";

export const DateRangePickerField = <T extends FieldValues>(
	props: DateRangePickerFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		description,
		disabled,
		minDay,
		readonly,
		required,
	} = props;

	const todayDate = today(getLocalTimeZone());

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<DateRangePicker
					isRequired={required}
					className={className?.wrapper}
					endName="endDate"
					isInvalid={invalid}
					minValue={minDay ? todayDate : undefined}
					startName="startDate"
					onChange={field.onChange}
					value={field.value ?? null}
					isDisabled={field.disabled ?? disabled}
					isReadOnly={readonly}
				>
					<Label className={className?.label}>{label}</Label>
					<DateField.Group fullWidth>
						<DateField.Input slot="start">
							{(segment) => <DateField.Segment segment={segment} />}
						</DateField.Input>
						<DateRangePicker.RangeSeparator />
						<DateField.Input slot="end">
							{(segment) => <DateField.Segment segment={segment} />}
						</DateField.Input>
						<DateField.Suffix>
							<DateRangePicker.Trigger>
								<DateRangePicker.TriggerIndicator />
							</DateRangePicker.Trigger>
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
					<DateRangePicker.Popover>
						<RangeCalendar aria-label="Booking period">
							<RangeCalendar.Header>
								<RangeCalendar.YearPickerTrigger>
									<RangeCalendar.YearPickerTriggerHeading />
									<RangeCalendar.YearPickerTriggerIndicator />
								</RangeCalendar.YearPickerTrigger>
								<RangeCalendar.NavButton slot="previous" />
								<RangeCalendar.NavButton slot="next" />
							</RangeCalendar.Header>
							<RangeCalendar.Grid>
								<RangeCalendar.GridHeader>
									{(day) => (
										<RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>
									)}
								</RangeCalendar.GridHeader>
								<RangeCalendar.GridBody>
									{(date) => <RangeCalendar.Cell date={date} />}
								</RangeCalendar.GridBody>
							</RangeCalendar.Grid>
							<RangeCalendar.YearPickerGrid>
								<RangeCalendar.YearPickerGridBody>
									{({ year }) => <RangeCalendar.YearPickerCell year={year} />}
								</RangeCalendar.YearPickerGridBody>
							</RangeCalendar.YearPickerGrid>
						</RangeCalendar>
					</DateRangePicker.Popover>
				</DateRangePicker>
			)}
		/>
	);
};
