import { useTheme as useNextTheme } from "next-themes";
import { useState } from "react";

type Theme = "light" | "dark" | string;

export function useTheme() {
	const { setTheme: setNextTheme, theme: nextTheme } = useNextTheme();
	const [theme, _setTheme] = useState(nextTheme);

	const setTheme = (theme: Theme) => {
		_setTheme(theme);
		setNextTheme(theme);
	};

	return {
		setTheme,
		theme,
	};
}
