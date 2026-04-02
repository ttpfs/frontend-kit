import { Icon } from "@ttpfs/ui-react";

export function SortableColumnHeader({
	children,
	sortDirection,
}: {
	children: React.ReactNode;
	sortDirection?: "ascending" | "descending";
}) {
	return (
		<span className="flex items-center justify-between">
			{children}
			{!!sortDirection &&
				(sortDirection === "descending" ? (
					<Icon name="chevron-down" />
				) : (
					<Icon name="chevron-up" />
				))}
		</span>
	);
}
