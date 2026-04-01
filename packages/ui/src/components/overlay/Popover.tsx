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

interface PopoverContentProps extends BasePopoverContentProps {
	heading: string | React.ReactNode;
}

const PopoverContent: React.FC<PopoverContentProps> = (props) => {
	return (
		<PopoverRoot.Content {...props}>
			<PopoverRoot.Arrow />
			<PopoverRoot.Dialog>
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
