import { useTheme as useNextTheme } from "next-themes";

export function useTheme() {
	const { setTheme, resolvedTheme } = useNextTheme();
	return {
		setTheme,
		theme: resolvedTheme ?? "light",
	};
}
