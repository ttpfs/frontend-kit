import { type CalendarDate } from "@internationalized/date";
import { type Granularity } from "@/types";

export const formatCalendarToISO = (
	value: CalendarDate | null,
	granularity: Granularity,
): string | Date => {
	if (!value) return "";

	const format = () => {
		switch (granularity) {
			case "day":
				return `${value.year}-${String(value.month).padStart(2, "0")}-${String(value.day).padStart(2, "0")}`;
			case "hour":
				return value.toString();
			case "minute":
				return value.toString();
			case "second":
				return value.toString();
		}
	};

	return format();
};
