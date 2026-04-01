import { Kbd as HerouiKbd } from "@heroui/react";

import type React from "react";

type KbdKey =
	| "command"
	| "shift"
	| "ctrl"
	| "option"
	| "enter"
	| "delete"
	| "escape"
	| "tab"
	| "capslock"
	| "up"
	| "right"
	| "down"
	| "left"
	| "pageup"
	| "pagedown"
	| "home"
	| "end"
	| "help"
	| "space"
	| "fn"
	| "win"
	| "alt";

interface KbdProps {
	keys?: KbdKey[];
	shortcut?: string;
	variant?: "default" | "light";
}

const Kbd: React.FC<KbdProps> = (props) => {
	const { keys, shortcut, variant } = props;
	return (
		<HerouiKbd variant={variant}>
			{Array.isArray(keys) &&
				keys.map((key) => <HerouiKbd.Abbr key={key} keyValue={key} />)}
			{shortcut && <HerouiKbd.Content>{shortcut}</HerouiKbd.Content>}
		</HerouiKbd>
	);
};

export { Kbd, type KbdKey, type KbdProps };
