'use client'
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/Heading"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GetCustomersQuery,  OrderPaymentStatusType, OrderStatus, OrderType } from "@/__gql__/graphql"
import { Columns } from "./Columns"
import { DataTable } from "@/src/components/data-table/data-table"

type Props = {
    customers: GetCustomersQuery["customers"]
}

export const CustomerClient = ({ customers }: Props) => {

    return (
        <div className="h-full">
            <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50  px-2  py-1">
                <Heading
                    title={`Customers (${customers?.length})`}
                    description="Manage customers for your store"
                />
            </div>
            <Separator />
            <ScrollArea className='h-full px-2 pt-1'>
                <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm">
                    <DataTable 
                        columns={Columns} 
                        data={customers ?? []} 
                        searchKey="name" 
                     
                    />
                </div>
                <div className='mb-20'/>
            </ScrollArea>
        </div>
    )
}