import {
	type ButtonRootProps,
	cn,
	Button as HerouiButton,
	type PressEvent,
} from "@heroui/react";
import type React from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends Omit<ButtonRootProps, "children" | "onClick"> {
	children?: React.ReactNode;
	loading?: boolean;
	icon?: React.ReactNode;
	iconRight?: React.ReactNode;
	onClick?: (e: PressEvent) => void;
	loadingIcon?: React.ReactNode;
	loadingLabel?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
	const {
		children,
		loadingLabel = "Loading...",
		className,
		isIconOnly,
		loadingIcon,
		icon,
		onClick,
		iconRight,
		loading = false,
		...rest
	} = props;

	const LoadingComp =
		loadingIcon !== undefined ? (
			loadingIcon
		) : (
			<Spinner color="current" size="sm" />
		);

	return (
		<HerouiButton
			className={cn(className, "h-9")}
			isIconOnly={isIconOnly || !children}
			isPending={loading}
			onPress={onClick}
			{...rest}
		>
			{({ isPending }) => (
				<>
					{isPending ? LoadingComp : icon}
					{children && (isPending ? loadingLabel : children)}
					{!isPending && iconRight}
				</>
			)}
		</HerouiButton>
	);
};

export { Button, type ButtonProps };
