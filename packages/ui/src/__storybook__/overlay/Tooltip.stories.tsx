import { Button, Tooltip } from "@/components";
import { type Meta, type StoryObj } from "@storybook/react-vite";

const meta = {
	component: Tooltip,
	title: "overlay/Tooltip",
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<Button variant="primary">Custom Offset</Button>
				<Tooltip.Content showArrow offset={12}>
					<p>Custom offset from trigger</p>
				</Tooltip.Content>
			</>
		),
	},
};
