import { TextArea } from "@/components";
import { type Meta, type StoryObj } from "@storybook/react-vite";

const meta = {
	component: TextArea,
	parameters: {
		layout: "padded",
	},
	title: "primitives/TextArea",
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
