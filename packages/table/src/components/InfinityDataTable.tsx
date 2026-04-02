import {
	type ExpandedState,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Checkbox, EmptyState, Icon, Spinner, Table } from "@ttpfs/ui-react";
import { useMemo, useState } from "react";
import { type InfinityDataTableProps } from "@/types";
import { toSortDescriptor, toSortingState } from "@/utils";
import { useDataTable } from "../hooks";
import { SortableColumnHeader } from "./column";
import { DataTableViewOptions } from "./DataTableViewOptions";

export const InfinityDataTable = <TData, TValue>(
	props: InfinityDataTableProps<TData, TValue>,
) => {
	const [expanded, setExpanded] = useState<ExpandedState>({});

	const {
		columns = [],
		data = [],
		tableId,
		enableSelection = true,
		selectionMode = "multiple",
		onSortingChange,
		onSelectionChange,
		selectedKeys = new Set(),
		sorting = [],
		totalElements,
		totalPages,
		isFetching,
		onLoadMore,
		emptyState,
		enableViewOptions = true,
	} = props;

	const {
		handleVisibilityChange,
		columnVisibility,
		columnPinning,
		handleColumnPinningChange,
	} = useDataTable(tableId);

	const table = useReactTable({
		columns,
		data,
		defaultColumn: {
			size: 150,
		},
		enableRowSelection: enableSelection,
		enableSorting: true,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualPagination: true,
		onColumnPinningChange: handleColumnPinningChange,
		onColumnVisibilityChange: handleVisibilityChange,
		onExpandedChange: setExpanded,
		onSortingChange,
		pageCount: totalPages ? totalPages : undefined,
		rowCount: totalElements,
		state: {
			columnPinning,
			columnVisibility,
			expanded,
			sorting: sorting,
		},
	});

	const hasMore = data.length < totalElements;

	const sortDescriptor = useMemo(() => toSortDescriptor(sorting), [sorting]);

	return (
		<div className="grid">
			{enableViewOptions && (
				<div className="mb-3 ml-auto">
					<DataTableViewOptions table={table} />
				</div>
			)}
			<Table>
				<Table.ScrollContainer className="h-96 overflow-y-auto">
					<Table.Content
						aria-label="Data TanStack Table"
						className="w-full"
						onSelectionChange={onSelectionChange}
						onSortChange={(d) => table.setSorting(toSortingState(d))}
						selectedKeys={selectedKeys}
						selectionMode={selectionMode}
						sortDescriptor={sortDescriptor}
					>
						<Table.Header className="sticky top-0 z-10 bg-surface-secondary">
							{enableSelection && (
								<Table.Column className="pr-0">
									<Checkbox aria-label="Select all" slot="selection" />
								</Table.Column>
							)}
							{table.getHeaderGroups()[0]?.headers.map((header) => (
								<Table.Column
									allowsSorting={header.column.getCanSort()}
									id={header.id}
									isRowHeader={header.id === "id" || header.index === 0}
									key={header.id}
								>
									{({ sortDirection }) => (
										<SortableColumnHeader sortDirection={sortDirection}>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</SortableColumnHeader>
									)}
								</Table.Column>
							))}
						</Table.Header>
						<Table.Body
							renderEmptyState={() =>
								emptyState ? (
									emptyState
								) : (
									<EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
										<Icon className="text-muted" name="tray" />
										<span className="text-sm text-muted">No results found</span>
									</EmptyState>
								)
							}
						>
							<Table.Collection items={table.getRowModel().rows}>
								{(row) => (
									<Table.Row
										data-state={row.getIsSelected() && "selected"}
										id={row.id}
										key={row.id}
									>
										{enableSelection && (
											<Table.Cell className="pr-0">
												<Checkbox
													aria-label={`Select ${row.id}`}
													slot="selection"
													variant="secondary"
												/>
											</Table.Cell>
										)}
										{row.getVisibleCells().map((cell) => (
											<Table.Cell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</Table.Cell>
										))}
									</Table.Row>
								)}
							</Table.Collection>
							{!!hasMore && (
								<Table.LoadMore
									isLoading={isFetching}
									onLoadMore={onLoadMore}
									scrollOffset={0}
								>
									<Table.LoadMoreContent>
										<Spinner />
									</Table.LoadMoreContent>
								</Table.LoadMore>
							)}
						</Table.Body>
					</Table.Content>
				</Table.ScrollContainer>
			</Table>
		</div>
	);
};
