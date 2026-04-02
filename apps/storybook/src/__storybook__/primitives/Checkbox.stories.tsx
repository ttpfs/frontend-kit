import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Checkbox, Description, Icon, Label } from "@ttpfs/ui-react";

const meta = {
	component: Checkbox,
	title: "primitives/Checkbox",
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
	args: {
		icon: <Icon name="heart" variant="bold" />,
	},
};

export const WithLabel: Story = {
	args: {
		icon: <Icon name="heart" variant="bold" />,
	},
	render: (args) => (
		<Checkbox {...args} icon={<Icon name="heart" variant="bold" />}>
			<Label>Heart</Label>
		</Checkbox>
	),
};

export const WithDescription: Story = {
	args: {
		icon: <Icon name="heart" variant="bold" />,
	},
	render: (args) => (
		<Checkbox {...args} icon={<Icon name="heart" variant="bold" />}>
			<Label>Email notifications</Label>
			<Description>
				Get notified when someone mentions you in a comment
			</Description>
		</Checkbox>
	),
};
