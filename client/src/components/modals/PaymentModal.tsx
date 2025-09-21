"use client"
import {RadioGroupForm} from "@/components/PaymentOptions"
import { useEffect, useRef, useState } from "react"
import { useCart } from "@/hooks/use-Cart-Store"
import { formatter } from "@/lib/utils"
import  LoadingSpinner  from "@/components/LoadingSpinner"
import { MpesaPayment } from "@/components/MpesaPayment"
import { DialogWrapper } from "../ui/dialog-wrapper"
import { create } from "zustand";
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

interface PaymentModalStore {
    isOpen: boolean;
    data?: {amount: number, orderId?: number}
    onOpen: (data?: {amount: number, orderId?: number}) => void;
    onClose: () => void;
}

export const usePaymentModal = create<PaymentModalStore>((set) => ({
    isOpen: false,
    data: {
      amount: 0,
      orderId: undefined
    },
    onOpen:(data?: {amount: number, orderId?: number}) => set({ isOpen:true, data}),
    onClose: () => set({isOpen:false})
}))

export type CheckoutProduct = {
  id: number;
  name: string;
  price: number; 
  totalPrice: number;
  quantity: number; 
}

function PaymentModal() {
    const paymentModal = usePaymentModal()
    const [loading, setLoading] = useState(false)
    const [isMounted, setMounted] = useState(false)
    const [ paymentMethod,  removeAll ] = useCart((state) => [ state.paymentMethod, state.removeAll])
    const pathnames = usePathname()

    const [url, setUrl] = useState<string | undefined>(undefined);
    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (url && linkRef.current) {
          linkRef.current.click();
        }
      }, [url]);


    useEffect(() => {
        setMounted(true)
    },[])

    if(!isMounted) return null;

    return (
        <DialogWrapper 
            isOpen={paymentModal.isOpen}
            onClose={() => {
              pathnames.includes("checkout") ? setUrl(`/orders?order=${paymentModal.data?.orderId}`) : ""; paymentModal.onClose(); removeAll()
            }}
            onCloseAction={() =>  pathnames.includes("checkout") ? setUrl(`/orders?order=${paymentModal.data?.orderId}`) : {} }
            className="min-w-[300px]"
        >
            <Link href={url ?? ""} ref={linkRef} />
            <div className="w-full">
              <div className="bg-muted p- 2rounded-md">
                <h2 className="text-lg font-medium text-gray-900">
                    Order Summary
                </h2>
                <div className="my-2 space-x-4">
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <div className="text-base font-medium text-gray-900">
                            {formatter.format(paymentModal?.data?.amount ?? 0)}
                        </div>
                    </div>
                </div>
              </div>
              <div>
                {paymentMethod === "mpesa" 
                  ? <MpesaPayment loading={loading} setLoading={setLoading}/>
                  :
                  <div>
                    <h1 className="text-lg font-medium text-gray-900 my-2">Select a payment method</h1>
                    <RadioGroupForm loading={loading}/>
                  </div>
                }
              </div>
            </div>
        </DialogWrapper>
    )
}

export default PaymentModal

