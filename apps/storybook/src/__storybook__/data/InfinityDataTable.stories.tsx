import { type Meta, type StoryObj } from "@storybook/react-vite";
import {
	createColumnHelper,
	InfinityDataTable,
	type SortingState,
} from "@ttpfs/table-react";
import { Chip, type Selection } from "@ttpfs/ui-react";
import { useCallback, useRef, useState } from "react";
import { generateUsers, type User } from "@/mock/user";

const ITEMS_PER_PAGE = 6;

const allUsers = generateUsers(80);

const meta = {
	component: InfinityDataTable,
	decorators: [
		(Story, context) => {
			const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

			const [sorting, setSorting] = useState<SortingState>([]);

			const [items, setItems] = useState<User[]>(() =>
				allUsers.slice(0, ITEMS_PER_PAGE),
			);
			const [isLoading, setIsLoading] = useState(false);
			const isLoadingRef = useRef(false);
			const hasMore = items.length < allUsers.length;

			const loadMore = useCallback(() => {
				if (!hasMore || isLoadingRef.current) return;
				isLoadingRef.current = true;
				setIsLoading(true);
				setTimeout(() => {
					setItems((prev) => allUsers.slice(0, prev.length + ITEMS_PER_PAGE));
					setIsLoading(false);
					requestAnimationFrame(() => {
						isLoadingRef.current = false;
					});
				}, 300);
			}, [hasMore]);

			return (
				<Story
					{...context}
					args={{
						...context.args,
						data: items,
						isFetching: isLoading,
						onLoadMore: loadMore,
						onSelectionChange: setSelectedKeys,
						onSortingChange: setSorting,
						selectedKeys,
						sorting,
						totalElements: allUsers.length,
					}}
				/>
			);
		},
	],
	parameters: {
		layout: "padded",
	},
	title: "data/InfinityDataTable",
} satisfies Meta<typeof InfinityDataTable>;

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

export const Default: Story = {
	args: {
		columns,
		enableRowSelection: true,
		tableId: "user",
	},
};
