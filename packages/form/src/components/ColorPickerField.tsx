import {
	Button,
	ColorArea,
	ColorField,
	ColorPicker,
	ColorSlider,
	ColorSwatch,
	ColorSwatchPicker,
	Description,
	FieldError,
	Icon,
	Label,
	parseColor,
} from "@ttpfs/ui-react";
import { Controller, type FieldValues } from "react-hook-form";
import { type ColorPickerFieldProps } from "@/types";

const colorPresets = [
	"#ef4444",
	"#f97316",
	"#eab308",
	"#22c55e",
	"#06b6d4",
	"#3b82f6",
	"#8b5cf6",
	"#ec4899",
	"#f43f5e",
];

export const ColorPickerField = <T extends FieldValues>(
	props: ColorPickerFieldProps<T>,
) => {
	const {
		label,
		name,
		className,
		control,
		description,
		disabled,
		placeholder,
		required,
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error, invalid } }) => {
				const shuffleColor = () => {
					const randomHue = Math.floor(Math.random() * 360);
					const randomSaturation = 50 + Math.floor(Math.random() * 50); // 50-100%
					const randomLightness = 40 + Math.floor(Math.random() * 30); // 40-70%
					field.onChange(
						name,
						parseColor(
							`hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`,
						).toString(),
					);
				};
				return (
					<div className="flex w-full flex-col">
						<ColorPicker onChange={field.onChange} value={field.value}>
							<ColorPicker.Trigger className={"w-full"}>
								<ColorSwatch size="lg" />
								<Label className={className?.label}>
									{label}
									{required && (
										<Icon className="text-danger ml-1.5" name="asterisk" />
									)}
								</Label>
							</ColorPicker.Trigger>
							<ColorPicker.Popover className="gap-2">
								<ColorSwatchPicker className="justify-center pt-2" size="xs">
									{colorPresets.map((preset) => (
										<ColorSwatchPicker.Item color={preset} key={preset}>
											<ColorSwatchPicker.Swatch />
										</ColorSwatchPicker.Item>
									))}
								</ColorSwatchPicker>
								<ColorArea
									aria-label="Color area"
									className="max-w-full"
									colorSpace="hsb"
									isDisabled={field.disabled ?? disabled}
									xChannel="saturation"
									yChannel="brightness"
								>
									<ColorArea.Thumb />
								</ColorArea>
								<div className="flex items-center gap-2 px-1">
									<ColorSlider
										aria-label="Hue slider"
										channel="hue"
										className="flex-1"
										colorSpace="hsb"
									>
										<ColorSlider.Track>
											<ColorSlider.Thumb />
										</ColorSlider.Track>
									</ColorSlider>
									<Button
										aria-label="Shuffle color"
										isIconOnly
										onPress={shuffleColor}
										size="sm"
										variant="tertiary"
									>
										<Icon className="size-4" name="shuffle" />
									</Button>
								</div>
								<ColorField aria-label="Color field">
									<ColorField.Group variant="secondary">
										<ColorField.Prefix>
											<ColorSwatch size="xs" />
										</ColorField.Prefix>
										<ColorField.Input placeholder={placeholder} />
									</ColorField.Group>
								</ColorField>
							</ColorPicker.Popover>
						</ColorPicker>
						{invalid ? (
							<FieldError>{error?.message}</FieldError>
						) : (
							description && (
								<Description className={className?.description}>
									{description}
								</Description>
							)
						)}
					</div>
				);
			}}
		/>
	);
};
