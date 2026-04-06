import { type DateRangePickerFieldProps } from "@/types";
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
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<DateRangePicker
					className={className?.wrapper}
					endName="endDate"
					isDisabled={field.disabled ?? disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					minValue={minDay ? todayDate : undefined}
					onChange={field.onChange}
					startName="startDate"
					validationBehavior="aria"
					value={field.value ?? null}
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
