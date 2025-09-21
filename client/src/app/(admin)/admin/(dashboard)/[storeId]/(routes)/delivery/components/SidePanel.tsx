'use client'
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { cn } from "@/lib/utils"

function SidePanel() {
    const pathname = usePathname()
    const params = useParams()
    const routes = [
        // {
        //     href: `/admin/${params.storeId}/delivery`,
        //     label: "My Shop",
        //     active:(pathname.includes("delivery") && !pathname.includes("delivery/pick-and-drop")) && !pathname.includes("/delivery/pickup-mtaani")
        // },
        {
            href: `/admin/${params.storeId}/delivery/pick-and-drop`,
            label: "Pick & Drop",
            active: pathname.includes("delivery/pick-and-drop")
        },
        {
            href: `/admin/${params.storeId}/delivery/pickup-mtaani`,
            label: "Pickup Mtaani",
            active: pathname.includes("/delivery/pickup-mtaani")
        }
    ]
    return (
        <nav className={cn("flex flex-col")}>
                {routes.map((route) => 
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn("hover:bg-muted/80 dark:hover:bg-muted/50 py-2 px-2",
                            route.active ? "bg-muted/80" : ""
                        )}
                    >{route.label}</Link>
                )}
        </nav>
    )
}

export default SidePanel
