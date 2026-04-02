import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Pagination } from "@ttpfs/ui-react";

const meta = {
	component: Pagination,
	title: "navigation/Pagination",
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		page: 1,
		totalPages: 12,
	},
};
