"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"

export type SizeColumn = {
  id: number
  name: string
  value: string
  updatedAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
