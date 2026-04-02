import { type PropsWithChildren, useCallback, useMemo, useState } from "react";
import {
	type Action,
	DataTableContext,
	type DataTableContextValue,
} from "../context";

type Props = PropsWithChildren & {};

export const DataTableProvider = <TRow extends object, TAction extends Action>(
	props: Props,
) => {
	const { children } = props;

	const [row, _setRow] = useState<TRow | null>(null);

	const [action, setAction] = useState<TAction | null>(null);

	const setRow = useCallback((row: TRow, action: TAction) => {
		_setRow(row);
		setAction(action);
	}, []);

	const clearRow = useCallback(() => {
		_setRow(null);
		setAction(null);
	}, []);

	const value = useMemo<DataTableContextValue<TRow, TAction>>(
		() => ({
			actions: {
				clearRow,
				setRow,
				value: action,
			},
			row,
		}),
		[action, clearRow, setRow, row],
	);

	return (
		<DataTableContext.Provider value={value}>
			{children}
		</DataTableContext.Provider>
	);
};
