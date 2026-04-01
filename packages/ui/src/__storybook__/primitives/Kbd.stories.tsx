import { Kbd } from "@/components";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
