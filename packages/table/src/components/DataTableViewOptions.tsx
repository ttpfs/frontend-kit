import { type Table } from "@tanstack/react-table";
import {
	Button,
	Checkbox,
	Description,
	Icon,
	Label,
	Popover,
	useIsMobile,
} from "@ttpfs/ui-react";

export function DataTableViewOptions<TData>({
	table,
}: {
	table: Table<TData>;
}) {
	const isMobile = useIsMobile();

	return (
		<Popover>
			<Button
				className="text-neutral-700 dark:text-neutral-300"
				isIconOnly={isMobile}
				size="sm"
				variant="secondary"
			>
				<Icon className="text-neutral-700 dark:text-neutral-300" name="eye" />
				<span className="max-sm:hidden ">Hiển thị</span>
			</Button>
			<Popover.Content>
				<Popover.Dialog>
					<Popover.Heading>Cột</Popover.Heading>
					<ul className="flex flex-col">
						{table
							.getAllColumns()
							.filter(
								(column) =>
									typeof column.accessorFn !== "undefined" &&
									column.getCanHide(),
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
											<Checkbox.Control>
												<Checkbox.Indicator />
											</Checkbox.Control>
											<Checkbox.Content>
												<Label htmlFor={column.id}>
													{column.columnDef.meta?.label || column.id}
												</Label>
												{column.columnDef.meta?.description && (
													<Description>
														{column.columnDef.meta?.description}
													</Description>
												)}
											</Checkbox.Content>
										</Checkbox>
									</div>
								);
							})}
					</ul>
				</Popover.Dialog>
			</Popover.Content>
		</Popover>
	);
}
