"use client"
import { cn } from "@/lib/utils"
import { useCart } from "@/src/hooks/use-Cart-Store"
import { useAuth } from "@/src/lib/customer-auth"
import { HomeIcon, ShoppingBasketIcon, TruckIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const MobileFooter = () => {
    const cart = useCart();
    const {user} = useAuth()
    const pathnames = usePathname().split("/").filter(p => p)
    return <div className={cn("fixed bottom-0 w-full block md:hidden ", pathnames.includes("auth") ? "hidden": "block")}>
        <div className="p-2 mx-auto bg-white rounded-full w-[80vw] shadow-md flex items-center justify-evenly">
            <Link href="/" className={cn("h-10 w-10 rounded-full flex items-center justify-center p-1",  pathnames.length === 0 ? "bg-green-200" : "")}>
                <HomeIcon size={"30"} />
            </Link>
            <Link href="/cart" className={cn("relative h-10 w-10 rounded-full flex items-center justify-center p-1", pathnames.includes("cart") ? "bg-green-200" : "")}>
                <ShoppingBasketIcon size={"30"} />
                <span className="absolute rounded-full h-5 w-5 bg-slate-50 flex items-center justify-center border top-0 right-0 ml-2 text-sm font-medium text-black">
                    {cart.items.length}
                </span>
            </Link>
            <Link href={!user ? "/auth?next=orders" : "/orders"} className={cn("h-10 w-10 rounded-full flex items-center justify-center p-1", pathnames.includes("orders") ? "bg-green-200" : "")}>
                <TruckIcon size={"30"} />
            </Link>
            <Link href={!user ? "/auth?next=account" : "/account"} className={cn("h-10 w-10 rounded-full flex items-center justify-center p-1", pathnames.includes("account") ? "bg-green-200" : "")}>
                <UserIcon size={"30"} />
            </Link>
        </div>
    </div>
}