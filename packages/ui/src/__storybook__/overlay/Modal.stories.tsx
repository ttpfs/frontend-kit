import { Button, Icon, Modal } from "@/components";
import { type Meta, type StoryObj } from "@storybook/react-vite";

const meta = {
	component: Modal,
	title: "overlay/Modal",
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		body: (
			<p>
				A beautiful, fast, and modern React UI library for building accessible
				and customizable web applications with ease.
			</p>
		),
		footer: (
			<Button className="w-full" slot="close">
				Continue
			</Button>
		),
		icon: <Icon name="info" />,
		title: "Welcome to HeroUI",
		trigger: <Button variant="secondary">Open Modal</Button>,
	},
};
