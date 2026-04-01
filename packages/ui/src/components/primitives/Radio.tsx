import {
	Radio as BaseRadio,
	Description,
	Label,
	type RadioRootProps,
} from "@heroui/react";
import type React from "react";

const RadioRoot = BaseRadio;

type BaseRadioProps = Omit<RadioRootProps, "children"> & {
	icon?: React.ReactNode;
};

type RadioProps =
	| (BaseRadioProps & {
			label: string;
			description?: string;
			children?: never;
	  })
	| (BaseRadioProps & {
			label?: never;
			description?: never;
			children: React.ReactNode;
	  });

const RadioImpl: React.FC<RadioProps> = (props) => {
	const { icon, value, ...rest } = props;

	if ("children" in props) {
		return (
			<RadioRoot value={value} {...rest}>
				<RadioRoot.Control>
					{icon ? (
						<RadioRoot.Indicator>
							{({ isSelected }) => (isSelected ? icon : null)}
						</RadioRoot.Indicator>
					) : (
						<RadioRoot.Indicator />
					)}
				</RadioRoot.Control>
				<RadioRoot.Content>{props.children}</RadioRoot.Content>
			</RadioRoot>
		);
	}

	return (
		<RadioRoot value={value} {...rest}>
			<RadioRoot.Control>
				{icon ? (
					<RadioRoot.Indicator>
						{({ isSelected }) => (isSelected ? icon : null)}
					</RadioRoot.Indicator>
				) : (
					<RadioRoot.Indicator />
				)}
			</RadioRoot.Control>
			<RadioRoot.Content>
				<Label>{props.label}</Label>
				{props.description && <Description>{props.description}</Description>}
			</RadioRoot.Content>
		</RadioRoot>
	);
};

const Radio = Object.assign(RadioImpl, {
	displayName: "Radio",
});

export { Radio, type RadioProps };
