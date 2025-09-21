"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import {  EyeIcon, } from 'lucide-react';
import { Table, TableCell, TableRow } from "@/src/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "@/components/ui/DataTable";
import { DeliveryAddressType, GetOrdersByCustomerQuery,  OrderType } from "@/__gql__/graphql";
import { format } from "date-fns";
import { Button } from "@/src/components/ui/button";
import { usePaymentModal } from "@/src/components/modals/PaymentModal";
import { Popover, PopoverTrigger, PopoverContent} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { getOrderStatusColors, getOrderPaymentStatusColors } from "@/lib/order-status"


export const orderItemsCols: ColumnDef<GetOrdersByCustomerQuery["ordersByCustomer"][0]["orderItems"][0]>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => <div className="line-clamp-1">
      {row.original?.orderProduct.name}
    </div>
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="line-clamp-1">
    {row.original?.price}
  </div>
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div className="line-clamp-1">
    {row.original?.quantity}
  </div>
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    cell: ({ row }) => <div className="line-clamp-1">
    {(row.original?.quantity ?? 0)*( row.original?.price ?? 0)}
  </div>
  }
]


export const Columns: ColumnDef<GetOrdersByCustomerQuery["ordersByCustomer"][0]>[] = [
    {
      accessorKey: "orderNumber",
      header: "Order ID",
    }, 
    {
      accessorKey: "orderAmount",
      header: "Order Amount",
    }, 
    {
      accessorKey: "type",
      header: "Order Type",
    }, 
    {
      accessorKey: "deliveryAmount",
      header: "Delivery Amount",
    }, 
    {
      accessorKey: "amountPaid",
      header: "Amount Paid",
    },
 
  {
    accessorKey: "address",
    header: "Address",
    cell: ({row}) => <div className="address line-clamp-2"> 
    {row.original?.type === OrderType.SelfCollect ? "Collect at our shop" 
      : row.original.deliveryAddress?.type === DeliveryAddressType.PickAndDrop ?row.original?.deliveryAddress?.deliveryZoneLocation?.address 
      : row.original.deliveryAddress?.type === DeliveryAddressType.Custom ? row.original.deliveryAddress?.address : row.original.deliveryAddress?.deliveryPickupMtaani?.locationName }
     </div>
  },

  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({row}) => {
      return <div> {format(new Date(row.original?.createdAt), "MMMM do, yyyy")}</div>
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({row}) => <Payment row={row}/>
  }
]

export const Payment = ({row}: {row: Row<GetOrdersByCustomerQuery["ordersByCustomer"][0]>}) => {
  const paymentModal = usePaymentModal()
  return <div className="flex items-center space-x-2">
   <Popover>
      <PopoverTrigger className='line-clamp-3 animate-pulse duration-5000 ease-linear'>
           <EyeIcon />
      </PopoverTrigger>
      <PopoverContent align="end" className="p-2 w-[420px] h-60 max-h-[450px]">
        <ScrollArea className="h-full flex flex-col space-y-2">
          <Table>
            <TableRow>
              <TableCell className="h-8 p-1">
                  Order Status
              </TableCell>
              <TableCell className="h-8 p-1">
                  <span className={cn(getOrderStatusColors(row.original.status), "p-1 rounded-xl")}>
                      {row.original.status.toLocaleLowerCase()}
                  </span> 
              </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="h-8 p-1">
                    Payment Status
                </TableCell>
                <TableCell className="h-8 p-1">
                <span className={cn(getOrderPaymentStatusColors(row.original.paymentStatus), "p-1 rounded-xl")}>
                        {row.original.paymentStatus.replaceAll("_", " ").toLowerCase()}
                    </span> 
                </TableCell>
            </TableRow>
          </Table>
          <DataTable data={row.original.orderItems} columns={orderItemsCols} searchKey="" display={{
            filter:false,
            pagination:false
          }}/>
        </ScrollArea>
      </PopoverContent>
  </Popover>
    <Button
      onClick={() => paymentModal.onOpen({
          orderId: row.original.id,
          amount: (row.original?.orderItems?.reduce((acc, item) => {
              return acc + (item?.price * item.quantity)
              }, 0) + Number.parseFloat(row.original?.deliveryAddress?.deliveryZoneLocation?.zone?.standardPrice ?? 0))
      })} 
    className="no-wrap text-white w-[80px] px-1">
      Pay Now
    </Button>
  </div>
}




