import { type RadioGroupFieldProps } from "@/types";
import {
	Description,
	FieldError,
	Label,
	Radio,
	RadioGroup,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

export const RadioGroupField = <T extends FieldValues>(
	props: RadioGroupFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
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
						isDisabled={disabled ?? field.disabled}
						isInvalid={invalid}
						isReadOnly={readonly}
						isRequired={required}
						name={field.name}
						onChange={field.onChange}
						orientation={orientation}
						value={field.value ?? ""}
					>
						<Label className={className?.label}>{label}</Label>
						{description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)}
						{options.map((item) => (
							<Radio key={item.id} value={item.id}>
								<Radio.Control>
									<Radio.Indicator />
								</Radio.Control>
								<Radio.Content>
									<Label>{item.label}</Label>
									{item.meta?.description && (
										<Description>{item.meta?.description}</Description>
									)}
								</Radio.Content>
							</Radio>
						))}
					</RadioGroup>
					{invalid && <FieldError>{error?.message}</FieldError>}
				</div>
			)}
		/>
	);
};
