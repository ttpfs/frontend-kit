import { Icon, Radio, RadioGroup } from "@/components";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	component: Radio,
	title: "primitives/Radio",
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		description: "Includes 100 messages per month",
		label: "Basic Plan",
		value: "basic",
	},
	render: (args) => {
		return (
			<RadioGroup label="Plan">
				<Radio {...args} />
			</RadioGroup>
		);
	},
};

export const CustomIcon: Story = {
	args: {
		description: "Includes 100 messages per month",
		label: "Basic Plan",
		value: "basic",
	},
	render: (args) => {
		return (
			<RadioGroup label="Plan">
				<Radio
					icon={<Icon className="text-white" size="xs" name="plus" />}
					{...args}
				/>
			</RadioGroup>
		);
	},
};
