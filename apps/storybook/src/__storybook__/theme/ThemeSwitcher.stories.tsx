import { type Meta, type StoryObj } from "@storybook/react-vite";
import { ThemeProvider, ThemeSwitcher } from "@ttpfs/ui-react";

const meta = {
	component: ThemeSwitcher,
	decorators: [
		(Story) => {
			return (
				<ThemeProvider attribute={"class"} enableSystem>
					<Story />
				</ThemeProvider>
			);
		},
	],
	title: "theme/ThemeSwitcher",
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
