import { cn } from "@heroui/react";
import type React from "react";

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
	direction?: "row" | "col";
	align?: "start" | "center" | "end" | "stretch";
	justify?: "start" | "center" | "end" | "between";
	gap?: 0 | 1 | 2 | 3 | 4 | 6 | 8;
};

const map = {
	align: {
		center: "items-center",
		end: "items-end",
		start: "items-start",
		stretch: "items-stretch",
	},
	direction: {
		col: "flex-col",
		row: "flex-row",
	},
	gap: {
		0: "gap-0",
		1: "gap-1",
		2: "gap-2",
		3: "gap-3",
		4: "gap-4",
		6: "gap-6",
		8: "gap-8",
	},
	justify: {
		between: "justify-between",
		center: "justify-center",
		end: "justify-end",
		start: "justify-start",
	},
};

export const Flex: React.FC<FlexProps> = (props: FlexProps) => {
	const {
		direction = "row",
		align = "center",
		justify = "between",
		gap = 2,
		className,
		...rest
	} = props;

	return (
		<div
			className={cn(
				"flex w-full",
				map.direction[direction],
				map.align[align],
				map.justify[justify],
				map.gap[gap],
				className,
			)}
			{...rest}
		/>
	);
};
