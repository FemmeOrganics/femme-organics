'use client'
import { useCart } from "@/hooks/use-Cart-Store"
import { useState, useEffect } from "react"
import CartItem from "./Cart-Item"
import Summary from "./Summary"
import { Container } from "@/src/components/ui/Container"


function CartContainer
() {
    const [isMounted, setMounted] = useState(false)
    const cart = useCart()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }


    return (
        <div className="bg-white relative">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black">
                        Shoping Cart
                    </h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart</p>}
                            <ul>
                                {cart.items.map((item) => (
                                    <CartItem key={item.id} data={item} />
                                ))}
                            </ul>
                        </div>
                        <div className="sticky top-0">
                            <Summary />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CartContainer

