import { type SelectFieldProps } from "@/types";
import {
	Description,
	FieldError,
	Header,
	Label,
	ListBox,
	Select,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

export const SelectField = <T extends FieldValues>(
	props: SelectFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		description,
		variant,
		disabled,
		placeholder,
		mode,
		required,
	} = props;

	const renderListItem = () => {
		switch (variant) {
			case "section":
				return (
					<ListBox selectionMode={mode}>
						{props.options.map((item) => (
							<ListBox.Section key={item.label}>
								<Header>{item.label}</Header>
								{item.options.map((option) => (
									<ListBox.Item
										id={option.id}
										key={option.id}
										textValue={option.label}
									>
										{option.label}
										<ListBox.ItemIndicator />
									</ListBox.Item>
								))}
							</ListBox.Section>
						))}
					</ListBox>
				);
			default:
				return (
					<ListBox selectionMode={mode}>
						{props.options.map((option) => (
							<ListBox.Item
								id={option.id}
								key={option.id}
								textValue={option.label}
							>
								{option.label}
								<ListBox.ItemIndicator />
							</ListBox.Item>
						))}
					</ListBox>
				);
		}
	};

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<Select
					fullWidth
					isDisabled={disabled ?? field.disabled}
					isInvalid={invalid}
					isRequired={required}
					name={field.name}
					onBlur={field.onBlur}
					onChange={(value) => field.onChange(value)}
					placeholder={placeholder}
					ref={field.ref}
					selectionMode={mode}
					validationBehavior="aria"
					value={field.value}
				>
					<Label className={className?.label}>{label}</Label>
					<Select.Trigger>
						<Select.Value />
						<Select.Indicator />
					</Select.Trigger>
					<Select.Popover>{renderListItem()}</Select.Popover>
					{invalid ? (
						<FieldError>{error?.message}</FieldError>
					) : (
						description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)
					)}
				</Select>
			)}
		/>
	);
};
