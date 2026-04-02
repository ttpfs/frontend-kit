import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Spinner } from "@ttpfs/ui-react";

const meta = {
	component: Spinner,
	title: "primitives/Spinner",
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
