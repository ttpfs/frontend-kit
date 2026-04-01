import { Description } from "@/components/primitives";
import { type CustomStyle } from "@/types";
import {
	Modal as BaseModal,
	type ModalBodyProps as BaseModalBodyProps,
	type ModalFooterProps as BaseModalFooterProps,
	type ModalHeaderProps as BaseModalHeaderProps,
	type ModalTriggerProps as BaseModalTriggerProps,
	cn,
	type ModalBackdropProps,
	type ModalIconProps,
	type ModalRootProps,
} from "@heroui/react";
import type React from "react";
import { type PropsWithChildren } from "react";

const ModalRoot = BaseModal;
type ModalPlacement = "auto" | "top" | "center" | "bottom";

interface ModalTriggerProps extends BaseModalTriggerProps {}

const ModalTrigger: React.FC<ModalTriggerProps> = (props) => {
	return <ModalRoot.Trigger {...props}>{props.children}</ModalRoot.Trigger>;
};

interface ModalBodyProps extends BaseModalBodyProps {}

const ModalBody: React.FC<ModalBodyProps> = (props) => {
	return <ModalRoot.Body {...props}>{props.children}</ModalRoot.Body>;
};

interface ModalFooterProps extends BaseModalFooterProps {}

const ModalFooter: React.FC<ModalFooterProps> = (props) => {
	return <ModalRoot.Footer {...props}>{props.children}</ModalRoot.Footer>;
};

interface ModalContentProps
	extends PropsWithChildren,
		Omit<ModalBackdropProps, "variant" | "children" | "className">,
		CustomStyle {
	placement?: ModalPlacement;
	backdrop?: "opaque" | "blur" | "transparent";
	showClose?: boolean;
}

const ModalContent: React.FC<ModalContentProps> = (props) => {
	const { className, placement, showClose, backdrop, ...rest } = props;

	return (
		<ModalRoot.Backdrop
			onWheelCapture={(e) => {
				e.stopPropagation();
			}}
			variant={backdrop}
			{...rest}
		>
			<ModalRoot.Container>
				<ModalRoot.Dialog className={className}>
					{showClose && <ModalRoot.CloseTrigger />}
					{rest.children}
				</ModalRoot.Dialog>
			</ModalRoot.Container>
		</ModalRoot.Backdrop>
	);
};

const ModalHeaderIcon: React.FC<ModalIconProps> = (props) => {
	return <ModalRoot.Icon {...props}>{props.children}</ModalRoot.Icon>;
};

interface ModalHeaderProps extends BaseModalHeaderProps {
	heading: string | React.ReactNode;
	description?: string | React.ReactNode;
	icon?: React.ReactNode;
	iconClassName?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = (props) => {
	const { icon, iconClassName, heading, description, ...rest } = props;

	return (
		<ModalRoot.Header {...rest}>
			<ModalRoot.Icon className={iconClassName}>{icon}</ModalRoot.Icon>
			<ModalRoot.Heading>{heading}</ModalRoot.Heading>
			{description && <Description>{description}</Description>}
		</ModalRoot.Header>
	);
};

type ModalBase = Omit<ModalRootProps, "children"> & {};

type ModalWithChildren = ModalBase & {
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

type ModalWithConfig = ModalBase & {
	title: string;
	icon?: React.ReactNode;
	trigger: React.ReactNode;
	description?: string;
	showClose?: boolean;
	body: React.ReactNode;
	footer?: React.ReactNode;
	variant?: "opaque" | "blur" | "transparent";
	placement?: ModalPlacement;
	children?: never;
	className?: {
		iconContainer?: string;
		content?: string;
		footer?: string;
		header?: string;
		body?: string;
	};
};

type ModalProps = ModalWithChildren | ModalWithConfig;

const ModalImpl: React.FC<ModalProps> = (props) => {
	const { placement = "auto", showClose = true, className, ...rest } = props;

	const content =
		"children" in props ? (
			props.children
		) : (
			<>
				<ModalRoot.Trigger>{rest.trigger}</ModalRoot.Trigger>
				<ModalRoot.Backdrop
					onWheelCapture={(e) => {
						e.stopPropagation();
					}}
					variant={rest.variant}
				>
					<ModalRoot.Container placement={placement}>
						<ModalRoot.Dialog className={cn(className?.content, "sm:max-w-96")}>
							{showClose && <ModalRoot.CloseTrigger />}
							<ModalRoot.Header className={className?.header}>
								{rest.icon && (
									<ModalRoot.Icon
										className={cn(
											className?.iconContainer,
											"bg-default text-foreground",
										)}
									>
										{rest.icon}
									</ModalRoot.Icon>
								)}
								<ModalRoot.Heading>{rest.title}</ModalRoot.Heading>
							</ModalRoot.Header>
							<ModalRoot.Body className={className?.body}>
								{rest.body}
							</ModalRoot.Body>
							<ModalRoot.Footer className={className?.footer}>
								{rest.footer}
							</ModalRoot.Footer>
						</ModalRoot.Dialog>
					</ModalRoot.Container>
				</ModalRoot.Backdrop>
			</>
		);

	return <ModalRoot>{content}</ModalRoot>;
};

const Modal = Object.assign(ModalImpl, {
	Body: ModalBody,
	Content: ModalContent,
	displayName: "Modal",
	Footer: ModalFooter,
	Header: ModalHeader,
	HeaderIcon: ModalHeaderIcon,
	Trigger: ModalTrigger,
});

export {
	Modal,
	type ModalBodyProps,
	type ModalContentProps,
	type ModalFooterProps,
	type ModalHeaderProps,
	type ModalTriggerProps,
};
