import Image from "next/image"
import { XIcon, PlusIcon, MinusIcon} from "lucide-react"
//@ts-ignore
import noImage from "@/app/assets/no-image.jpeg";
import IconButton from "@/components/ui/Icon-Button"
import {formatter} from "@/lib/utils"
import { useCart } from "@/hooks/use-Cart-Store"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import type {  CartItemType} from "@/types"
import { type ChangeEvent, useEffect, useState } from "react"

interface CartItemProps {
    data: CartItemType;
}
function CartItem({data}: CartItemProps) {
    const cart = useCart()

    const onRemove = () => {
        cart.removeItem({ id: data.id, sizeId: data.size?.id, colorId: data.color?.id })
    }
    return (
        <li className="flex py-6 border-b">
        <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
            <Image
                fill
                src={data?.images?.length ? data?.images[0].url : noImage}
                alt=""
                className="Object-cover object-center"
            />
        </div>
        <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="absolute z-10 right-0 top-0">
                <IconButton onClick={onRemove} icon={<XIcon size={15} />} />
            </div>
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div className="flex justify-between">
                    <p className="text-l font-semibold text-black line-clamp-2">
                        {data?.name}
                    </p>
                </div>

                <div className="mt-1 flex text-sm">
                    <p className="text-slate-500">{data?.color?.name}</p>
                    <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data?.size?.name}</p>
                </div>

                <div className="flex items-center text-sm"> 
                    {formatter.format(data.price ?? 0)} <XIcon size={'15'}/> {data.quantity}
                </div>
                <div className="text-sm font-semibold">{formatter.format(data.totalPrice)}</div>
                <AddQuantity data={{id: data.id, quantity: data.quantity}} />
            </div>
        </div>
        </li>
    )
}

export default CartItem

type AddQuantityProps = {
    data: {id: number, quantity: number}
}

export const AddQuantity = ({data}:AddQuantityProps) => {
    const [quantity, setQuantity] = useState<number>(data.quantity)
    const cart = useCart()
    const onAdd = () => {
        setQuantity((quantity) => quantity + 1)
    }
    const onSubtract = () => {
        setQuantity((quantity) => quantity-1)
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number.parseInt(e.target.value))
    }
    useEffect(() => {
        cart.updateQuantity(quantity, data.id)
    }, [quantity, cart.updateQuantity, data.id, cart])
    return (
        <div className="flex items-center">
            <Button variant={"outline"} disabled={quantity <= 1} className="px-1 -mr-1 z-10" size={'icon'} onClick={onSubtract}><MinusIcon size={"20"}/></Button>
            <Input type="number" className="focus-visible:ring-0 text-center border-0 border-b max-w-[60px]" value={quantity} onChange={onChange} min={1}/>
            <Button variant={"outline"} className="px-1 -ml-1"  size={'icon'} onClick={onAdd}><PlusIcon size={"20"}/></Button>
        </div>
    )
}