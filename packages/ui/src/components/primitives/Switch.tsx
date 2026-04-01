import { Switch as BaseSwitch, type SwitchRootProps } from "@heroui/react";
import type React from "react";
import type { PropsWithChildren } from "react";

const SwitchRoot = BaseSwitch;

const SwitchControl = SwitchRoot.Control;
const SwitchContent = SwitchRoot.Content;
const SwitchThumb = SwitchRoot.Thumb;

interface SwitchIcon {
	icon: React.ReactNode;
	iconSelected: React.ReactNode;
	isSelected: boolean;
}

const SwitchIcon: React.FC<SwitchIcon> = ({
	icon,
	isSelected,
	iconSelected,
}) => {
	return (
		<SwitchControl>
			<SwitchThumb>
				<SwitchRoot.Icon>{isSelected ? iconSelected : icon}</SwitchRoot.Icon>
			</SwitchThumb>
		</SwitchControl>
	);
};

interface SwitchProps
	extends PropsWithChildren,
		Omit<SwitchRootProps, "className" | "children"> {
	icon?: React.ReactNode;
	iconSelected?: React.ReactNode;
}

const SwitchImpl: React.FC<SwitchProps> = ({
	icon,
	children,
	iconSelected,
	...props
}) => {
	return (
		<SwitchRoot {...props}>
			{({ isSelected }) => (
				<>
					<SwitchControl>
						<SwitchThumb>
							{(iconSelected || icon) && (
								<SwitchIcon
									icon={icon}
									iconSelected={iconSelected}
									isSelected={isSelected}
								/>
							)}
						</SwitchThumb>
					</SwitchControl>
					<SwitchContent>{children}</SwitchContent>
				</>
			)}
		</SwitchRoot>
	);
};

const Switch = Object.assign(SwitchImpl, {
	displayName: "Switch",
});

export { Switch, type SwitchProps };
