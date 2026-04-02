import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Kbd } from "@ttpfs/ui-react";

const meta = {
	component: Kbd,
	title: "primitives/Kbd",
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		keys: ["ctrl", "shift"],
		shortcut: "S",
		variant: "default",
	},
};

export const Light: Story = {
	args: {
		keys: ["ctrl"],
		shortcut: "D",
		variant: "light",
	},
};
