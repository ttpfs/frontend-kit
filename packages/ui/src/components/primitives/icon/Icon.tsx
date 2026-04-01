import { cn } from "@heroui/styles";
import React from "react";
import { type TypedIconName } from "./iconMap";
import { getIconClass } from "./registry";
import { type IconSize, type IconVariant } from "./types";

const SIZE_MAP: Record<IconSize, number> = {
	"2xl": 32,
	lg: 20,
	md: 16,
	sm: 14,
	xl: 28,
	xs: 12,
};

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
	name: TypedIconName | (string & {});
	variant?: IconVariant;
	size?: keyof typeof SIZE_MAP;
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
	(props, ref) => {
		const {
			name,
			variant = "outline",
			size = "md",
			className,
			style,
			...rest
		} = props;

		const iconClass = getIconClass(name, variant);

		if (!iconClass) {
			return null;
		}

		const finalSize = SIZE_MAP[size];

		return (
			<span
				ref={ref}
				className={cn("iconify inline-block shrink-0", iconClass, className)}
				style={{
					height: finalSize,
					width: finalSize,
					...style,
				}}
				aria-hidden="true"
				{...rest}
			/>
		);
	},
);

Icon.displayName = "Icon";
