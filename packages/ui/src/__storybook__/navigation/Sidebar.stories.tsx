import {
	Collapsible,
	Icon,
	type IconName,
	Separator,
	Sidebar,
} from "@/components";
import { SidebarProvider } from "@/providers";
import type { Meta, StoryObj } from "@storybook/react-vite";

const data = {
	navMain: [
		{
			icon: "close",
			isActive: true,
			items: [
				{
					title: "History",
					url: "#",
				},
				{
					title: "Starred",
					url: "#",
				},
				{
					title: "Settings",
					url: "#",
				},
			],
			title: "Playground",
			url: "#",
		},
		{
			icon: "close",
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
			title: "Models",
			url: "#",
		},
		{
			icon: "close",
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
			title: "Documentation",
			url: "#",
		},
		{
			icon: "close",
			items: [
				{
					title: "General",
					url: "#",
				},
				{
					title: "Team",
					url: "#",
				},
				{
					title: "Billing",
					url: "#",
				},
				{
					title: "Limits",
					url: "#",
				},
			],
			title: "Settings",
			url: "#",
		},
	],
	projects: [
		{
			icon: "close",
			name: "Design Engineering",
			url: "#",
		},
		{
			icon: "close",
			name: "Sales & Marketing",
			url: "#",
		},
		{
			icon: "close",
			name: "Travel",
			url: "#",
		},
	],
	teams: [
		{
			logo: "close",
			name: "Acme Inc",
			plan: "Enterprise",
		},
		{
			logo: "close",
			name: "Acme Corp.",
			plan: "Startup",
		},
		{
			logo: "close",
			name: "Evil Corp.",
			plan: "Free",
		},
	],
	user: {
		avatar: "/avatars/shadcn.jpg",
		email: "m@example.com",
		name: "shadcn",
	},
};

const meta = {
	component: Sidebar,
	decorators: [
		(Story) => {
			return (
				<SidebarProvider>
					<Story />
				</SidebarProvider>
			);
		},
	],
	title: "navigation/Sidebar",
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		return (
			<>
				<Sidebar collapsible="icon" {...args}>
					<Sidebar.Header>
						{/* <TeamSwitcher teams={data.teams} /> */}
					</Sidebar.Header>
					<Sidebar.Content>
						<NavMain items={data.navMain} />
						{/* <NavProjects projects={data.projects} /> */}
					</Sidebar.Content>
					<Sidebar.Footer>{/* <NavUser user={data.user} /> */}</Sidebar.Footer>
					<Sidebar.Rail />
				</Sidebar>
				<Sidebar.Inset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<Sidebar.Trigger className="-ml-1" />
							<Separator
								orientation="vertical"
								className="mr-2 data-[orientation=vertical]:h-4"
							/>
						</div>
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
						<div className="grid auto-rows-min gap-4 md:grid-cols-3">
							<div className="aspect-video rounded-xl bg-muted/50" />
							<div className="aspect-video rounded-xl bg-muted/50" />
							<div className="aspect-video rounded-xl bg-muted/50" />
						</div>
						<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
					</div>
				</Sidebar.Inset>
			</>
		);
	},
};

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: IconName;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	return (
		<Sidebar.Group>
			<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
			<Sidebar.Menu>
				{items.map((item) => (
					<Collapsible key={item.title} defaultExpanded={item.isActive}>
						<Sidebar.MenuItem>
							<Collapsible.Heading>
								<Collapsible.Trigger className={"w-full"}>
									<Sidebar.MenuButton tooltip={item.title}>
										{item.icon && <Icon name={item.icon} />}
										<span>{item.title}</span>
										<Collapsible.Indicator />
									</Sidebar.MenuButton>
								</Collapsible.Trigger>
							</Collapsible.Heading>
							<Collapsible.Content>
								<Sidebar.MenuSub>
									{item.items?.map((subItem) => (
										<Sidebar.MenuSubItem key={subItem.title}>
											<Sidebar.MenuSubButton asChild>
												<a href={subItem.url}>
													<span>{subItem.title}</span>
												</a>
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									))}
								</Sidebar.MenuSub>
							</Collapsible.Content>
						</Sidebar.MenuItem>
					</Collapsible>
				))}
			</Sidebar.Menu>
		</Sidebar.Group>
	);
}
