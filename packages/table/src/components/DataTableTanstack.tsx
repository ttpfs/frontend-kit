import {
	type ExpandedState,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	EmptyState,
	Icon,
	Label,
	ListBox,
	Pagination,
	Select,
	Table,
} from "@ttpfs/ui-react";
import { useMemo, useState } from "react";
import { type DataTableTanstackProps } from "@/types";
import { toSortDescriptor, toSortingState } from "@/utils";
import { useDataTable } from "../hooks";
import { SortableColumnHeader } from "./column";
import { DataTableViewOptions } from "./DataTableViewOptions";

const PAGE_LIMIT_OPTIONS = [10, 20, 30, 50, 100];

export const DataTableTanstack = <TData, TValue>(
	props: DataTableTanstackProps<TData, TValue>,
) => {
	const [expanded, setExpanded] = useState<ExpandedState>({});

	const {
		columns = [],
		data = [],
		tableId,
		enableRowSelection = true,
		onRowSelectionChange,
		selectionMode,
		rowSelection = {},
		onPaginationChange,
		onSortingChange,
		enableExpanding,
		onSelectionChange,
		selectedKeys = new Set(),
		sorting = [],
		totalElements,
		totalPages,
		emptyState,
		enableViewOptions = true,
		getSubRows,
		pagination = {
			pageIndex: 0,
			pageSize: 20,
		},
	} = props;

	const [_sorting, setSorting] = useState<SortingState>(sorting ?? []);

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
		enableExpanding,
		enableRowSelection,
		enableSorting: true,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getSubRows,
		onColumnPinningChange: handleColumnPinningChange,
		onColumnVisibilityChange: handleVisibilityChange,
		onExpandedChange: setExpanded,
		onPaginationChange,
		onRowSelectionChange,
		onSortingChange: (prev) => {
			setSorting(prev);
			onSortingChange?.(prev);
		},
		pageCount: totalPages ? totalPages : undefined,
		rowCount: totalElements,
		state: {
			columnPinning,
			columnVisibility,
			expanded,
			pagination,
			rowSelection,
			sorting: _sorting,
		},
	});

	const sortDescriptor = useMemo(() => toSortDescriptor(_sorting), [_sorting]);

	return (
		<div className="grid">
			{enableViewOptions && (
				<div className="mb-3 ml-auto">
					<DataTableViewOptions table={table} />
				</div>
			)}
			<Table>
				<Table.Content
					aria-label="Data TanStack Table"
					className="w-full"
					onSelectionChange={onSelectionChange}
					onSortChange={(d) => table.setSorting(toSortingState(d))}
					selectedKeys={selectedKeys}
					selectionMode={selectionMode}
					sortDescriptor={sortDescriptor}
				>
					<Table.Header>
						{table.getHeaderGroups()[0]?.headers.map((header) => (
							<Table.Column
								allowsSorting={header.column.getCanSort()}
								id={header.id}
								isRowHeader={header.id === "id"}
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
						{table.getRowModel().rows.map((row) => (
							<Table.Row id={row.id} key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<Table.Cell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				</Table.Content>
				<Table.Footer className="items-start sm:items-center ">
					<Pagination
						className={{
							item: "hidden sm:block",
							summary: "hidden sm:block",
						}}
						onPageChange={(p) => table.setPageIndex(p - 1)}
						page={table.getState().pagination.pageIndex + 1}
						showEllipsis
						summary={
							<>
								{table.getState().pagination.pageIndex + 1} đến{" "}
								{table.getPageCount()} từ {totalElements} kết quả
							</>
						}
						totalPages={table.getPageCount()}
					/>
					<Select
						aria-label="Page size option"
						className={"w-[104px]! ml-1.5"}
						defaultValue={table.getState().pagination.pageSize.toString()}
						onChange={(value) => {
							table.setPageSize(Number(value));
							table.setPageIndex(0);
						}}
						placeholder={`${table.getState().pagination.pageSize} / trang`}
						value={table.getState().pagination.pageSize.toString()}
					>
						<Select.Trigger
							className={
								"w-[104px]! px-2 py-1.5 text-sm text-muted flex items-center"
							}
						>
							<Select.Value>
								{({ defaultChildren, selectedText, isPlaceholder, state }) => {
									if (isPlaceholder || state.selectedItems.length === 0) {
										return defaultChildren;
									}

									return (
										<div className="flex text-sm items-center gap-2">
											{selectedText} / trang
										</div>
									);
								}}
							</Select.Value>
							<Select.Indicator />
						</Select.Trigger>
						<Select.Popover>
							<ListBox>
								{PAGE_LIMIT_OPTIONS.map((pageSize) => (
									<ListBox.Item
										id={pageSize.toString()}
										key={pageSize.toString()}
										textValue={pageSize.toString()}
									>
										<Label className="text-sm text-muted">{pageSize}</Label>
										<ListBox.ItemIndicator />
									</ListBox.Item>
								))}
							</ListBox>
						</Select.Popover>
					</Select>
				</Table.Footer>
			</Table>
		</div>
	);
};
