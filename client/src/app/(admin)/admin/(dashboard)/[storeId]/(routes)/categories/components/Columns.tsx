"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type CategoryColumn = {
  id: number;
  name: string;
  description: string;
  updatedAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Billboard",
    cell: ({ row }) => row?.original?.description
  },
  {
    accessorKey: "updatedAt",
    header: "Date"
  },
  {
    id: 'action',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
