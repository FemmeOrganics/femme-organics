import { GetProductsWithCategoryDocument, type GetProductsWithCategoryQuery } from "@/__gql__/graphql";
import { getClient } from "@/src/lib/graphql/ApolloClient";
interface PromiseProps {
    productsWithCategory?: GetProductsWithCategoryQuery["productsWithCategory"]
}

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

export const getProductsWithCategory = async (query: Query): Promise<PromiseProps | undefined > => {
try {
        const { data } = await getClient().query({
            query: GetProductsWithCategoryDocument,
        });
        return data
      } catch (error) {
        console.log("Something went wrong.", error)
      }
}
