'use client'
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/Heading"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GetOrdersQuery, OrderPaymentStatusType, OrderStatus, OrderType } from "@/__gql__/graphql"
import { Columns } from "./Columns"
import { DataTable } from "@/src/components/data-table/data-table"
import { useMemo } from "react"

type Props = {
    orders: GetOrdersQuery["orders"]
}

const OrderClient = ({ orders }: Props) => {

    const memoizedOrders = useMemo(() => orders ?? [], [orders]);
    const memoizedColumns = useMemo(() => Columns, []); //

    return (
        <div className="huseMutation-full">
            <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50  px-2  py-1">
                <Heading
                    title={`Orders (${orders?.length})`}
                    description="Manage orders for your store"
                />
            </div>
            <Separator />
            <ScrollArea className='h-full px-2 py-4'>
                <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm">
                    <DataTable
                        columns={memoizedColumns}
                        data={memoizedOrders ?? []}
                        searchKey="orderNumber"
                        filters={[
                            {
                                columnName: "status",
                                columnTitle: "Order Status",
                                options: [
                                    { label: OrderStatus.Confirmed.toLocaleLowerCase(), value: OrderStatus.Confirmed },
                                    { label: OrderStatus.Pending.toLocaleLowerCase(), value: OrderStatus.Pending },
                                    { label: OrderStatus.Received.toLocaleLowerCase(), value: OrderStatus.Received },
                                    { label: OrderStatus.Cancelled.toLocaleLowerCase(), value: OrderStatus.Cancelled },
                                ]
                            },
                            {
                                columnName: "paymentStatus",
                                columnTitle: "Payment Status",
                                options: [
                                    { label: OrderPaymentStatusType.Full.toLocaleLowerCase(), value: OrderPaymentStatusType.Full },
                                    { label: OrderPaymentStatusType.Partial.toLocaleLowerCase(), value: OrderPaymentStatusType.Partial },
                                    { label: OrderPaymentStatusType.NotPaid.toLocaleLowerCase(), value: OrderPaymentStatusType.NotPaid },
                                ]
                            },
                            {
                                columnName: "type",
                                columnTitle: "Order Type",
                                options: [
                                    { label: OrderType.Delivery.toLocaleLowerCase(), value: OrderType.Delivery },
                                    { label: OrderType.SelfCollect.toLocaleLowerCase(), value: OrderType.SelfCollect },
                                ]
                            }
                        ]}
                    />
                </div>
                <div className='mb-20' />
            </ScrollArea>
        </div>
    )
}

export default OrderClient