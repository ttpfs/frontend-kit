import { Icon } from "@/components/primitives";
import { type CustomStyle } from "@/types";
import {
	type AccordionBodyProps,
	type AccordionHeadingProps,
	type AccordionItemProps,
	type AccordionRootProps,
	type AccordionTriggerProps,
	Accordion as BaseAccordion,
} from "@heroui/react";
import type React from "react";

const AccordionRoot = BaseAccordion;

const AccordionTrigger: React.FC<AccordionTriggerProps> = (props) => {
	return (
		<AccordionRoot.Trigger {...props}>{props.children}</AccordionRoot.Trigger>
	);
};

interface BaseAccordionIcon extends CustomStyle {}

type AccordionIndicatorProps =
	| (BaseAccordionIcon & {
			defaultIcon?: React.ReactNode;
			icon?: never;
			iconSelected?: never;
			active?: never;
	  })
	| (BaseAccordionIcon & {
			defaultIcon?: never;
			icon?: React.ReactNode;
			iconSelected?: React.ReactNode;
			active?: boolean;
	  });

const AccordionIcon: React.FC<AccordionIndicatorProps> = (props) => {
	const {
		active,
		className,
		defaultIcon = <Icon name="chevron-down" />,
		icon,
		iconSelected,
	} = props;

	if (
		active !== undefined &&
		(icon !== undefined || iconSelected !== undefined)
	) {
		return (
			<AccordionRoot.Indicator className={className}>
				{active ? iconSelected : icon}
			</AccordionRoot.Indicator>
		);
	}

	return (
		<AccordionRoot.Indicator className={className}>
			{defaultIcon}
		</AccordionRoot.Indicator>
	);
};
const AccordionHeader: React.FC<AccordionHeadingProps> = (props) => {
	return (
		<AccordionRoot.Heading {...props}>{props.children}</AccordionRoot.Heading>
	);
};
const AccordionContent: React.FC<AccordionBodyProps> = (props) => {
	return (
		<AccordionRoot.Panel>
			<AccordionRoot.Body {...props}>{props.children}</AccordionRoot.Body>
		</AccordionRoot.Panel>
	);
};
const AccordionItem: React.FC<AccordionItemProps> = (props) => {
	return <AccordionRoot.Item {...props}>{props.children}</AccordionRoot.Item>;
};

type Item = {
	key: string | number;
	icon?: React.ReactNode;
	title: string;
	content: string | React.ReactNode;
};

interface BaseAccordionProps extends AccordionRootProps {
	icon?: React.ReactNode;
	iconSelected?: React.ReactNode;
	active?: boolean;
}

type AccordionProps =
	| (BaseAccordionProps & {
			items: Item[];
			children?: never;
	  })
	| (BaseAccordionProps & {
			items?: never;
			children: React.ReactNode;
	  });

const AccordionImpl: React.FC<AccordionProps> = (props) => {
	const { items, active, icon, iconSelected, ...rest } = props;

	if ("items" in props) {
		return (
			<AccordionRoot {...rest}>
				{Array.isArray(items) &&
					items.map((item) => (
						<AccordionRoot.Item key={item.key}>
							<AccordionRoot.Heading>
								<AccordionRoot.Trigger>
									{item.icon ? (
										<span className="mr-3 size-4 shrink-0 text-muted">
											{item.icon}
										</span>
									) : null}
									{item.title}
									<AccordionIcon
										active={active}
										icon={icon}
										iconSelected={iconSelected}
									/>
								</AccordionRoot.Trigger>
							</AccordionRoot.Heading>
							<AccordionRoot.Panel>
								<AccordionRoot.Body>{item.content}</AccordionRoot.Body>
							</AccordionRoot.Panel>
						</AccordionRoot.Item>
					))}
			</AccordionRoot>
		);
	}

	return <AccordionRoot>{props.children}</AccordionRoot>;
};

const Accordion = Object.assign(AccordionImpl, {
	Content: AccordionContent,
	Header: AccordionHeader,
	Icon: AccordionIcon,
	Item: AccordionItem,
	Root: AccordionRoot,
	Trigger: AccordionTrigger,
});

export { Accordion };
