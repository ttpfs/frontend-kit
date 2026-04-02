import {
	Popover as BasePopover,
	type PopoverContentProps as BasePopoverContentProps,
	type PopoverTriggerProps as BasePopoverTriggerProps,
	type PopoverRootProps,
} from "@heroui/react";
import type React from "react";

const PopoverRoot = BasePopover;

interface PopoverTriggerProps extends BasePopoverTriggerProps {}

const PopoverTrigger: React.FC<PopoverTriggerProps> = (props) => {
	return <PopoverRoot.Trigger {...props}>{props.children}</PopoverRoot.Trigger>;
};

interface PopoverContentProps
	extends Omit<BasePopoverContentProps, "className"> {
	heading: string | React.ReactNode;
	className?: string;
}

const PopoverContent: React.FC<PopoverContentProps> = (props) => {
	const { className, ...rest } = props;

	return (
		<PopoverRoot.Content {...rest}>
			<PopoverRoot.Arrow />
			<PopoverRoot.Dialog className={className}>
				<PopoverRoot.Heading>{props.heading}</PopoverRoot.Heading>
				{props.children}
			</PopoverRoot.Dialog>
		</PopoverRoot.Content>
	);
};

interface PopoverProps extends PopoverRootProps {}

const PopoverImpl: React.FC<PopoverProps> = (props) => {
	return <PopoverRoot {...props}>{props.children}</PopoverRoot>;
};

const Popover = Object.assign(PopoverImpl, {
	Content: PopoverContent,
	displayName: "Popover",
	Trigger: PopoverTrigger,
});

export { Popover };
