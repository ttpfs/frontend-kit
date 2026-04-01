import { type Meta, type StoryObj } from "@storybook/react-vite";
import { Button, Collapsible } from "@ttpfs/ui-react";

const meta = {
	component: Collapsible,
	title: "layout/Collapsible",
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		return (
			<div className="w-full max-w-md text-center">
				<Collapsible {...args}>
					<Collapsible.Heading>
						<Button slot="trigger" variant="ghost">
							Preview HeroUI Native
							<Collapsible.Indicator />
						</Button>
					</Collapsible.Heading>
					<div className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
						<span className="text-muted-foreground">Status</span>
						<span className="font-medium">Shipped</span>
					</div>
					<Collapsible.Content>
						<Collapsible.Body>
							<div className="rounded-md border px-4 py-2 text-sm">
								<p className="font-medium">Shipping address</p>
								<p className="text-muted-foreground">
									100 Market St, San Francisco
								</p>
							</div>
							<div className="rounded-md border px-4 py-2 text-sm">
								<p className="font-medium">Items</p>
								<p className="text-muted-foreground">2x Studio Headphones</p>
							</div>
						</Collapsible.Body>
					</Collapsible.Content>
				</Collapsible>
			</div>
		);
	},
};
