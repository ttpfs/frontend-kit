import {
	Tooltip as BaseTooltip,
	type TooltipContentProps as BaseTooltipContentProps,
	type TooltipTriggerProps as BaseTooltipTriggerProps,
	type TooltipRootProps,
} from "@heroui/react";
import type React from "react";

const TooltipRoot = BaseTooltip;

interface TooltipTriggerProps extends BaseTooltipTriggerProps {}

const TooltipTrigger: React.FC<TooltipTriggerProps> = (props) => {
	return <TooltipRoot.Trigger {...props}>{props.children}</TooltipRoot.Trigger>;
};

interface TooltipContentProps extends BaseTooltipContentProps {}

const TooltipContent: React.FC<TooltipContentProps> = (props) => {
	const { showArrow = true, offset = 6, ...rest } = props;

	return (
		<TooltipRoot.Content offset={offset} showArrow={showArrow} {...rest}>
			<TooltipRoot.Arrow />
			{props.children}
		</TooltipRoot.Content>
	);
};

interface TooltipProps extends TooltipRootProps {}

const TooltipImpl: React.FC<TooltipProps> = (props) => {
	const { closeDelay = 0, delay = 0, ...rest } = props;

	return (
		<TooltipRoot closeDelay={closeDelay} delay={delay} {...rest}>
			{props.children}
		</TooltipRoot>
	);
};

const Tooltip = Object.assign(TooltipImpl, {
	Content: TooltipContent,
	displayName: "Tooltip",
	Trigger: TooltipTrigger,
});

export {
	Tooltip,
	type TooltipContentProps,
	type TooltipProps,
	type TooltipTriggerProps,
};
