import { type SwitchFieldProps } from "@/types";
import { cn, Description, Label, Switch } from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

export const SwitchField = <T extends FieldValues>(
	props: SwitchFieldProps<T>,
) => {
	const { label, name, className, control, description, disabled, readonly } =
		props;
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Switch
					aria-label={label ?? name}
					isDisabled={disabled ?? field.disabled}
					isReadOnly={readonly}
					isSelected={field.value ?? false}
					onBlur={field.onBlur}
					onChange={field.onChange}
				>
					<Switch.Control>
						<Switch.Thumb />
					</Switch.Control>
					<Switch.Content>
						{label && <Label className={className?.label}>{label}</Label>}
						{description && (
							<Description className={cn(className?.description, "px-0")}>
								{description}
							</Description>
						)}
					</Switch.Content>
				</Switch>
			)}
		/>
	);
};
