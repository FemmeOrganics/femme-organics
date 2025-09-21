'use client'
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react"
import { type ChangeEvent, useState, type MouseEventHandler } from "react"
import { type CartItemType, useCart } from "@/hooks/use-Cart-Store"
import { formatter } from "@/lib/utils"
import type { GetProductQuery } from "@/__gql__/graphql"
import { Display } from "./richtext"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useParams } from "next/navigation"


interface InfoProps {
    data: GetProductQuery["product"]
}
function Info({data}: InfoProps) {
    const params = useParams().productId
    const [productToCart, setProductToCart] = useState<CartItemType>({
        id: data.id,
        category: data.category,
        name: data.name,
        price: data.price,
        quantity: 1,
        images: data.images,
    })
    const cart = useCart()

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        if(data.sizes?.length && !productToCart.size){
            return toast.error("Please select a size.")
        } 
        if(data.colors?.length && !productToCart.color){
            return toast.error("Please select a color")
        }
        cart.addItem(productToCart)
    }

    const onSubtract = () => {
        setProductToCart((prev) => ({...prev, quantity: prev.quantity - 1 }))
    }
    const onAdd = () => {
        setProductToCart((prev) => ({...prev, quantity: prev.quantity + 1 }))
    }
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
          setProductToCart((prev) => ({...prev, quantity: Number.parseInt(e.target.value)}))
      }
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 items-end justify-between">
                <p className="text-2xl text-gray-900">
                    {formatter.format(data.price)}
                </p>
            </div>
            <hr  className="my-4"/>
            <div className="space-y-2">
                <div>
                    <h3 className="font-semibold text-1.5xl">Description</h3>
                    <Display content={data.description ?? ""}/>
                </div>
                <div className="">
                    <h3 className="font-semibold text-1.5xl">Specification</h3>
                    <Display content={data.specification ?? ""}/>
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col gap-y-2">
                {!!data.colors?.length &&  

                    <div className="flex items-center gap-x-4 w-full">
                        
                        <h3 className="font-semibold text-black min-w-[50px]">Color: </h3>
                        <div className="flex-1">
                            <Select
                                onValueChange={(value) => {
                                    setProductToCart((prev) =>({...prev, color: data.colors?.find((color => color.id === Number.parseInt(value)))}))
                                }}
                            >
                                <SelectTrigger className="flex-1 md:max-w-[200px]">
                                    <SelectValue placeholder="Select a color" />
                                </SelectTrigger>
                                <SelectContent className="flex-1 md:max-w-[200px]">
                                    {data.colors.map((color => 
                                        <SelectItem 
                                            key={color.id} 
                                            value={color.id.toString()}
                                            className="w-full"
                                        >
                                            <div  className="flex items-center w-full space-x-3">
                                                <span className="w-fit">{color.name}</span>
                                                <div
                                                    className="border p-3 rounded-full ml-auto"
                                                    style={{ backgroundColor: color.value }}
                                                />
                                            </div>
                                        </SelectItem>))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>}
                    {!!data.sizes?.length && 
                    <div className="flex items-center gap-x-4">
                        <h3 className="font-semibold text-black min-w-[50px]">Size: </h3>
                       
                        <Select
                            onValueChange={(value) => {
                                const size = data.sizes?.find((size => size.id === Number.parseInt(value)))
                                setProductToCart((prev) =>({...prev, size, price: size?.price ?? prev.price}))
                            }}
                        >
                            <SelectTrigger className="flex-1 md:max-w-[200px]">
                                <SelectValue placeholder="Select a size" />
                            </SelectTrigger>
                            <SelectContent className="flex-1 md:max-w-[200px]">
                                {data.sizes.map((size => 
                                    <SelectItem 
                                            key={size.id} 
                                            value={size.id.toString()}
                                            className=""
                                        >
                                            <div  className="flex items-center w-full space-x-3">
                                                <span>{size.name}</span> 
                                                <span className="ml-auto">{size.value}</span>
                                                @
                                                <span className="ml-auto">{formatter.format(size.price)}</span>
                                            </div>
                                    </SelectItem>))}
                            </SelectContent>
                        </Select>
                    </div>}
                </div>
                <div className="flex items-center w-full">
                    <Button 
                        variant={"outline"}  
                        className="px-1 -mr-1 z-10" 
                        size={'icon'} 
                        onClick={(onSubtract)}
                        disabled={productToCart.quantity <= 1}
                    >
                        <MinusIcon size={"20"}/>
                    </Button>
                    <Input 
                        type="number" 
                        className="focus-visible:ring-0 text-center border-0 border-b flex-1 md:max-w-[200px] rounded-none" 
                        value={productToCart.quantity} 
                        onChange={(onChange)} 
                        min={1}
                    />
                    <Button 
                        variant={"outline"} 
                        className="px-1 -ml-1"  
                        size={'icon'} 
                        onClick={onAdd}>
                            <PlusIcon size={"20"}/>
                    </Button>
                </div>
                <div className="mt-10 flex items-center gap-x-3">
                <Button onClick={onAddToCart} className="w-full md:max-w-[250px] flex items-center gap-x-2 text-white bg-black rounded-full py-2 px-4">
                    Add To Cart
                    <ShoppingCartIcon />
                </Button>
            </div>
            </div>
            
            
        </div>
    )
}

export default Info


