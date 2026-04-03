import {
	Drawer as BaseDrawer,
	type DrawerBodyProps as BaseDrawerBodyProps,
	type DrawerFooterProps as BaseDrawerFooterProps,
	type DrawerHeaderProps as BaseDrawerHeaderProps,
	type DrawerTriggerProps as BaseDrawerTriggerProps,
	cn,
	type DrawerBackdropProps,
	type DrawerRootProps,
} from "@heroui/react";
import type React from "react";
import { type PropsWithChildren } from "react";
import { Description } from "@/components/primitives";
import { type CustomStyle } from "@/types";

const DrawerRoot = BaseDrawer;
type DrawerPlacement = "top" | "bottom" | "left" | "right";

interface DrawerTriggerProps extends BaseDrawerTriggerProps {}

const DrawerTrigger: React.FC<DrawerTriggerProps> = (props) => {
	return <DrawerRoot.Trigger {...props}>{props.children}</DrawerRoot.Trigger>;
};

interface DrawerContentProps
	extends PropsWithChildren,
		CustomStyle,
		Omit<DrawerBackdropProps, "variant" | "children" | "className"> {
	backdrop?: "opaque" | "blur" | "transparent";
	placement?: DrawerPlacement;
	showClose?: boolean;
	showHandle?: boolean;
}
const DrawerContent: React.FC<DrawerContentProps> = (props) => {
	const {
		children,
		showClose,
		showHandle,
		className,
		placement,
		backdrop,
		...rest
	} = props;

	return (
		<DrawerRoot.Backdrop
			onWheelCapture={(e) => {
				e.stopPropagation();
			}}
			{...rest}
			variant={backdrop}
		>
			<DrawerRoot.Content placement={placement}>
				<DrawerRoot.Dialog className={className}>
					{showHandle && <DrawerRoot.Handle />}
					{showClose && <DrawerRoot.CloseTrigger />}
					{children}
				</DrawerRoot.Dialog>
			</DrawerRoot.Content>
		</DrawerRoot.Backdrop>
	);
};

interface DrawerHeaderProps extends Omit<BaseDrawerHeaderProps, "children"> {
	heading: string | React.ReactNode;
	description?: string | React.ReactNode;
}
const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
	const { heading, description, ...rest } = props;

	return (
		<DrawerRoot.Header {...rest}>
			<DrawerRoot.Heading>{heading}</DrawerRoot.Heading>
			{description && <Description>{description}</Description>}
		</DrawerRoot.Header>
	);
};

interface DrawerBodyProps extends BaseDrawerBodyProps {}

const DrawerBody: React.FC<DrawerBodyProps> = (props) => {
	return <DrawerRoot.Body {...props}>{props.children}</DrawerRoot.Body>;
};

interface DrawerFooterProps extends BaseDrawerFooterProps {}

const DrawerFooter: React.FC<DrawerFooterProps> = (props) => {
	return <DrawerRoot.Footer>{props.children}</DrawerRoot.Footer>;
};

type DrawerBase = Omit<DrawerRootProps, "children" | "title"> & {};

type DrawerWithChildren = DrawerBase & {
	trigger?: never;
	children: React.ReactNode;
	title?: never;
	description?: never;
	body?: never;
	variant?: never;
	placement?: never;
	footer?: never;
	showClose?: never;
	showHandle?: never;
	className?: {
		container?: string;
		footer?: string;
		header?: string;
		body?: string;
	};
};

type DrawerWithConfig = DrawerBase & {
	title: string;
	trigger?: React.ReactNode;
	description?: string;
	showClose?: boolean;
	showHandle?: boolean;
	body: React.ReactNode;
	footer?: React.ReactNode;
	placement?: DrawerPlacement;
	variant?: "opaque" | "blur" | "transparent";
	children?: never;
	className?: {
		container?: string;
		footer?: string;
		header?: string;
		body?: string;
	};
};

type DrawerProps = DrawerWithChildren | DrawerWithConfig;

const DrawerImpl: React.FC<DrawerProps> = (props) => {
	const {
		placement = "right",
		showClose = true,
		showHandle = true,
		className,
		...rest
	} = props;

	const content =
		"children" in props ? (
			props.children
		) : (
			<>
				{rest.trigger && (
					<DrawerRoot.Trigger>{rest.trigger}</DrawerRoot.Trigger>
				)}
				<DrawerRoot.Backdrop variant={rest.variant} {...rest}>
					<DrawerRoot.Content placement={placement}>
						<DrawerRoot.Dialog
							className={cn(className?.container)}
							onWheelCapture={(e) => {
								e.stopPropagation();
							}}
						>
							{showHandle && <DrawerRoot.Handle />}
							{showClose && <DrawerRoot.CloseTrigger />}
							<DrawerRoot.Header className={className?.header}>
								<DrawerRoot.Heading>{rest.title}</DrawerRoot.Heading>
								{rest.description && (
									<Description>{rest.description}</Description>
								)}
							</DrawerRoot.Header>
							<DrawerRoot.Body className={className?.body}>
								{rest.body}
							</DrawerRoot.Body>
							{rest.footer && (
								<DrawerRoot.Footer className={className?.footer}>
									{rest.footer}
								</DrawerRoot.Footer>
							)}
						</DrawerRoot.Dialog>
					</DrawerRoot.Content>
				</DrawerRoot.Backdrop>
			</>
		);

	return <DrawerRoot>{content}</DrawerRoot>;
};

const Drawer = Object.assign(DrawerImpl, {
	Body: DrawerBody,
	Content: DrawerContent,
	displayName: "Drawer",
	Footer: DrawerFooter,
	Header: DrawerHeader,
	Trigger: DrawerTrigger,
});

export {
	Drawer,
	type DrawerBodyProps,
	type DrawerContentProps,
	type DrawerFooterProps,
	type DrawerHeaderProps,
	type DrawerPlacement,
	type DrawerProps,
	type DrawerTriggerProps,
};
