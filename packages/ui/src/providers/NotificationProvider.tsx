import { Toast } from "@heroui/react";
import type React from "react";
import { type CustomStyle } from "@/types";

type Placement =
	| "top start"
	| "top"
	| "top end"
	| "bottom start"
	| "bottom"
	| "bottom end";

interface NotificationProviderProps extends CustomStyle {
	placement?: Placement;
	gap?: number;
	maxVisibleToasts?: number;
	width?: number;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = (
	props,
) => {
	const {
		className,
		gap = 12,
		maxVisibleToasts = 3,
		placement = "top end",
		width = 460,
	} = props;
	return (
		<Toast.Provider
			className={className}
			gap={gap}
			maxVisibleToasts={maxVisibleToasts}
			placement={placement}
			width={width}
		/>
	);
};
