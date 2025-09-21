'use client'
import { useCart } from "@/hooks/use-Cart-Store"
import { useState, useEffect } from "react"
import CartItem from "./Cart-Item"

export function Cart() {
    const [isMounted, setMounted] = useState(false)
    const cart = useCart()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }

  return (
    <div>
        {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart</p>}
        <ul>
            {cart.items.map((item) => (
                <CartItem key={item.id} data={item} />
            ))}
        </ul>
    </div>
  )
}
