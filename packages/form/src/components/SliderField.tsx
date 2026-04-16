import { type SliderFieldProps } from "@/types";
import {
	cn,
	Description,
	FieldError,
	Label,
	Slider,
	TextField,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";

export const SliderField = <T extends FieldValues>(
	props: SliderFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		mode = "default",
		description,
		disabled,
		orientation = "horizontal",
		required,
		defaultValue,
		maxValue = 100,
		format,
		minValue = 0,
		step,
	} = props;
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField
					aria-label={label ?? name}
					fullWidth
					isInvalid={invalid}
					isRequired={required}
				>
					<Slider
						className={cn(className?.wrapper, "w-full max-w-xs")}
						defaultValue={defaultValue}
						formatOptions={format}
						isDisabled={disabled ?? field.disabled}
						maxValue={maxValue}
						minValue={minValue}
						onChange={field.onChange}
						orientation={orientation}
						step={step}
						value={field.value ?? 0}
					>
						<Label className={className?.label}>{label}</Label>
						<Slider.Output />
						{mode === "range" ? (
							<Slider.Track>
								{({ state }) => (
									<>
										<Slider.Fill />
										{state.values.map((_, i) => (
											<Slider.Thumb index={i} key={i} />
										))}
									</>
								)}
							</Slider.Track>
						) : (
							<Slider.Track>
								<Slider.Fill />
								<Slider.Thumb />
							</Slider.Track>
						)}
					</Slider>
					{invalid ? (
						<FieldError>{error?.message}</FieldError>
					) : (
						description && (
							<Description className={className?.description}>
								{description}
							</Description>
						)
					)}
				</TextField>
			)}
		/>
	);
};
