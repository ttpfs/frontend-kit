import { Description, Icon, Label, Switch } from "@/components";
import { type Meta, type StoryObj } from "@storybook/react-vite";

const meta = {
	component: Switch,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	title: "primitives/Switch",
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
	args: {
		icon: <Icon name="plus" />,
		iconSelected: <Icon name="minus" />,
	},
};

export const WithLabel: Story = {
	args: {
		icon: <Icon name="plus" />,
		iconSelected: <Icon name="minus" />,
	},
	render: (args) => {
		return (
			<Switch {...args}>
				<Label>Public profile</Label>
			</Switch>
		);
	},
};

export const WithDescription: Story = {
	args: {
		icon: <Icon name="plus" />,
		iconSelected: <Icon name="minus" />,
	},
	render: (args) => {
		return (
			<Switch {...args}>
				<Label>Public profile</Label>
				<Description>Allow others to see your profile information</Description>
			</Switch>
		);
	},
};
