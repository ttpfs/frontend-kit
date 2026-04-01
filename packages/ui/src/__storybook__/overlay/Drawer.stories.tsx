import { Button, Drawer } from "@/components";
import { type Meta, type StoryObj } from "@storybook/react-vite";

const meta = {
	component: Drawer,
	title: "overlay/Drawer",
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		body: (
			<p>
				This is a bottom drawer built with React Aria's Modal component. It
				slides up from the bottom of the screen with a smooth CSS transition.
			</p>
		),
		className: {
			container: "w-3xl",
		},
		description: "This is a description",
		footer: (
			<>
				<Button slot="close" variant="secondary">
					Cancel
				</Button>
				<Button slot="close">Done</Button>
			</>
		),
		placement: "right",
		showClose: true,
		showHandle: true,
		title: "Drawer Title",
		trigger: <Button>Open Drawer</Button>,
		variant: "blur",
	},
};
