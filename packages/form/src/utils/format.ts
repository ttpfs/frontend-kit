import { type Granularity } from "@/types";
import { type CalendarDate } from "@internationalized/date";
import slugifyFormat from "slugify";
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

export interface SlugifyOptions {
	replacement?: string;
	remove?: RegExp;
	lower?: boolean;
	strict?: boolean;
	locale?: string;
	trim?: boolean;
}

export function toSlug(value: string, options?: SlugifyOptions): string {
	const DEFAULT_OPTIONS = {
		locale: "vi",
		lower: true,
		replacement: "-",
		strict: true,
		trim: true,
	} satisfies SlugifyOptions;

	const opts = options ? { ...DEFAULT_OPTIONS, ...options } : DEFAULT_OPTIONS;

	if (!value) return "";

	const slug = slugifyFormat(value, opts);

	return slug;
}
