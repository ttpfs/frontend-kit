import {
	Autocomplete,
	Avatar,
	cn,
	Description,
	EmptyState,
	FieldError,
	type Key,
	Label,
	ListBox,
	SearchField,
	Spinner,
	Tag,
	TagGroup,
} from "@ttpfs/ui-react";
import { useState } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { type AutocompleteFieldProps } from "@/types";

export const AutocompleteField = <T extends FieldValues>(
	props: AutocompleteFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		isFetching,
		description,
		disabled,
		placeholder,
		options,
		onSearch: onSearchProp,
		mode,
		required,
	} = props;

	const [search, setSearch] = useState<string | undefined>(undefined);

	const onSearch = (keyword: string) => {
		onSearchProp?.(keyword);
		setSearch(keyword);
	};

	// biome-ignore lint/suspicious/noExplicitAny: <>
	const renderValue = (value: any) => {
		switch (mode) {
			case "multiple":
				return (
					<Autocomplete.Value>
						{/** biome-ignore lint/suspicious/noExplicitAny: <> */}
						{({ defaultChildren, isPlaceholder, state }: any) => {
							if (isPlaceholder || state.selectedItems.length === 0) {
								return defaultChildren;
							}
							const selectedItemsKeys = state.selectedItems.map(
								// biome-ignore lint/suspicious/noExplicitAny: <>
								(item: any) => item.key,
							);
							return (
								<TagGroup
									size="sm"
									onRemove={(keys) =>
										value?.filter((key: Key) => !keys.has(key))
									}
								>
									<TagGroup.List>
										{selectedItemsKeys.map((selectedItemKey: Key) => {
											const item = options.find(
												(s) => s.id === selectedItemKey,
											);
											if (!item) return null;
											return (
												<Tag key={item.id} id={item.id}>
													{item.label}
												</Tag>
											);
										})}
									</TagGroup.List>
								</TagGroup>
							);
						}}
					</Autocomplete.Value>
				);
			case "single":
				<Autocomplete.Value>
					{({ defaultChildren, isPlaceholder, state }) => {
						if (isPlaceholder || state.selectedItems.length === 0) {
							return defaultChildren;
						}
						const selectedItems = state.selectedItems;
						if (selectedItems.length > 1) {
							return `${selectedItems.length} users selected`;
						}
						const selectedItem = options.find(
							(user) => user.id === selectedItems[0]?.key,
						);
						if (!selectedItem) {
							return defaultChildren;
						}
						return (
							<div className="flex items-center gap-2">
								{selectedItem.meta?.thumbnailUrl && (
									<Avatar className="size-4" size="sm">
										<Avatar.Image src={selectedItem.meta?.thumbnailUrl} />
										<Avatar.Fallback>
											{selectedItem.label.charAt(0)}
										</Avatar.Fallback>
									</Avatar>
								)}
								<span>{selectedItem.label}</span>
							</div>
						);
					}}
				</Autocomplete.Value>;
		}
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<Autocomplete
					isDisabled={field.disabled ?? disabled}
					isInvalid={invalid}
					isRequired={required}
					placeholder={placeholder}
					selectionMode={mode}
					value={field.value}
					onChange={field.onChange}
				>
					<Label>{label}</Label>
					<Autocomplete.Trigger>
						{renderValue(field.value)}
						<Autocomplete.Indicator />
					</Autocomplete.Trigger>
					<Autocomplete.Popover>
						<Autocomplete.Filter inputValue={search} onInputChange={onSearch}>
							<SearchField autoFocus name="search" variant="secondary">
								<SearchField.Group>
									<SearchField.SearchIcon />
									<SearchField.Input placeholder="Search characters..." />
									<Spinner
										size="sm"
										className={cn("absolute top-1/2 right-2 -translate-y-1/2", {
											"pointer-events-none opacity-0": !isFetching,
										})}
									/>
									<SearchField.ClearButton
										className={cn({
											"pointer-events-none opacity-0": !!isFetching,
										})}
									/>
								</SearchField.Group>
							</SearchField>
							<ListBox
								items={options}
								renderEmptyState={() => (
									<EmptyState>Không tìm thấy kết quả.</EmptyState>
								)}
							>
								{(option) => (
									<ListBox.Item
										key={option.id}
										id={option.id}
										textValue={option.label}
									>
										{option.meta?.thumbnailUrl && (
											<Avatar size="sm">
												<Avatar.Image src={option.meta.thumbnailUrl} />
												<Avatar.Fallback>
													{option.label?.charAt(0)}
												</Avatar.Fallback>
											</Avatar>
										)}
										<div className="flex flex-col">
											<Label>{option.label}</Label>
											{option.meta?.description && (
												<Description>{option.meta?.description}</Description>
											)}
										</div>
										<ListBox.ItemIndicator />
									</ListBox.Item>
								)}
							</ListBox>
						</Autocomplete.Filter>
					</Autocomplete.Popover>
					{invalid ? (
						<FieldError>{error?.message}</FieldError>
					) : (
						description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)
					)}
				</Autocomplete>
			)}
		/>
	);
};
