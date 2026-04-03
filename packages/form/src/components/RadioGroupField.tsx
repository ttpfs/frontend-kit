import { FieldError, RadioGroup } from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type RadioGroupFieldProps } from "@/types";

export const RadioGroupField = <T extends FieldValues>(
	props: RadioGroupFieldProps<T>,
) => {
	const {
		label,
		name,
		control,
		description,
		disabled,
		readonly,
		options,
		required,
		orientation = "horizontal",
	} = props;
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<div className="flex flex-col gap-2">
					<RadioGroup
						description={description}
						isDisabled={field.disabled ?? disabled}
						isInvalid={invalid}
						isReadOnly={readonly}
						isRequired={required}
						items={options.map((item) => ({
							description: item.meta?.description,
							label: item.label,
							value: item.id,
						}))}
						label={label}
						name={field.name}
						onChange={field.onChange}
						orientation={orientation}
						value={field.value ?? ""}
					/>
					{invalid && <FieldError>{error?.message}</FieldError>}
				</div>
			)}
		/>
	);
};
