import { DEFAULT_ICON_REGISTRY } from "./iconMap";
import {
	type IconRegistry,
	type IconVariant,
	type TypedIconName,
} from "./types";

let registry: IconRegistry = { ...DEFAULT_ICON_REGISTRY };

export const registerIcons = (icons: IconRegistry) => {
	registry = {
		...registry,
		...icons,
	};
};

export const getIconClass = (
	name: TypedIconName,
	variant: IconVariant = "outline",
) => {
	const icon = registry[name];
	if (!icon) return;

	return icon[variant] || icon.outline || Object.values(icon)[0];
};
