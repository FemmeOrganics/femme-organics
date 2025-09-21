import {Container} from "@/components/ui/Container"
import Summary from "./components/Summary"
import { Cart } from "./components/cart"

async function CartPage() {

    return (
        <Container className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">
                Shoping Cart
            </h1>
            <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 mt-16">
                <div className="lg:col-span-6">
                    <Cart />
                </div>
                <div className="lg:col-span-6 lg:mt-0 lg:p-8 sticky top-10 space-y-2">
                    <Summary />
                </div>
            </div>
        </Container>
    )
}

export default CartPage
