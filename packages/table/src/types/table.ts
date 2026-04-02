import { type RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		label?: string;
	}
}

import {
	type ColumnDef,
	type PaginationState,
	type RowSelectionState,
	type SortingState,
} from "@tanstack/react-table";
import { type Selection } from "@ttpfs/ui-react";

type RowActionItem = {
	label: string;
	icon?: React.ReactNode;
	className?: string;
	isVisible?: boolean;
	// onClick nhận row type T
	onClick?: () => void;
	// optional custom render, có row
	render?: (item: RowActionItem) => React.ReactNode;
};

interface DataTableTanstackProps<TData, TValue = TData> {
	tableId: string;
	data: TData[];
	columns: ColumnDef<TData, TValue>[];
	totalElements: number;
	totalPages?: number;

	selectionMode?: "multiple" | "single"; // default 'multiple'

	// State
	pagination?: PaginationState;
	sorting?: SortingState;
	rowSelection?: RowSelectionState;
	onSortingChange?: React.Dispatch<React.SetStateAction<SortingState>>;
	onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>;
	onRowSelectionChange?: React.Dispatch<
		React.SetStateAction<RowSelectionState>
	>;
	selectedKeys?: Selection;
	onSelectionChange?: React.Dispatch<React.SetStateAction<Selection>>;

	enableViewOptions?: boolean;
	enableRowSelection?: boolean;
	enableExpanding?: boolean; // for group row

	// For Custom empty state fallback
	emptyState?: React.ReactNode;

	getSubRows?:
		| ((originalRow: TData, index: number) => TData[] | undefined)
		| undefined;
}

export type { DataTableTanstackProps, RowActionItem };
