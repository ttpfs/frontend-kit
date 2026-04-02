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

interface DataTableProps<TData, TValue = TData> {
	tableId: string;
	data: TData[];
	columns: ColumnDef<TData, TValue>[];
	totalElements: number;
	totalPages?: number;

	selectionMode?: "multiple" | "single"; // default 'multiple'

	// State
	pagination?: PaginationState;
	sorting?: SortingState;
	onSortingChange?: React.Dispatch<React.SetStateAction<SortingState>>;
	onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>;
	selectedKeys?: Selection;
	onSelectionChange?: React.Dispatch<React.SetStateAction<Selection>>;

	enableViewOptions?: boolean;
	enableSelection?: boolean;
	enableExpanding?: boolean; // for group row

	// For Custom empty state fallback
	emptyState?: React.ReactNode;

	getSubRows?:
		| ((originalRow: TData, index: number) => TData[] | undefined)
		| undefined;
}

interface InfinityDataTableProps<TData, TValue = TData> {
	tableId: string;
	data: TData[];
	columns: ColumnDef<TData, TValue>[];
	totalElements: number;
	totalPages?: number;

	selectionMode?: "multiple" | "single"; // default 'multiple'

	// State
	sorting?: SortingState;
	onSortingChange?: React.Dispatch<React.SetStateAction<SortingState>>;
	selectedKeys?: Selection;
	onSelectionChange?: React.Dispatch<React.SetStateAction<Selection>>;

	enableViewOptions?: boolean;
	enableSelection?: boolean;

	// For Custom empty state fallback
	emptyState?: React.ReactNode;

	isFetching: boolean;
	onLoadMore: () => Promise<void> | void;
}

export type { DataTableProps, InfinityDataTableProps, RowActionItem };
