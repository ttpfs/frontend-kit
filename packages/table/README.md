# @ttpfs/table-react

> Version: **0.1.3**

Thư viện data table cho React, xây dựng trên [TanStack Table v8](https://tanstack.com/table) và `@ttpfs/ui-react`.

## Cài đặt

```bash
pnpm add @ttpfs/table-react
```

## Peer Dependencies

| Package | Version |
|---|---|
| `react` | `^19` |
| `react-dom` | `^19` |

## Dependencies

Package này yêu cầu `@ttpfs/ui-react` được cài đặt (tự động kéo theo khi cài package này).

## Setup

```tsx
import { DataTable, useDataTable } from "@ttpfs/table-react";

const columns = [
  { accessorKey: "name", header: "Tên" },
  { accessorKey: "email", header: "Email" },
];

export function MyTable({ data }) {

  return <DataTable data={data} columns={columns} />;
}
```

## Components

| Component | Mô tả |
|---|---|
| `DataTable` | Bảng dữ liệu đầy đủ tính năng |
| `InfinityDataTable` | Bảng với infinite scroll |
| `DataTableViewOptions` | Dropdown ẩn/hiện cột |
| `SortableColumnHeader` | Header cột hỗ trợ sắp xếp |

## Hooks

| Hook | Mô tả |
|---|---|
| `useDataTable` | Khởi tạo và quản lý state của table |

## Tính năng

- Sắp xếp theo cột (sorting)
- Ẩn/hiện cột (column visibility)
- Phân trang (pagination)
- Infinite scroll
- Lưu trạng thái cột vào localStorage
- Row context thông qua `DataTableRowContext`
