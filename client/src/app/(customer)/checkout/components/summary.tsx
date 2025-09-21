'use client'

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-Cart-Store"
import { formatter } from "@/lib/utils"
import { useCheckoutStore } from "../store"
import { useAuth } from "@/src/lib/customer-auth"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { AddOrderDocument, AddOrderMutation, DeliveryAddressType, Order, OrderType } from "@/__gql__/graphql"
import { useMutation } from "@apollo/client"
import { usePaymentModal } from "@/src/components/modals/PaymentModal"
import { User } from "lucide-react"

const Summary = () => {
    const {user} = useAuth()
    const [items] = useCart((state) => [state.items, state.removeAll, state.paymentMethod])
    const paymentModal = usePaymentModal()
    const auth = useAuth()
    const [deliveryAddress, orderType] = useCheckoutStore(state => [state.deliveryAddress, state.orderType])

    const deliveryFee = deliveryAddress?.type === DeliveryAddressType.PickAndDrop ? (deliveryAddress.deliveryZoneLocation?.zone?.standardPrice ?? 0) : deliveryAddress?.deliveryPickupMtaani?.deliveryFee ?? 0
    const itemTotal = items.reduce((total, item) => {
        return total + Number(item.totalPrice)
    }, 0) ?? 0
    const [addedOrder, setAddedOrder] = useState<AddOrderMutation["addOrder"]>()
    const [addOrder, {data}] = useMutation(AddOrderDocument)
    const [url, setUrl] = useState<string | undefined>(undefined);
    const linkRef = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
        if (url && linkRef.current) {
            linkRef.current.click();
        }
    }, [url]);
   

    const onConfirm = () => {
        if (!auth.user) {
            return setUrl("/auth?next=checkout") 
        }
        if(!orderType) {
            return toast.error("Please select either delivery or self collect.")
        }
        if(orderType === OrderType.Delivery && !deliveryAddress) {
            return toast.error("Please select a delivery address.")
        }

        if(!user?.phoneNumber) {
            return toast.error("Your phone number is missing.")
        }

        toast.promise(addOrder({
            variables: {
                order: {
                    type: orderType,
                    orderAmount: itemTotal,
                    customerName: user?.name ?? "no name",
                    customerPhone: user.phoneNumber,
                    deliveryAmount: orderType == OrderType.Delivery ?  deliveryFee ?? -1000 : 0,
                    deliveryAddressId: orderType === OrderType.Delivery ? deliveryAddress?.id : undefined,
                    orderItems: items.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            update: async (cache, {data}) => {
                setAddedOrder(data?.addOrder)
            }
        }), {
            loading: "Placing order...",
            success: () => {
                return "Order placed successfully"
            },
            error: (error) => { return "Failed to place order " + error.message}
        })
    }

    useEffect(() => {
        if(addedOrder){
            paymentModal.onOpen({amount: itemTotal + Number.parseFloat(deliveryFee), orderId: addedOrder?.id})
        }
    }, [addedOrder])

    return (
        <div className="border-white rounded-lg bg-gray-50 p-2">
              <Link href={url ?? ""} ref={linkRef} />
            <div className="text-base text-gray-900 flex items-center">
                <span>
                    Item&#39;s Total ({items.length})
                </span>
                <span className="ml-auto">
                {formatter.format(itemTotal)}
                </span>
            </div>
            <div className="text-base text-gray-900 flex items-center">
                <span>
                    Delivery fees
                </span>
                <span className="ml-auto">
                    {formatter.format(deliveryFee)}
                </span>
            </div>
            <div className="text-base text-gray-900 flex items-center">
                <span>
                    Total
                </span>
                <span className="ml-auto">
                    {formatter.format(Number.parseFloat(deliveryFee) + Number.parseFloat(itemTotal.toString()))}
                </span>
            </div>
            <Button
                disabled={!items.length}
                onClick={() => onConfirm()}
                className="w-full mt-6 sticky bottom-0"
            >
                {!auth.user ? "Sign in to confirm order" : "Place Order"}
            </Button>
        </div>
    )
}

export default Summary