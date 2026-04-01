import { cn } from "@heroui/react";
import type React from "react";

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
	cols?: 1 | 2 | 3 | 4 | 6 | 8 | 5 | 12;
	gap?: 2 | 3 | 4 | 6 | 8;
};

export const Grid: React.FC<GridProps> = (props: GridProps) => {
	const { cols = 1, gap = 4, className, ...rest } = props;
	return (
		<div
			className={cn("grid", `grid-cols-${cols}`, `gap-${gap}`, className)}
			{...rest}
		/>
	);
};
