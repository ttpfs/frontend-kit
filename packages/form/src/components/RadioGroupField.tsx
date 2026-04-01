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
			name={name}
			control={control}
			render={({ field, fieldState: { invalid, error } }) => (
				<div className="flex flex-col gap-2">
					<RadioGroup
						label={label}
						description={description}
						isRequired={required}
						isDisabled={field.disabled ?? disabled}
						isReadOnly={readonly}
						isInvalid={invalid}
						value={field.value ?? ""}
						onChange={field.onChange}
						name={field.name}
						items={options.map((item) => ({
							description: item.meta?.description,
							label: item.label,
							value: item.id,
						}))}
						orientation={orientation}
					/>
					{invalid && <FieldError>{error?.message}</FieldError>}
				</div>
			)}
		/>
	);
};
