import { Table as BaseTable, type TableRootProps } from "@heroui/react";
import type React from "react";

const TableRoot = BaseTable;

interface TableProps extends TableRootProps {}

const TableImpl: React.FC<TableProps> = (props) => {
	return (
		<TableRoot {...props}>
			<TableRoot.ScrollContainer>{props.children}</TableRoot.ScrollContainer>
		</TableRoot>
	);
};

const Table = Object.assign(TableImpl, {
	Body: TableRoot.Body,
	Cell: TableRoot.Cell,
	Collection: TableRoot.Collection,
	Column: TableRoot.Column,
	Content: TableRoot.Content,
	displayName: "Table",
	Footer: TableRoot.Footer,
	Header: TableRoot.Header,
	LoadMore: TableRoot.LoadMore,
	LoadMoreContent: TableRoot.LoadMoreContent,
	Row: TableRoot.Row,
});

export { Table };
