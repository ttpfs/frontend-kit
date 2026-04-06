import { type InfinitySelectFieldProps } from "@/types";
import {
	Collection,
	Description,
	FieldError,
	Header,
	Label,
	ListBox,
	ListBoxLoadMoreItem,
	Select,
	Spinner,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

export const InfinitySelectField = <T extends FieldValues>(
	props: InfinitySelectFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		isFetching,
		loadMoreLabel = "Loading more...",
		onLoadMore,
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
					<ListBox>
						<Collection items={props.options}>
							{(item) => (
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
							)}
						</Collection>
						<ListBoxLoadMoreItem isLoading={isFetching} onLoadMore={onLoadMore}>
							<div className="py-2">
								<Spinner size="sm" />
								<span className="text-sm text-muted">{loadMoreLabel}</span>
							</div>
						</ListBoxLoadMoreItem>
					</ListBox>
				);
			default:
				return (
					<ListBox>
						<Collection items={props.options}>
							{(option) => (
								<ListBox.Item id={option.id} textValue={option.label}>
									{option.label}
									<ListBox.ItemIndicator />
								</ListBox.Item>
							)}
						</Collection>
						<ListBoxLoadMoreItem isLoading={isFetching} onLoadMore={onLoadMore}>
							<div className="py-2">
								<Spinner size="sm" />
								<span className="text-sm text-muted">{loadMoreLabel}</span>
							</div>
						</ListBoxLoadMoreItem>
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
					onChange={field.onChange}
					placeholder={placeholder}
					ref={field.ref}
					selectionMode={mode}
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
