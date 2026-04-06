import { type InputType, type TextFieldProps } from "@/types";
import {
	TextField as BaseTextField,
	CloseButton,
	cn,
	Description,
	FieldError,
	Icon,
	InputGroup,
	Label,
} from "@ttpfs/ui-react";
import type React from "react";
import { Controller, type FieldValues } from "react-hook-form";

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
			control={control}
			name={name}
			render={({ field, fieldState: { error, invalid } }) => (
				<BaseTextField
					aria-label={label ?? name}
					className={className?.wrapper}
					fullWidth
					isDisabled={field.disabled ?? disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					name={field.name}
					onBlur={field.onBlur}
					onChange={field.onChange}
					ref={field.ref}
					type={type}
					validationBehavior="aria"
				>
					<Label className={className?.label}>{label}</Label>
					<InputGroup className={className?.group}>
						{IconMapForType[type] && (
							<InputGroup.Prefix>{IconMapForType[type]}</InputGroup.Prefix>
						)}
						<InputGroup.Input
							className={cn(className?.input, "text-sm placeholder:text-sm")}
							placeholder={placeholder}
							value={field.value ?? ""}
						/>
						{field.value?.length > 0 && (
							<InputGroup.Suffix>
								<CloseButton onClick={() => field.onChange("")}>
									<Icon name="close" size="sm" />
								</CloseButton>
							</InputGroup.Suffix>
						)}
					</InputGroup>
					{error ? (
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
