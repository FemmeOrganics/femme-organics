
import { getClient } from "@/lib/graphql/ApolloClient"
import CategoryForm from "./Components/CategoryForm"
import {  GetCategoryDocument } from "@/graphql"


type Props = {
  params: {
    storeId: string
    categoryId: string;
  }
}

const page = async ({ params: { storeId, categoryId } }: Props) => {
  let category = null
    try {
      const { data: catData } = await getClient().query({
        query: GetCategoryDocument,
        variables: { categoryId: Number.parseInt(categoryId) }
      });
      category = catData?.category
    } catch(error){
      console.info("Something went wrong")
    }

  return (
    <div className="flex-1 space-y-4 pt-1">
      <CategoryForm initialData={category} />
    </div>
  )
}

export default page