import { DEFAULT_ICON_REGISTRY } from "./iconMap";
import {
	type IconDefinition,
	type IconRegistry,
	type IconVariant,
	type TypedIconName,
} from "./types";

const registry: IconRegistry = { ...DEFAULT_ICON_REGISTRY };

export const registerIcons = <
	T extends Partial<Record<TypedIconName, IconDefinition>>,
>(
	icons: T,
) => {
	Object.entries(icons).forEach(([name, icon]) => {
		registry[name as TypedIconName] = {
			...registry[name as TypedIconName], // giữ default cũ
			...icon, // override cái mới
		};
	});
};

export const getIconClass = (
	name: TypedIconName,
	variant: IconVariant = "outline",
) => {
	const icon = registry[name];
	if (!icon) return;

	return icon[variant] || icon.outline || Object.values(icon)[0];
};
