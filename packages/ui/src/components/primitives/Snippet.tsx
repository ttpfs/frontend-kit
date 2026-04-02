import { cn } from "@heroui/react";
import { type ReactNode, useState } from "react";
import { Tooltip } from "../overlay";
import { Button } from "./Button";
import { Icon } from "./icon";

interface SnippetProps {
	children: string | string[];
	symbol?: string | ReactNode;
	variant?: "flat" | "solid" | "bordered" | "shadow";
	color?:
		| "default"
		| "primary"
		| "secondary"
		| "success"
		| "warning"
		| "danger";
	size?: "sm" | "md" | "lg";
	radius?: "none" | "sm" | "md" | "lg" | "full";
	hideSymbol?: boolean;
	hideCopyButton?: boolean;
	disableCopy?: boolean;
	disableTooltip?: boolean;
	className?: string;
	codeString?: string;
	onCopy?: (value: string) => void;
}

const variantClasses = {
	bordered: "border border-default-200 bg-transparent",
	flat: "bg-default-100",
	shadow: "bg-default-100 shadow-sm",
	solid: "bg-default-200",
};

const colorClasses = {
	danger: "text-danger",
	default: "text-default-foreground",
	primary: "text-accent",
	secondary: "text-default-600",
	success: "text-success",
	warning: "text-warning",
};

const sizeClasses = {
	lg: "px-4 py-2 text-base",
	md: "px-3 py-1.5 text-sm",
	sm: "px-1.5 py-0.5 text-xs",
};

const radiusClasses = {
	full: "rounded-full",
	lg: "rounded-lg",
	md: "rounded-md",
	none: "rounded-none",
	sm: "rounded-sm",
};

function Snippet({
	children,
	symbol = "$",
	variant = "flat",
	color = "default",
	size = "md",
	radius = "md",
	hideSymbol = false,
	hideCopyButton = false,
	disableCopy = false,
	disableTooltip = false,
	className,
	codeString,
	onCopy,
}: SnippetProps) {
	const [copied, setCopied] = useState(false);
	const isMultiLine = Array.isArray(children);
	const lines = isMultiLine ? children : [children];
	const textToCopy =
		codeString || (isMultiLine ? lines.join("\n") : String(children));

	const handleCopy = async () => {
		if (disableCopy) return;

		try {
			await navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
			onCopy?.(textToCopy);
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	};

	const symbolElement = hideSymbol ? null : (
		<span className={cn("text-default-500", colorClasses[color], "opacity-60")}>
			{symbol}
			{typeof symbol === "string" ? " " : ""}
		</span>
	);

	const copyButton = hideCopyButton ? null : (
		<Tooltip isDisabled={disableTooltip || disableCopy}>
			<Tooltip.Trigger>
				<Button
					aria-label="Copy"
					className="shrink-0 h-9 w-9"
					isDisabled={disableCopy}
					isIconOnly
					onPress={handleCopy}
					size="sm"
					variant="ghost"
				>
					{copied ? (
						<Icon
							className="text-neutral-800! dark:text-neutral-200!"
							name="check"
						/>
					) : (
						<Icon
							className="text-neutral-800! dark:text-neutral-200!"
							name="copy"
						/>
					)}
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				{copied ? "Copied!" : "Copy to clipboard"}
			</Tooltip.Content>
		</Tooltip>
	);

	return (
		<div
			className={cn(
				"flex items-center gap-2 font-mono",
				variantClasses[variant],
				sizeClasses[size],
				radiusClasses[radius],
				className,
			)}
		>
			<div className="flex-1 min-w-0">
				{isMultiLine ? (
					<div className="space-y-1">
						{lines.map((line, index) => (
							<pre className={cn("m-0", colorClasses[color])} key={index}>
								{symbolElement}
								{line}
							</pre>
						))}
					</div>
				) : (
					<pre className={cn("m-0", colorClasses[color])}>
						{symbolElement}
						{children}
					</pre>
				)}
			</div>
			{copyButton}
		</div>
	);
}

export { Snippet, type SnippetProps };
