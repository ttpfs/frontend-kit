import { Slider as BaseSlider, type SliderRootProps } from "@heroui/react";
import type React from "react";
import { Label } from "@/components/primitives";

interface BaseSliderProps extends SliderRootProps {
	label: string;
}

type SliderMode = "range" | "default";

type SliderProps =
	| (BaseSliderProps & {
			children: React.ReactNode;
			mode?: SliderMode;
	  })
	| (BaseSliderProps & {
			children?: never;
			mode: SliderMode;
	  });
const SliderImpl: React.FC<SliderProps> = (props) => {
	const { label, ...rest } = props;

	const content =
		"children" in props ? (
			props.children
		) : rest.mode === "range" ? (
			<BaseSlider.Track>
				{({ state }) => (
					<>
						<BaseSlider.Fill />
						{state.values.map((v, i) => (
							<BaseSlider.Thumb index={i} key={v} />
						))}
					</>
				)}
			</BaseSlider.Track>
		) : (
			<BaseSlider.Track>
				<BaseSlider.Fill />
				<BaseSlider.Thumb />
			</BaseSlider.Track>
		);

	return (
		<BaseSlider {...rest}>
			<Label>{label}</Label>
			<BaseSlider.Output />
			{content}
		</BaseSlider>
	);
};

const Slider = Object.assign(SliderImpl, {
	displayName: "Slider",
	Fill: BaseSlider.Fill,
	Thumb: BaseSlider.Thumb,
	Track: BaseSlider.Track,
});

export { Slider };
