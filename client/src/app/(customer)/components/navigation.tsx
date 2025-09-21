"use client"

import { cn } from "@/src/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useGlobalStore } from "../store"

export const Navigation = ( ) => {
    const pathnames = usePathname()
    const [user] = useGlobalStore(state => [state.user])
    return <nav className="flex items-center">
    <div className="hidden md:flex space-x-6 ml-auto text-gray-800">
        <Link href="/" className={cn("hover:opacity-80 transition", pathnames.split("/").filter(path => path.length).length == 0  ? "text-green-500 text-shadow underline underline-offset-1 underline-2" : "")}>Products</Link>
        <Link href={!user ? "/auth?next=orders" : "/orders"}className={cn("hover:opacity-80 transition", pathnames.includes("orders") ? "text-green-500 text-shadow underline underline-offset-1 underline-2" : "")}>Orders</Link>
        <Link href={!user ? "/auth?next=account" : "/account"} className={cn("hover:opacity-80 transition", pathnames.includes("account") ? "text-green-500 text-shadow" : "")}>Account</Link>
    </div>
</nav>
}