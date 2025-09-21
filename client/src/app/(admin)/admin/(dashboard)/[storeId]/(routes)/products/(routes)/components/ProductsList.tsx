'use client'

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/ui/DataTable"
import {  columns, columns2 } from "./Columns"
import { useProductsStore } from "@/store/ProductsStore";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { GetProductQuery } from "@/__gql__/graphql"

type Props = {
    products: GetProductQuery["product"][]
}

const ProductsList = ({ products }: Props) => {
    const [productId, setProductId, resetStore] = useProductsStore((state) => [state.productId,state.setProductId, state.resetStore])

    return (
        <div className=' h-full'>
            <div className='flex items-center sticky top-0 justify-end bg-muted/80 dark:bg-muted/50  px-2 py-1 shadow-sm dark:shadow-slate-500'>
                <div className="font-bold text-lg">
                    Products ({products?.length})
                </div>
                <Button 
                    onClick={() => {setProductId("new"); resetStore()}}
                    className='ml-auto  px-2'
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <ScrollArea className='h-full px-2 pl-1 mt-2 bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm'>
                {productId 
                    ? <DataTable columns={columns2} data={products} searchKey="name" />
                    : <DataTable columns={columns} data={products} searchKey="name" />
                }
                
                <div className="pb-20"/>
            </ScrollArea>
        </div>
    )
}

export default ProductsList