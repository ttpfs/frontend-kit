import { type CustomStyle } from "@/types";
import {
	type AlertDialogBackdropProps,
	type AlertDialogBodyProps,
	type AlertDialogFooterProps,
	type AlertDialogIconProps,
	type AlertDialogRootProps,
	type AlertDialogTriggerProps,
	AlertDialog as BaseAlertDialog,
	type AlertDialogHeaderProps as BaseAlertDialogHeaderProps,
	cn,
	Description,
} from "@heroui/react";
import type React from "react";
import { type PropsWithChildren } from "react";

const AlertDialogRoot = BaseAlertDialog;
type AlertDialogPlacement = "auto" | "top" | "center" | "bottom";

const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = (props) => {
	return (
		<AlertDialogRoot.Trigger {...props}>
			{props.children}
		</AlertDialogRoot.Trigger>
	);
};

interface AlertDialogHeaderProps extends BaseAlertDialogHeaderProps {
	heading: string | React.ReactNode;
	description?: string | React.ReactNode;
	icon?: React.ReactNode;
	iconClassName?: string;
}

const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = (props) => {
	const { heading, description, icon, iconClassName } = props;

	return (
		<AlertDialogRoot.Header>
			<AlertDialogRoot.Icon className={iconClassName}>
				{icon}
			</AlertDialogRoot.Icon>
			<AlertDialogRoot.Heading>{heading}</AlertDialogRoot.Heading>
			{description && <Description>{description}</Description>}
		</AlertDialogRoot.Header>
	);
};

const AlertDialogHeaderIcon: React.FC<AlertDialogIconProps> = (props) => {
	return (
		<AlertDialogRoot.Icon {...props}>{props.children}</AlertDialogRoot.Icon>
	);
};

const AlertDialogBody: React.FC<AlertDialogBodyProps> = (props) => {
	return (
		<AlertDialogRoot.Body {...props}>{props.children}</AlertDialogRoot.Body>
	);
};

interface AlertDialogContentProps
	extends PropsWithChildren,
		Omit<AlertDialogBackdropProps, "variant" | "children" | "className">,
		CustomStyle {
	placement?: AlertDialogPlacement;
	backdrop?: "opaque" | "blur" | "transparent";
	showClose?: boolean;
}

const AlertDialogContent: React.FC<AlertDialogContentProps> = (props) => {
	const { className, placement, showClose, backdrop, ...rest } = props;

	return (
		<AlertDialogRoot.Backdrop
			onWheelCapture={(e) => {
				e.stopPropagation();
			}}
			variant={backdrop}
			{...rest}
		>
			<AlertDialogRoot.Container>
				<AlertDialogRoot.Dialog className={className}>
					{showClose && <AlertDialogRoot.CloseTrigger />}
					{rest.children}
				</AlertDialogRoot.Dialog>
			</AlertDialogRoot.Container>
		</AlertDialogRoot.Backdrop>
	);
};

const AlertDialogFooter: React.FC<AlertDialogFooterProps> = (props) => {
	return (
		<AlertDialogRoot.Footer {...props}>{props.children}</AlertDialogRoot.Footer>
	);
};

type AlertDialogBase = Omit<AlertDialogRootProps, "children"> & {};

type AlertDialogWithChildren = AlertDialogBase & {
	trigger?: never;
	children: React.ReactNode;
	title?: never;
	description?: never;
	body?: never;
	variant?: never;
	placement?: never;
	footer?: never;
	showClose?: never;
	icon?: never;
	className?: {
		iconContainer?: never;
		content?: never;
		footer?: never;
		header?: never;
		body?: never;
	};
};

type AlertDialogWithConfig = AlertDialogBase & {
	title: string;
	icon?: React.ReactNode;
	trigger?: React.ReactNode;
	description?: string;
	showClose?: boolean;
	body: React.ReactNode;
	footer?: React.ReactNode;
	variant?: "opaque" | "blur" | "transparent";
	placement?: AlertDialogPlacement;
	children?: never;
	className?: {
		iconContainer?: string;
		content?: string;
		footer?: string;
		header?: string;
		body?: string;
	};
};

type AlertDialogProps = AlertDialogWithChildren | AlertDialogWithConfig;

const AlertDialogImpl: React.FC<AlertDialogProps> = (props) => {
	const { placement = "auto", showClose = true, className, ...rest } = props;

	const content =
		"children" in props ? (
			props.children
		) : (
			<>
				{rest.trigger && (
					<AlertDialogRoot.Trigger>{rest.trigger}</AlertDialogRoot.Trigger>
				)}
				<AlertDialogRoot.Backdrop
					onWheelCapture={(e) => {
						e.stopPropagation();
					}}
					variant={rest.variant}
				>
					<AlertDialogRoot.Container placement={placement}>
						<AlertDialogRoot.Dialog
							className={cn(className?.content, "sm:max-w-96")}
						>
							{showClose && <AlertDialogRoot.CloseTrigger />}
							<AlertDialogRoot.Header className={className?.header}>
								{rest.icon && (
									<AlertDialogRoot.Icon
										className={cn(
											className?.iconContainer,
											"bg-default text-foreground",
										)}
									>
										{rest.icon}
									</AlertDialogRoot.Icon>
								)}
								<AlertDialogRoot.Heading>{rest.title}</AlertDialogRoot.Heading>
							</AlertDialogRoot.Header>
							<AlertDialogRoot.Body className={className?.body}>
								{rest.body}
							</AlertDialogRoot.Body>
							<AlertDialogRoot.Footer className={className?.footer}>
								{rest.footer}
							</AlertDialogRoot.Footer>
						</AlertDialogRoot.Dialog>
					</AlertDialogRoot.Container>
				</AlertDialogRoot.Backdrop>
			</>
		);

	return <AlertDialogRoot>{content}</AlertDialogRoot>;
};

const AlertDialog = Object.assign(AlertDialogImpl, {
	Body: AlertDialogBody,
	Content: AlertDialogContent,
	displayName: "AlertDialog",
	Footer: AlertDialogFooter,
	Header: AlertDialogHeader,
	HeaderIcon: AlertDialogHeaderIcon,
	Trigger: AlertDialogTrigger,
});

export {
	AlertDialog,
	type AlertDialogBodyProps,
	type AlertDialogContentProps,
	type AlertDialogFooterProps,
	type AlertDialogHeaderProps,
	type AlertDialogIconProps,
	type AlertDialogProps,
	type AlertDialogTriggerProps,
};
