import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Button, Tooltip } from "@ttpfs/ui-react";

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
				<Tooltip.Content offset={12} showArrow>
					<p>Custom offset from trigger</p>
				</Tooltip.Content>
			</>
		),
	},
};
