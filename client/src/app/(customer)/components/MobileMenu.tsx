"use client"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"
import { setCookie } from "cookies-next"
import { MenuIcon, InfoIcon, LogOutIcon } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, } from "next/navigation"
import { useGlobalStore } from "../store"
import { useRef, useEffect, useState } from "react"

export function MobileMenu() {
    const [user, setUser] = useGlobalStore(state => [state.user, state.setUser])
    const [url, setUrl] = useState<string | undefined>(undefined);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const pathnames = usePathname()
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
        setUrl(`/`)
    }

  return (
    <Sheet>
     <Link href={url ?? ""} ref={linkRef} replace />
      <SheetTrigger asChild className="w-fit md:hidden">
        <Button variant="ghost" size="icon" >
            <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="z-50">
        <div className="py-4 flex flex-col space-y-4">
        
        </div>
        <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <SheetClose asChild>
            <Button onClick={() => {user ? onSignOut() : router.push(`/auth?next=${pathnames.includes("auth") ? "/" : pathnames}`)}} variant="secondary" className="w-full">
              <LogOutIcon className="mr-2 h-4 w-4" />
              {user ? "Sign Out" : "Log in"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}