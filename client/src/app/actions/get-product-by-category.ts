import { GetProductsByCategoryDocument, type GetProductsByCategoryQuery } from "@/__gql__/graphql";
import { getClient } from "@/src/lib/graphql/ApolloClient";
interface PromiseProps {
    productsByCategory?: GetProductsByCategoryQuery["productsByCategory"]
}

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

export const getProductsByCategory = async (query: Query): Promise<PromiseProps | undefined> => {
    try {
        if (query.categoryId){
            const { data } = await getClient().query({
                query: GetProductsByCategoryDocument,
                variables: {
                    categoryId: Number.parseInt(query?.categoryId)
                }
            });
            return data
        }
    } catch (error) {
    console.log("Something went wrong.", error)
    }
}
