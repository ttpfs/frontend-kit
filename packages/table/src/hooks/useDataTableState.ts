import {
	type ColumnPinningState,
	type OnChangeFn,
	type VisibilityState,
} from "@tanstack/react-table";
import { useLocalStorage } from "./useLocalStorage";

export function useDataTableState(tableId: string) {
	const [_columnPinning, setColumnPinning] = useLocalStorage<
		Record<string, ColumnPinningState>
	>("data-table-column-pinning", {});

	const [_columnVisibility, setColumnVisibility] = useLocalStorage<
		Record<string, VisibilityState>
	>("data-table-visibility", {});

	const columnVisibility = _columnVisibility[tableId] ?? {};

	const columnPinning = _columnPinning[tableId] || {
		left: [],
		right: [],
	};

	const handleVisibilityChange: OnChangeFn<VisibilityState> = (
		updaterOrValue,
	) => {
		setColumnVisibility((prevTableId) => {
			// find column by tableId
			const oldVisibility = prevTableId[tableId] ?? {};

			// update column visible based-tableId.
			const newVisibility =
				typeof updaterOrValue === "function"
					? (updaterOrValue as (old: VisibilityState) => VisibilityState)(
							oldVisibility,
						)
					: updaterOrValue;

			return {
				...prevTableId,
				[tableId]: newVisibility,
			};
		});
	};

	const handleColumnPinningChange: OnChangeFn<ColumnPinningState> = (
		updaterOrValue,
	) => {
		setColumnPinning((prev) => {
			const oldColumnPinning = prev[tableId] ?? {};

			const newColumnPinning =
				typeof updaterOrValue === "function"
					? (updaterOrValue as (old: ColumnPinningState) => ColumnPinningState)(
							oldColumnPinning,
						)
					: updaterOrValue;

			return {
				...prev,
				[tableId]: newColumnPinning,
			};
		});
	};

	return {
		columnPinning,
		columnVisibility,
		handleColumnPinningChange,
		handleVisibilityChange,
	};
}
