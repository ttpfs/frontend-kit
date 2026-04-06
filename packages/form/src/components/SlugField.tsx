import { type SlugFieldProps } from "@/types";
import { toSlug } from "@/utils";
import {
	CloseButton,
	cn,
	Description,
	FieldError,
	Flex,
	Icon,
	InputGroup,
	Label,
	Link,
	TextField,
} from "@ttpfs/ui-react";
import {
	Controller,
	type FieldValues,
	type Path,
	useWatch,
} from "react-hook-form";

export const SlugField = <T extends FieldValues>(props: SlugFieldProps<T>) => {
	const {
		label,
		name,
		control,
		description,
		className,
		placeholder = "Type or click generate from souce...",
		readonly,
		iconGenerate,
		disabled,
		required,
		sourceField = "name",
	} = props;

	const sourceValue = useWatch({
		control,
		name: sourceField as Path<T>,
	});

	// biome-ignore lint/suspicious/noExplicitAny: <>
	const generateSlug = (onChange: (...event: any[]) => void) => {
		if (!sourceValue || typeof sourceValue !== "string") return;

		const slug = toSlug(sourceValue);

		onChange(slug);
	};

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField
					aria-label={label ?? name}
					className={className?.wrapper}
					fullWidth
					isDisabled={disabled ?? field.disabled}
					isInvalid={invalid}
					isReadOnly={readonly}
					isRequired={required}
					name={field.name}
					onBlur={field.onBlur}
					onChange={field.onChange}
					ref={field.ref}
					type={"text"}
					validationBehavior="aria"
				>
					<Flex>
						<Label className={className?.label}>{label}</Label>
						<Link
							className={"ml-auto flex items-center text-accent"}
							isDisabled={!sourceValue}
							onClick={() => generateSlug(field.onChange)}
						>
							{iconGenerate ? (
								iconGenerate
							) : (
								<Icon className="mr-1.5" name="sparkles" />
							)}
							Generate
						</Link>
					</Flex>
					<InputGroup className={className?.group}>
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
							<Description className={cn(className?.description)}>
								{description}
							</Description>
						)
					)}
				</TextField>
			)}
		/>
	);
};
