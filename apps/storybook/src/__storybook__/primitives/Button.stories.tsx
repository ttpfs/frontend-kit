import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Button, Icon } from "@ttpfs/ui-react";
import { fn } from "storybook/test";

const meta = {
	args: {
		onClick: fn(),
	},
	component: Button,
	title: "primitives/Button",
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Click me",
		size: "md",
		variant: "primary",
	},
};

export const Loading: Story = {
	args: {
		children: "Delete",
		loading: true,
		variant: "primary",
	},
};

export const CustomLoading: Story = {
	args: {
		children: "Delete",
		loading: true,
		loadingIcon: <Icon name="spinner-dots" />,
		loadingLabel: "Custom Loading...",
		variant: "primary",
	},
};

export const WithIcon: Story = {
	args: {
		children: "Global",
		icon: <Icon name="global" />,
		size: "md",
		variant: "primary",
	},
};

export const Danger: Story = {
	args: {
		children: "Delete",
		icon: <Icon name="trash" />,
		size: "md",
		variant: "danger",
	},
};

export const IconOnly: Story = {
	args: {
		icon: <Icon name="global" />,
		isIconOnly: true,
		size: "md",
		variant: "primary",
	},
};
