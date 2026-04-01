import { formatValue } from "@/utils";
import { cn } from "@heroui/react";
import { isValid, type Locale } from "date-fns";
import { vi } from "date-fns/locale";

type ValueType = "date" | "percent" | "price" | "number" | "text";

type Props = {
	value: number | string | Date | undefined | null;
	type: ValueType;
	locale?: Locale;
	format?: string;
	emptyText?: string;
	className?: string;
};

export const ValueDisplay: React.FC<Props> = (props) => {
	const {
		type,
		className,
		value,
		emptyText = "--",
		format = "HH:mm dd/MM/yyyy",
		locale = vi,
	} = props;

	const renderEmptyState = () => {
		return <span className={cn(className)}>{emptyText}</span>;
	};

	if (!value) {
		return renderEmptyState();
	}

	switch (type) {
		case "date": {
			const date = new Date(value as string);
			if (!isValid(date)) return renderEmptyState();

			return (
				<span className={cn(className, "tabular-nums")}>
					{formatValue({
						locale,
						prefix: format,
						type,
						value,
					})}
				</span>
			);
		}
		case "price":
			return (
				<span>
					{new Intl.NumberFormat("vi-VN", {
						currency: "VND",
						style: "currency",
					}).format(Number(value))}
				</span>
			);
		case "percent":
			return <span>{Number(value).toFixed(2)}%</span>;

		default:
			return (
				<span className="leading-relaxed line-clamp-3">{String(value)}</span>
			);
	}
};
