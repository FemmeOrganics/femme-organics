import { GetBillboardDocument, type GetBillboardQuery } from "@/__gql__/graphql"
import { getClient } from "@/src/lib/graphql/ApolloClient"
interface PromiseProps {
    billboard: GetBillboardQuery["billboard"]
}
export const getBillboard = async (): Promise<PromiseProps | undefined> => {
    try {
        const { data } = await getClient().query({
            query: GetBillboardDocument,
            variables: { billboardId:1 }
        });

        return data
      } catch (error) {
        console.log("Something went wrong.", error)
      }
}

