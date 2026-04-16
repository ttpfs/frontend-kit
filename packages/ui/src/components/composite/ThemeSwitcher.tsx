import { Skeleton, useIsHydrated } from "@heroui/react";
import { cn } from "@heroui/styles";
import { useTheme } from "next-themes";
import type React from "react";
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

	const isMounted = useIsHydrated();

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

	const toggleTheme = () => {
		if (resolvedTheme === "dark") setTheme("light");
		else setTheme("dark");
	};

	const isDark = resolvedTheme === "dark";

	if (!isMounted)
		return <Skeleton className={cn(className?.skeleton, "h-9 w-9")} />;

	return (
		<Tooltip delay={100}>
			<Button
				className={cn(
					className?.root,
					"rounded-lg group font-medium whitespace-nowrap",
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
							"text-neutral-500 group-hover:text-white dark:text-neutral-400",
						)}
						name="moon"
					/>
				) : (
					<Icon
						className={cn(
							className?.darkIcon,
							"text-neutral-500 group-hover:text-black dark:text-neutral-400",
						)}
						name="sun"
					/>
				)}
			</Button>
			<Tooltip.Content offset={6}>
				<Tooltip.Arrow />
				{renderLabel()}
			</Tooltip.Content>
		</Tooltip>
	);
};
