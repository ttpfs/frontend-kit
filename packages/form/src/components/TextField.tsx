import {
	TextField as BaseTextField,
	CloseButton,
	Description,
	FieldError,
	Icon,
	InputGroup,
	Label,
} from "@ttpfs/ui-react";
import type React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { type InputType, type TextFieldProps } from "@/types";

const IconMapForType: Record<InputType, React.ReactNode | undefined> = {
	email: <Icon name="mail" size="sm" />,
	password: <Icon name="lock" size="sm" />,
	search: <Icon name="search" size="sm" />,
	tel: <Icon name="phone" size="sm" />,
	text: undefined,
	url: <Icon name="global" size="sm" />,
};

export const TextField = <TValues extends FieldValues>(
	props: TextFieldProps<TValues>,
) => {
	const {
		label,
		disabled,
		name,
		className,
		description,
		placeholder = "Enter your input...",
		required = false,
		type = "text",
		readonly = false,
		control,
	} = props;

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<BaseTextField
					onChange={field.onChange}
					onBlur={field.onBlur}
					ref={field.ref}
					isInvalid={invalid}
					isRequired={required}
					isReadOnly={readonly}
					fullWidth
					name={field.name}
					isDisabled={field.disabled ?? disabled}
					className={className?.wrapper}
					type={type}
					aria-label={label ?? name}
				>
					<Label className={className?.label}>{label}</Label>
					<InputGroup className={className?.group}>
						{IconMapForType[type] && (
							<InputGroup.Prefix>{IconMapForType[type]}</InputGroup.Prefix>
						)}
						<InputGroup.Input
							placeholder={placeholder}
							value={field.value ?? ""}
							className={className?.input}
						/>
						{field.value?.length > 0 && (
							<InputGroup.Suffix>
								<CloseButton
									onClick={() => field.onChange("")}
									className={"size-4"}
								/>
							</InputGroup.Suffix>
						)}
					</InputGroup>
					{invalid ? (
						<FieldError>{error?.message}</FieldError>
					) : (
						description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)
					)}
				</BaseTextField>
			)}
		/>
	);
};
