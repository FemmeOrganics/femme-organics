// import { GetCategoryDocument } from "@/graphql"

import { getClient } from "@/lib/graphql/ApolloClient"
import SizeForm from "./Components/SizeForm"
import { GetSizeDocument } from "@/graphql"
import { SizeColumn } from "../components/Columns"
type Props = {
  params: {
    storeId: string
    sizeId: string;
  }
}

const page = async ({ params: { storeId, sizeId } }: Props) => {
  let size: any = undefined
  try {
    const { data: catData } = await getClient().query({
      query: GetSizeDocument,
      variables: { sizeId: Number.parseInt(sizeId) }
    })
    size = catData?.size
  } catch (error) {
    console.log(error)
  }

  return (
    <div className="flex-1 space-y-4 pt-1">
      <SizeForm initialData={size} />
    </div>
  )
}

export default page