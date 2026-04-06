# @ttpfs/table-react

> Version: **0.2.4**

A React data table library built on top of TanStack Table v8 and `@ttpfs/ui-react`.

## Installation

```bash
pnpm add @ttpfs/table-react
```

## Peer Dependencies

| Package     | Version |
| ----------- | ------- |
| `react`     | `^19`   |
| `react-dom` | `^19`   |

## Dependencies

This package requires `@ttpfs/ui-react` (installed automatically as a dependency).

## Setup

Import the table styles after the UI library styles to ensure proper overrides:

```css
@import "@ttpfs/ui-react/styles.css";
@import "@ttpfs/table-react/styles.css";
```

```tsx
import { DataTable, useDataTable, createColumnHelper } from "@ttpfs/table-react";

const columnHelper = createColumnHelper<User>();
const columns = [
	columnHelper.accessor("name", { header: "Name", meta: { label: "Tên" } }),
	columnHelper.accessor("role", { header: "Role", meta: { label: "Vai trò" } }),
	columnHelper.accessor("status", {
		cell: (info) => (
			<Chip color={statusColorMap[info.getValue()]} size="sm" variant="soft">
				{info.getValue()}
			</Chip>
		),
		header: "Status",
		meta: { label: "Trạng thái" },
	}),
	columnHelper.accessor("email", { header: "Email", meta: { label: "Email" } }),
];

export function MyTable({ data }) {
  return <DataTable data={data} columns={columns} />;
}
```

## Components

| Component              | Description                       |
| ---------------------- | --------------------------------- |
| `DataTable`            | Fully-featured data table         |
| `InfinityDataTable`    | Table with infinite scrolling     |
| `DataTableViewOptions` | Column visibility toggle dropdown |
| `SortableColumnHeader` | Sortable column header            |

## Features

* Column sorting
* Column visibility control
* Pagination
* Infinite scrolling
* Column state persistence via `localStorage`
* Row-level context via `DataTableRowContext`
