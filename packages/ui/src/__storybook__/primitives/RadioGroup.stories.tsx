import { RadioGroup } from "@/components";
import { type Meta, type StoryObj } from "@storybook/react-vite";

const meta = {
	component: RadioGroup,
	title: "primitives/RadioGroup",
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: "basic",
		description: "Choose the plan that suits you best",
		items: [
			{
				description: "Includes 100 messages per month",
				label: "Basic Plan",
				value: "basic",
			},
			{
				description: "Includes 200 messages per month",
				label: "Premium Plan",
				value: "premium",
			},
			{
				description: "Unlimited messages",
				label: "Business Plan",
				value: "business",
			},
		],
		label: "Plan selection",
	},
};
