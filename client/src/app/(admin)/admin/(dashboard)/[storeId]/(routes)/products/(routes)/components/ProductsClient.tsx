'use client'
import {Suspense, useEffect} from 'react';

import ProductsList from "./ProductsList"
import { ProductClientResizable } from "./ResizableClient"
import type { GetProductQuery } from '@/__gql__/graphql';
import { useProductsStore } from "@/store/ProductsStore";
import LoadingSpinner from '@/components/LoadingSpinner';
import ProductDetail from './ProductDetail';
import { useRouter } from 'next/navigation';
type ProductsClientProps = {
    products: GetProductQuery["product"][]
}


function ProductsClient({products}: ProductsClientProps) {
  //@ts-ignore
  const [productId, setProductId] = useProductsStore((state) => [state.productId, state.setProductId])
  const router = useRouter()


  return (
    <div className='h-screen'>
      <ProductClientResizable
          minSizeLeft={35}
          minSizeRight={40}
          left={
             <div className='relative h-screen'>
                <ProductsList
                  products={products as GetProductQuery["product"][]} 
                />
                {productId && <div onClick={() => setProductId(null)} onKeyDown={() => setProductId(null)} className="absolute inset-0 bg-black bg-opacity-30 dark:bg-opacity-70 z-50 cursor-not-allowed" />}
              </div>
            
          }
          right={
            productId ? 
              <Suspense fallback={ <div className='flex flex-col items-center justify-center py-20 w-full h-screen'><LoadingSpinner/></div>}>
                <ProductDetail />
              </Suspense>
            : undefined
          }
      />
    </div>
  )
}

export default ProductsClient
