"use client"
import { GetProductsByCategoryDocument, type GetProductQuery } from "@/__gql__/graphql";
import NoResults from "@/components/ui/No-Results";
import {ProductCard} from "@/components/ui/Product-Card";
import { useCategoryStore } from "../app/(customer)/category/store";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { cn } from "../lib/utils";
interface ProductListProps {
    title?: string,
    titleClass?: string,
    items: GetProductQuery["product"][]
}


export const ProductList = ({title, items, titleClass}: ProductListProps) => {
    const categoryStore = useCategoryStore()
    const [getProductByCategory, {loading, error, data}] = useLazyQuery(GetProductsByCategoryDocument)
    const productsByCategory = data?.productsByCategory
    const [products, setProducts] = useState(items)
    useEffect(() => {
        if(categoryStore.category) {
            getProductByCategory({
                variables: {
                    categoryId: categoryStore.category.id
                }
            })
        }
    }, [categoryStore.category, getProductByCategory])

    useEffect(() => {
        if(productsByCategory?.length){
            setProducts(productsByCategory as GetProductQuery["product"][])
        }
    }, [productsByCategory])

    return (
        <div className="h-full w-full">
            <h3 className={cn("font-bold text-2xl w-full h-fit", titleClass)}>{categoryStore.category?.name ?? "Products"}</h3>
            {products.length === 0 && <NoResults/>}
            <div className={"grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"}>
                {products.map((item) => (
                    <ProductCard key={item.id} data={item}/>
                ))}
            </div>
        </div>
    )
};

