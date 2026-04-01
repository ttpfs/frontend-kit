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
import { type InfinitySelectFieldProps } from "@/types/fields";

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
			case "default":
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
			case "section":
				return (
					<ListBox>
						<Collection items={props.options}>
							{(item) => (
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
