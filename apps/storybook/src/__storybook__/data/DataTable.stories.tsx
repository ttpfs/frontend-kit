import { generateUsers, type User } from "@/mock/user";
import { type Meta, type StoryObj } from "@storybook/react-vite";
import {
	createColumnHelper,
	DataTable,
	type PaginationState,
	type SortingState,
} from "@ttpfs/table-react";
import { Chip, type Selection } from "@ttpfs/ui-react";
import { useState } from "react";

const meta = {
	component: DataTable,
	decorators: [
		(Story, context) => {
			const [pagination, setPagination] = useState<PaginationState>({
				pageIndex: 0,
				pageSize: 4,
			});
			const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

			const [sorting, setSorting] = useState<SortingState>([]);

			return (
				<Story
					{...context}
					args={{
						...context.args,
						onPaginationChange: setPagination,
						onSelectionChange: setSelectedKeys,
						onSortingChange: setSorting,
						pagination,
						selectedKeys,
						sorting,
					}}
				/>
			);
		},
	],
	parameters: {
		layout: "padded",
	},
	title: "data/DataTable",
} satisfies Meta<typeof DataTable>;

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
		enableRowSelection: true,
		tableId: "user",
		totalElements: users.length,
	},
};
