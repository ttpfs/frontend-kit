import { Skeleton } from "@heroui/react";
import { cn } from "@heroui/styles";
import { useTheme } from "next-themes";
import type React from "react";
import { useEffect, useState } from "react";
import { Tooltip } from "../overlay";
import { Button, type ButtonProps, Icon } from "../primitives";

export interface ThemeSwitcherProps extends Omit<ButtonProps, "className"> {
	className?: {
		darkIcon?: string;
		lightIcon?: string;
		root?: string;
		skeleton?: string;
	};
}

const THEME_LABEL = {
	dark: "Dark mode",
	default: "Resolve mode...",
	light: "Light mode",
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props) => {
	const { className, variant = "outline", ...rest } = props;
	const { resolvedTheme, setTheme } = useTheme();

	const [mounted, setMounted] = useState(false);

	const renderLabel = () => {
		switch (resolvedTheme) {
			case "light":
				return THEME_LABEL["light"];
			case "dark":
				return THEME_LABEL["dark"];
			default:
				return THEME_LABEL["default"];
		}
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		if (resolvedTheme === "dark") setTheme("light");
		else setTheme("dark");
	};

	const isDark = resolvedTheme === "dark";

	if (!mounted)
		return <Skeleton className={cn(className?.skeleton, "h-9 w-9")} />;

	return (
		<Tooltip>
			<Button
				className={cn(
					className?.root,
					"rounded-lg font-medium whitespace-nowrap",
				)}
				isIconOnly
				onPress={toggleTheme}
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
			<Tooltip.Content>{renderLabel()}</Tooltip.Content>
		</Tooltip>
	);
};
