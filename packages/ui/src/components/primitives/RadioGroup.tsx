import {
	RadioGroup as BaseRadioGroup,
	Description,
	Label,
	type RadioGroupRootProps,
} from "@heroui/react";
import type React from "react";
import { Radio } from "./Radio";

const RadioGroupRoot = BaseRadioGroup;

type RadioItem = {
	value: string;
	label: string;
	description?: string;
};

type BaseRadioGroupProps = RadioGroupRootProps & {
	defaultValue?: string;
	label: string;
	description?: string;
	name?: string;
};

type RadioGroupProps =
	| (BaseRadioGroupProps & {
			items: RadioItem[];
			children?: never;
	  })
	| (BaseRadioGroupProps & {
			items?: never;
			children: React.ReactNode;
	  });

const RadioGroupImpl: React.FC<RadioGroupProps> = (props) => {
	const { label, defaultValue, children, description, items, name, ...rest } =
		props;

	const isItemsMode = Array.isArray(items);

	return (
		<RadioGroupRoot defaultValue={defaultValue} name={name} {...rest}>
			<Label>{label}</Label>
			{description && <Description>{description}</Description>}
			{isItemsMode
				? items.map((item) => (
						<Radio
							description={item.description}
							key={item.value}
							label={item.label}
							value={item.value}
						/>
					))
				: children}
		</RadioGroupRoot>
	);
};

const RadioGroup = Object.assign(RadioGroupImpl, {
	displayName: "RadioGroup",
});

export { RadioGroup, type RadioGroupProps };
