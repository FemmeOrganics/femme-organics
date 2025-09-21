"use client"

import type { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import type { GetProductQuery } from "@/__gql__/graphql";


export const columns: ColumnDef<GetProductQuery["product"]>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived"
  },
  {
    accessorKey: "isFeatured",
    header: "Featured"
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "category",
    header: "Category"
  },
  {
    accessorKey: "sizes",
    header: "Size",
    cell: ({ row }) => <div className="flex items-center gap-x-2">
      {JSON.stringify(row.original.sizes?.map(c => `${c?.name}:${c?.value}@${c.price}`).join(", "))}
    </div>
  },
  {
    accessorKey: "colors",
    header: "Color",
    cell: ({ row }) => <div className="flex items-center gap-x-2">
      {JSON.stringify(row.original.colors?.map(c => c?.name).join(", "))}
    </div>
  },
  {
    accessorKey: "updatedAt",
    header: "Date",
  }, 
  {
    id: 'action',
    cell: ({row}) => <CellAction data={row.original}/>
  }
]



export type ProductColumn2 = {
  id: number;
  name: string;
  price: string;
} 

export const columns2: ColumnDef<ProductColumn2>[] = [
  {
    id: 'action',
    cell: ({row}) => <CellAction data={row.original}/>
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => {
      return <div className="max-w-80 line-clamp-2">{row.original.name}</div>
    }
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({row}) => {
      return <div className="max-w-80 line-clamp-2">{row.original.price}</div>
    }
  }
]
