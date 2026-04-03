import { cn } from "@heroui/styles";
import { useTheme } from "next-themes";
import type React from "react";
import { Button, type ButtonProps, Icon } from "../primitives";

interface ThemeSwitcherProps extends Omit<ButtonProps, "className"> {
	className?: {
		darkIcon?: string;
		lightIcon?: string;
		root?: string;
	};
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props) => {
	const { className, variant = "outline", ...rest } = props;

	const { theme, setTheme } = useTheme();

	const isDark = theme === "dark";

	const onTheme = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<Button
			className={cn(
				className?.root,
				"h-10 w-10 rounded-lg font-medium whitespace-nowrap",
			)}
			isIconOnly
			onPress={onTheme}
			variant={variant}
			{...rest}
		>
			{isDark ? (
				<Icon
					className={cn(
						className?.lightIcon,
						"text-neutral-500 dark:text-neutral-400",
					)}
					name="sun"
				/>
			) : (
				<Icon
					className={cn(
						className?.darkIcon,
						"text-neutral-500 dark:text-neutral-400",
					)}
					name="moon"
				/>
			)}
		</Button>
	);
};
