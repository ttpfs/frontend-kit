import { ThemeProvider as NextThemeProvider } from "next-themes";
import type React from "react";
import { type PropsWithChildren } from "react";

type DataAttribute = `data-${string}`;

type Attribute = DataAttribute | "class";

interface ThemeProviderProps extends PropsWithChildren {
	attribute?: Attribute | Attribute[];
	enableSystem?: boolean;
	defaultTheme?: string;
	disableTransitionOnChange?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
	const {
		children,
		attribute = "class",
		defaultTheme = "light",
		enableSystem = true,
		disableTransitionOnChange = false,
	} = props;
	return (
		<NextThemeProvider
			attribute={attribute}
			defaultTheme={defaultTheme}
			disableTransitionOnChange={disableTransitionOnChange}
			enableSystem={enableSystem}
		>
			{children}
		</NextThemeProvider>
	);
};
