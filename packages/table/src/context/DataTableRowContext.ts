import { createContext, useContext } from "react";

export type Action = unknown;

export interface DataTableContextValue<
	TRow extends object,
	TAction extends Action = Action,
> {
	row: TRow | null;
	actions: {
		value: TAction | null;
		setRow: (row: TRow, action: TAction) => void;
		clearRow: () => void;
	};
}

export const DataTableContext =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	createContext<DataTableContextValue<any, any> | null>(null);

export function useDataTableRow<
	TRow extends object,
	TAction extends Action = Action,
>() {
	const context = useContext(DataTableContext);

	if (!context) {
		throw new Error(
			"useDataTableRow is required a DataTableProvider and wrap your layout or component in it",
		);
	}

	return context as DataTableContextValue<TRow, TAction>;
}
