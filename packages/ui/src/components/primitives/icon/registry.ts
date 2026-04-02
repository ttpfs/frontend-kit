import { DEFAULT_ICON_REGISTRY } from "./iconMap";
import {
	type IconDefinition,
	type IconRegistry,
	type IconVariant,
	type TypedIconName,
} from "./types";

let registry: IconRegistry = { ...DEFAULT_ICON_REGISTRY };

export const registerIcons = <
	T extends Partial<Record<TypedIconName, IconDefinition>>,
>(
	icons: T,
) => {
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
