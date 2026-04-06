import { type Preview } from "@storybook/react-vite";
import { ThemeProvider, ThemeSwitcher } from "@ttpfs/ui-react";
import "./storybook.css";

const preview: Preview = {
	decorators: [
		(Story) => {
			return (
				<ThemeProvider>
					<div className="flex flex-col w-full h-full">
						<ThemeSwitcher />
						<div className="mx-auto my-auto">
							<Story />
						</div>
					</div>
				</ThemeProvider>
			);
		},
	],
	parameters: {
		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		layout: "padded",
	},
	tags: ["autodocs"],
};

export default preview;
