import { type Meta, type StoryObj } from "@storybook/react-vite";
import {
	createColumnHelper,
	DataTableTanstack,
	type PaginationState,
	type SortingState,
} from "@ttpfs/table-react";
import { Chip } from "@ttpfs/ui-react";
import { useState } from "react";
import { generateUsers, type User } from "@/mock/user";

const meta = {
	component: DataTableTanstack,
	decorators: [
		(Story, context) => {
			const [pagination, setPagination] = useState<PaginationState>({
				pageIndex: 0,
				pageSize: 4,
			});

			const [sorting, setSorting] = useState<SortingState>([]);

			console.log(sorting, pagination);
			return (
				<Story
					{...context}
					args={{
						...context.args,
						onPaginationChange: setPagination,
						onSortingChange: setSorting,
						pagination,
						sorting,
					}}
				/>
			);
		},
	],
	parameters: {
		layout: "padded",
	},
	title: "data/DataTableTanstack",
} satisfies Meta<typeof DataTableTanstack>;

export default meta;

type Story = StoryObj<typeof meta>;

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
	Active: "success",
	Inactive: "danger",
	"On Leave": "warning",
};

// --- TanStack Column Definitions ------------------------------------------
const columnHelper = createColumnHelper<User>();
const columns = [
	columnHelper.accessor("name", { header: "Name", meta: { label: "Tên" } }),
	columnHelper.accessor("role", { header: "Role", meta: { label: "Vai trò" } }),
	columnHelper.accessor("status", {
		cell: (info) => (
			<Chip color={statusColorMap[info.getValue()]} size="sm" variant="soft">
				{info.getValue()}
			</Chip>
		),
		header: "Status",
		meta: { label: "Trạng thái" },
	}),
	columnHelper.accessor("email", { header: "Email", meta: { label: "Email" } }),
];

const users = generateUsers(84);

export const Default: Story = {
	args: {
		columns,
		data: users,
		tableId: "user",
		totalElements: users.length,
	},
};
