import { type SortingState } from "@tanstack/react-table";
import { type SortDescriptor } from "@ttpfs/ui-react";

export function toSortDescriptor(
	sorting: SortingState,
): SortDescriptor | undefined {
	const first = sorting[0];
	if (!first) return undefined;
	return {
		column: first.id,
		direction: first.desc ? "descending" : "ascending",
	};
}
// Convert React Aria SortDescriptor → TanStack SortingState
export function toSortingState(descriptor: SortDescriptor): SortingState {
	return [
		{
			desc: descriptor.direction === "descending",
			id: descriptor.column as string,
		},
	];
}
