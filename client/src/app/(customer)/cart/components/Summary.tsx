'use client'
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-Cart-Store"
import { formatter } from "@/lib/utils"
import Link from "next/link"
import { useAuth } from "@/src/lib/customer-auth"

const Summary = () => {
    const [items] = useCart((state) => [state.items, state.removeAll, state.paymentMethod])
    const [url, setUrl] = useState<string | undefined>(undefined);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const auth = useAuth()

    useEffect(() => {
        if (url && linkRef.current) {
          linkRef.current.click();
        }
      }, [url]);

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.totalPrice)
    }, 0)

    return (
        <div
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 sticky top-10"
        >
             <Link href={url ?? ""} ref={linkRef} />
            <h2 className="text-lg font-medium text-gray-900">
                Order Summary
            </h2>
            <div className="mt-6">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        {formatter.format(totalPrice)}
                    </div>
                </div>
                <Button
                    disabled={!items.length}
                    onClick={() => {!auth.user ? setUrl("/auth?next=checkout") : setUrl("/checkout")}}
                    className="w-full mt-6"
                >
                    Checkout
                </Button>

            </div>
        </div>
    )
}

export default Summary