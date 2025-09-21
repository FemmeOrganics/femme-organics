import { GetProductDocument,type GetProductQuery } from "@/__gql__/graphql"
import { getClient } from "@/src/lib/graphql/ApolloClient"

interface PromiseProps {
    product: GetProductQuery["product"]
}

export const getProduct = async (id: number): Promise<PromiseProps | undefined> => {
    try{
        const {data} = await getClient().query({
            query: GetProductDocument,
            variables: {
                productId: id
            }
        })
        return data
    } catch {
        console.log("something went wrong")
    }
}
