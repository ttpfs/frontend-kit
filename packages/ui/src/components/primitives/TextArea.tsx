import {
	TextArea as BaseTextArea,
	Description,
	type TextAreaRootProps,
} from "@heroui/react";

import React from "react";

interface TextAreaProps
	extends Omit<TextAreaRootProps, "value" | "onChange" | "className"> {
	value?: string;
	onChange?: (value: string) => void;
	countLabel?: string;
	maxLength?: number;
	isDisabled?: boolean;
	isReadonly?: boolean;
	fullWidth?: boolean;
	variant?: "primary" | "secondary";
	className?: {
		textCount?: string;
		input?: string;
	};
}

const TextArea: React.FC<TextAreaProps> = (props) => {
	const {
		onChange,
		fullWidth = true,
		placeholder = "Enter some description...",
		rows = 6,
		variant = "primary",
		countLabel = "Ký tự: ",
		isDisabled,
		isReadonly,
		maxLength = 512,
		value,
		id,
		className,
		...rest
	} = props;

	const [_value, setValue] = React.useState(value ?? "");

	const handleChange = (value: string) => {
		setValue(value);
		onChange?.(value);
	};

	return (
		<div className="flex w-full flex-col gap-2">
			<BaseTextArea
				{...rest}
				className={className?.input}
				disabled={isDisabled}
				fullWidth={fullWidth}
				onChange={(event) => handleChange(event.target.value)}
				placeholder={placeholder}
				readOnly={isReadonly}
				rows={rows}
				value={value}
				variant={variant}
			/>
			<Description className={className?.textCount} id={`${id}-description`}>
				{countLabel} {_value.length} / {maxLength}
			</Description>
		</div>
	);
};

export { TextArea, type TextAreaProps };
