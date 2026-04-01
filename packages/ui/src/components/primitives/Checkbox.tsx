import {
	Checkbox as BaseCheckbox,
	type CheckboxRootProps,
} from "@heroui/react";
import type React from "react";
import { type PropsWithChildren } from "react";

const CheckboxRoot = BaseCheckbox;
const CheckboxContent = BaseCheckbox.Content;
const CheckboxControl = BaseCheckbox.Control;
const CheckboxIndicator = BaseCheckbox.Indicator;

interface CheckboxProps
	extends PropsWithChildren,
		Omit<CheckboxRootProps, "className" | "children"> {
	icon?: React.ReactNode;
}

const CheckboxImpl: React.FC<CheckboxProps> = ({
	icon: Icon,
	children,
	name,
	...props
}) => {
	return (
		<CheckboxRoot {...props}>
			<CheckboxControl>
				{Icon ? (
					<CheckboxIndicator>
						{({ isSelected }) => (isSelected ? Icon : null)}
					</CheckboxIndicator>
				) : (
					<CheckboxIndicator />
				)}
			</CheckboxControl>
			<CheckboxContent>{children}</CheckboxContent>
		</CheckboxRoot>
	);
};

type CheckboxComponent = typeof CheckboxImpl;

const Checkbox = CheckboxImpl as CheckboxComponent;
Checkbox.displayName = "Checkbox";

export { Checkbox, type CheckboxProps };
