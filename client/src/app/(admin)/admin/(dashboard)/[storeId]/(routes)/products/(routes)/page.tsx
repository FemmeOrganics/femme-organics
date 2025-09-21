import { format } from 'date-fns'
import { getClient } from '@/lib/graphql/ApolloClient'
import { GetProductsDocument } from "@/graphql"
import type { GetProductQuery } from '@/graphql';
import { formatter } from '@/lib/utils';
import ProductsClient from './components/ProductsClient';

type Props = {
  params: {
    storeId: string
  }
}

export default async function ProductsPage({params: {storeId}}: Props) {
  let formattedProducts: GetProductQuery["product"][] = []
  try {
    const { data } = await getClient().query({
    query: GetProductsDocument,
      variables: { storeId: Number.parseInt(storeId) }
    })
    formattedProducts = data.products?.map((item) => ({
      id: item?.id ?? 0,
      name: item?.name ?? "",
      price: item?.price ?? 0,
      isFeatured: item?.isFeatured ?? false,
      isArchived: item?.isArchived ?? false,
      category: item?.category?.name ?? "",
      sizes: item?.sizes ?? [],
      colors: item?.colors ?? [],
      updatedAt: format(new Date(item?.updatedAt), "MMMM do, yyyy"),
      images: item?.images ?? []
    })) as unknown as GetProductQuery["product"][]

  } catch (error) {
    console.log(error)
  }
    
    return (
        <div className="w-full h-full ">
             <ProductsClient products={formattedProducts}/>
        </div>
    )
} 