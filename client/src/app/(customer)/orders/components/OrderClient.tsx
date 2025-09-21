'use client'
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/Heading"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DeliveryAddressType, GetOrdersByCustomerDocument, OrderPaymentStatusType, OrderType } from "@/__gql__/graphql"
import { useAuth } from "@/src/lib/customer-auth"
import { skipToken, useQuery, useSuspenseQuery } from "@apollo/client"
import { DataTable } from "@/src/components/ui/DataTable"
import { Columns } from "./Columns"
import NoResults from "@/src/components/ui/No-Results"
import { Button } from "@/src/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion"
import { cn } from "@/src/lib/utils"
import { Card } from "@/src/components/ui/card"
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { usePaymentModal } from "@/src/components/modals/PaymentModal"
import { getOrderStatusColors, getOrderPaymentStatusColors } from "@/lib/order-status"

const OrderClient = () => {
    const paymentModal = usePaymentModal()
    const {user} = useAuth()
    const {data} = useSuspenseQuery(GetOrdersByCustomerDocument, 
            user?.customerId ? {
            variables: {customerId: user.customerId},
            fetchPolicy: "no-cache"
        } : skipToken)

    const ordersByCustomer = data?.ordersByCustomer
    return (
        <div className="h-full">
            <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50 py-1">
                <Heading
                    title={`Orders (${ordersByCustomer?.length ?? 0})`}
                    description=""
                />
            </div>
            <Separator />
            {ordersByCustomer ?
                <ScrollArea className='h-full pt-1'>
                    <div className="hidden md:block">
                        <DataTable  searchKey="" data={ordersByCustomer} columns={Columns}/>
                        <div className='mb-20'/>
                    </div>
                    <div className="md:hidden flex flex-col space-y-4">
                        {ordersByCustomer.map((order) => 
                            <div key={order.id} className="relative flex flex-col gap-4">
                                    <Card
                                        className={cn(
                                        "flex h-50 w-50 flex-col justify-center border border-[#E2E8F0] border-solid p-5 space-y-2 text-md",
                                        )}
                                        key={order.id}
                                    >
                                        <Table className="text-sm space-y-1">
                                            <TableRow >
                                                <TableCell className="h-8 p-1">
                                                    Order ID
                                                </TableCell>
                                                <TableCell className="h-8 p-1">
                                                   {order.orderNumber}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="h-8 p-1">
                                                Order Amount
                                                </TableCell>
                                                <TableCell className="h-8 p-1">
                                                   {order.orderAmount}
                                                </TableCell>
                                            </TableRow>
                                            {order.type !== OrderType.SelfCollect &&  
                                                <TableRow>
                                                    <TableCell className="h-8 p-1">
                                                        Delivery Fee
                                                    </TableCell>
                                                    <TableCell className="h-8 p-1">
                                                    {order.deliveryAmount}
                                                    </TableCell>
                                                </TableRow>
                                            }
                                             <TableRow>
                                                <TableCell className="h-8 p-1">
                                                    Amount Paid
                                                </TableCell>
                                                <TableCell className="h-8 p-1">
                                                {order?.amountPaid ?? 0}
                                                </TableCell>
                                            </TableRow>
                                            {order.type !== OrderType.SelfCollect  ? 
                                                <TableRow>
                                                    <TableCell className="h-8 p-1">
                                                        Delivery Address
                                                    </TableCell>
                                                    <TableCell className="h-8 p-1">
                                                    {order.type as OrderType === OrderType.SelfCollect ? "Collect at our shop" 
                                                    : order.deliveryAddress?.type === DeliveryAddressType.PickAndDrop ?order?.deliveryAddress?.deliveryZoneLocation?.address 
                                                    : order.deliveryAddress?.type === DeliveryAddressType.Custom ? order.deliveryAddress?.address : order.deliveryAddress?.deliveryPickupMtaani?.locationName }
                                                    </TableCell>
                                                </TableRow>
                                                :
                                                <TableRow>
                                                    <TableCell className="h-8 p-1">
                                                        Self Collect
                                                    </TableCell>
                                                    <TableCell className="h-8 p-1">
                                                        At our shop
                                                    </TableCell>
                                                </TableRow>
                                            }
                                            <TableRow>
                                                <TableCell className="h-8 p-1">
                                                    Order Status
                                                </TableCell>
                                                <TableCell className="h-8 p-1">
                                                    <span className={cn(getOrderStatusColors(order.status), "p-1 rounded-xl")}>
                                                        {order.status.toLocaleLowerCase()}
                                                    </span> 
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="h-8 p-1">
                                                    Payment Status
                                                </TableCell>
                                                <TableCell className="h-8 p-1">
                                                <span className={cn(getOrderPaymentStatusColors(order.paymentStatus), "p-1 rounded-xl")}>
                                                        {order.paymentStatus.replaceAll("_", " ").toLowerCase()}
                                                    </span> 
                                                </TableCell>
                                            </TableRow>
                                        </Table>
                                        
                                        {order.paymentStatus !== OrderPaymentStatusType.Full && 
                                            <Button onClick={() => paymentModal.onOpen({
                                                orderId: order.id,
                                                amount: (order?.orderItems?.reduce((acc, item) => {
                                                    return acc + (item?.price * item.quantity)
                                                    }, 0) + Number.parseFloat(order.deliveryAddress?.deliveryZoneLocation?.zone?.standardPrice ?? 0))
                                            })}>
                                                Pay Now
                                            </Button>
                                        }
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="item">
                                                <AccordionTrigger className="hover:underline-0 bg-slate-100 rounded-md text-center h-10">
                                                    <div className="w-full text-center">
                                                        View Details
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent >
                                                    <Table>
                                                        <TableHeader>
                                                            <TableHead>
                                                                Product              

                                                                Price
                                                            </TableHead>
                                                            <TableHead>
                                                                Quantity
                                                            </TableHead>
                                                            <TableHead>
                                                                TotalPrice
                                                            </TableHead>
                                                        </TableHeader>
                                                        {order.orderItems.map((item) => 
                                                            <TableRow key={item?.id}>
                                                                <TableCell>
                                                                    {item?.orderProduct.name}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item?.price}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item?.quantity}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item?.quantity * item.price}
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </Table>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                        
                                    </Card>
                              
                          </div>
                        )}
                        <div className='mb-20'/>
                    </div>
                </ScrollArea>
            : <NoResults />
            }
            
        </div>
    )
}

export default OrderClient