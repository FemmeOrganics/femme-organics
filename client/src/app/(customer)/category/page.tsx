import { GetCategoriesDocument, type GetProductQuery, GetProductsByCategoryDocument } from "@/__gql__/graphql"
import { Container } from "@/src/components/ui/Container"
import { getClient } from "@/src/lib/graphql/ApolloClient"
import { ProductList } from "@/src/components/ProductList"

export default async function page() {
    const {data} = await getClient().query({query: GetCategoriesDocument})
    const categories = data.categories

    let products: GetProductQuery["product"][] = []
    if(categories?.length && categories[0]?.id){
        const {data} = await getClient().query({
            query: GetProductsByCategoryDocument,  variables: {
                categoryId: categories[0]?.id
            }})
        products = data.productsByCategory as  GetProductQuery["product"][]
    }
    
    return (
       <Container className="min-h-screen py-0 my-0">
             <ProductList titleClass="text-1xl" items={products as GetProductQuery["product"][]} title={products ? products[0]?.category.name : ""}/>
       </Container>
    )
}
