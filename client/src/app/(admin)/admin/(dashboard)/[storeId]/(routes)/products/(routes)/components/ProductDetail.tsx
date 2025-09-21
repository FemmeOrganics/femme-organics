'use client'
import { useSuspenseQuery } from "@apollo/client";
import { useParams } from 'next/navigation';

import { useProductsStore } from "@/store/ProductsStore";
import { GetCategoriesDocument,GetProductDocument,  type GetProductQuery } from "@/graphql"
import { skipToken } from "@apollo/client";
import ProductForm from "./ProductForm";

function ProductDetail() {
  const [productId] = useProductsStore((state) => [state.productId])

    const params = useParams()
    const {data: prodData} = useSuspenseQuery(
        GetProductDocument,
        productId && productId !== 'new' ? {variables: {productId: productId, }, fetchPolicy: "no-cache"} : skipToken,
    )
    const product = prodData?.product as GetProductQuery["product"]

    const {data: catData} = useSuspenseQuery(
        GetCategoriesDocument,
        productId ? {variables: {storeId: Number.parseInt(params.storeId as string)}} : skipToken
    )
    const categories = catData?.categories
    
    return (
        <ProductForm
            initialData={product}
            categories={categories ?? []}
        />
    )
}

export default ProductDetail
