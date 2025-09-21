import {getProduct} from '@/app/actions/get-product'
import {Container} from '@/components/ui/Container'
import {ProductList} from '@/components/ProductList'
import Gallery from '@/components/gallery'
import Info from '@/components/Info'
import { getProductsByCategory } from '@/src/app/actions/get-product-by-category'
import type { GetProductQuery } from '@/__gql__/graphql'

interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({params}) => {
    const prodData = await getProduct(Number.parseInt(params.productId)) as unknown as GetProductQuery
    const sugData = await getProductsByCategory({
        categoryId: prodData.product?.category?.id.toString(),
    })
    return (
         <Container>
            <div className=''>
                <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
                    <Gallery images={prodData?.product.images}/>
                    <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                        <Info data={prodData?.product as  GetProductQuery["product"]} />
                    </div>
                </div>
                <hr className='my-10'/>
                <ProductList title="Related Items" items={sugData?.productsByCategory as unknown as GetProductQuery["product"][]} />
            </div>
         </Container>
    )
}

export default ProductPage
