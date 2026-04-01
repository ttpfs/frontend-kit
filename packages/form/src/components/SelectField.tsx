import {
	Description,
	FieldError,
	Header,
	Label,
	ListBox,
	Select,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type SelectFieldProps } from "@/types";

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
			case "default":
				return (
					<ListBox>
						{props.options.map((option) => (
							<ListBox.Item
								key={option.id}
								id={option.id}
								textValue={option.label}
							>
								{option.label}
								<ListBox.ItemIndicator />
							</ListBox.Item>
						))}
					</ListBox>
				);
			case "section":
				return (
					<ListBox>
						{props.options.map((item) => (
							<ListBox.Section key={item.label}>
								<Header>{item.label}</Header>
								{item.options.map((option) => (
									<ListBox.Item
										key={option.id}
										id={option.id}
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
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<Select
					fullWidth
					isDisabled={field.disabled ?? disabled}
					isInvalid={invalid}
					isRequired={required}
					placeholder={placeholder}
					value={field.value}
					onChange={field.onChange}
					onBlur={field.onBlur}
					ref={field.ref}
					name={field.name}
					selectionMode={mode}
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
