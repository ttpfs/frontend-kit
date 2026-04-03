import { cn } from "@heroui/styles";
import { useTheme } from "next-themes";
import type React from "react";
import { useEffect, useState } from "react";
import { Button, type ButtonProps, Icon } from "../primitives";

export interface ThemeSwitcherProps extends Omit<ButtonProps, "className"> {
	className?: {
		darkIcon?: string;
		lightIcon?: string;
		root?: string;
	};
}

const getInitialIsDark = () => {
	if (typeof document === "undefined") return false;
	return document.documentElement.classList.contains("dark");
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props) => {
	const { className, variant = "outline", ...rest } = props;
	const { resolvedTheme, setTheme } = useTheme();
	const [isDark, setIsDark] = useState(getInitialIsDark);

	useEffect(() => {
		setIsDark(resolvedTheme === "dark");
	}, [resolvedTheme]);

	const onTheme = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<Button
			className={cn(
				className?.root,
				"rounded-lg font-medium whitespace-nowrap",
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
					name="moon"
				/>
			) : (
				<Icon
					className={cn(
						className?.darkIcon,
						"text-neutral-500 dark:text-neutral-400",
					)}
					name="sun"
				/>
			)}
		</Button>
	);
};
