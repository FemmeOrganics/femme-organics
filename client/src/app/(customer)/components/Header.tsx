import Link from "next/link"
import {Container} from "@/components/ui/Container"
import { ProductSearch } from "../../../components/product-search"
import { NavbarActions } from "./navbar-actions"
import { cn } from "@/lib/utils"
import { Navigation } from "./navigation"

const Header = () => {
    return (
        <div className="bg-pink-50 sticky top-0 z-20">
            <Container className="border-b relative h-30 py-1 space-y-2">
                <div className="flex h-18 items-center justify-between space-x-3">
                    <Link href="/" className="w-fit">
                        <p className="font-bold text-xl text-gray-800">Org</p>
                    </Link>
                    <ProductSearch />
                    <NavbarActions />
                </div>
                <div className="hidden md:block">
                    <Navigation />
                </div>
            </Container>
        </div>
    )
}

export default Header
