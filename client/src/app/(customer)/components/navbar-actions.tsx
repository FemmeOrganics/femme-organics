'use client'
import { Router, ShoppingBag } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useCart } from "@/hooks/use-Cart-Store"
import Link from "next/link"
import { MobileMenu } from "./MobileMenu"
import { Button } from "@/src/components/ui/button"
import { useGlobalStore } from "../store"
import { setCookie } from "cookies-next"
import { usePathname, useRouter } from "next/navigation"
import DarkModeButton from "@/src/components/DarkModeButton"

export const NavbarActions = () => {
    const [isMounted, setMounted] = useState(false)
    const cart = useCart();
    const [user, setUser] = useGlobalStore(state => [state.user, state.setUser])
    const [url, setUrl] = useState<string | undefined>(undefined);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (url && linkRef.current) {
            linkRef.current.click();
        }
    }, [url]);

    const onSignOut = () => {
        setUser(null)
        setCookie("jwt", "")
        localStorage.setItem('jwt', "");
        router.push("/")
    }

    useEffect(() => {
        setMounted(true)
    }, [])
    if(!isMounted) {
        return null
    }
    return (
        <div className="flex flex-row items-center text-sm">
            <Link href={url ?? ""} ref={linkRef} replace />
            <span className="hidden md:block mr-2">
                {
                user 
                    ?
                    <Button className="h-8" variant="outline" onClick={() => onSignOut()}>
                        Log Out
                    </Button> 
                    : 
                    <Link href={`/auth?next=${pathname}`} className="">
                        <Button className="h-8" variant="outline">
                            sign up/sign in
                        </Button>
                </Link>
                }
            </span>
            <Link
                href="/cart"
                className=" items-center rounded-full bg-gray-800 px-2 py-2 h-8 hidden md:flex">
                <ShoppingBag size={20} color='white'/>
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Link>
            <MobileMenu />
        </div>
    )
}