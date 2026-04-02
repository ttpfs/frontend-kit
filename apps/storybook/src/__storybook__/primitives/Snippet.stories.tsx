import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Snippet } from "@ttpfs/ui-react";

const meta = {
	component: Snippet,
	title: "primitives/Snippet",
} satisfies Meta<typeof Snippet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "npm install @ttpfs/ui-react",
	},
};
