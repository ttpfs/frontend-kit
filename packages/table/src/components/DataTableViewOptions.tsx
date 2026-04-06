import { type Table } from "@tanstack/react-table";
import { Button, Checkbox, Icon, Label, Popover } from "@ttpfs/ui-react";

export function DataTableViewOptions<TData>({
	table,
}: {
	table: Table<TData>;
}) {
	return (
		<Popover>
			<Popover.Trigger>
				<Button
					className="text-neutral-700 dark:text-neutral-300"
					size="sm"
					variant="secondary"
				>
					<Icon className="text-neutral-700 dark:text-neutral-300" name="eye" />
					<span className="max-sm:hidden ">Hiển thị</span>
				</Button>
			</Popover.Trigger>
			<Popover.Content className="p-3!" heading="Cột">
				<ul className="flex flex-col">
					{table
						.getAllColumns()
						.filter(
							(column) =>
								typeof column.accessorFn !== "undefined" && column.getCanHide(),
						)
						.map((column) => {
							return (
								<div className="flex py-1 items-center" key={column.id}>
									<Checkbox
										className={"gap-1.5"}
										isSelected={column.getIsVisible()}
										name={column.id}
										onChange={() => column.toggleVisibility()}
									>
										<Label htmlFor={column.id}>
											{column.columnDef.meta?.label || column.id}
										</Label>
									</Checkbox>
								</div>
							);
						})}
				</ul>
			</Popover.Content>
		</Popover>
	);
}
