import { format, type Locale } from "date-fns";

type Props = {
	value: number | string | Date;
	type: "price" | "percent" | "date";
	locale?: Locale;
	prefix?: string;
};

export function formatValue(props: Props): string | null {
	const { type, value, locale, prefix } = props;

	if (!value) return null;

	switch (type) {
		case "price":
			return new Intl.NumberFormat("vi-VN", {
				currency: "VND",
				maximumFractionDigits: 0,
				style: "currency",
			}).format(Number(value));

		case "percent":
			return `${(Number(value) * 100).toFixed(0)}%`;

		case "date":
			return format(value, prefix ?? "HH:mm dd/MM/yyyy", {
				locale,
			});

		default:
			return null;
	}
}
