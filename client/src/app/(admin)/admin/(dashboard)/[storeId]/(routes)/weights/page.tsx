import { format } from 'date-fns'

import SizeClient from './components/SizeClient'
import { getClient } from "@/lib/graphql/ApolloClient"
import { SizeColumn } from './components/Columns'
import { GetSizesDocument } from "@/graphql"

type Props = {
  params: {
    storeId: string
  }
}

async function SizesPage({ params: { storeId } }: Props) {
  let formattedSizes: SizeColumn[] = []
  try {
    const { data } = await getClient().query({
      query: GetSizesDocument,
      variables: { storeId: Number.parseInt(storeId) }
    })
    formattedSizes = data.sizes?.map((item) => ({
      id: item?.id,
      name: item?.name,
      value: item?.value,
      updatedAt: format(new Date(item?.updatedAt), "MMMM do, yyyy")
    })) as SizeColumn[]

  } catch (error) {
    console.log(error)
  }

  return (
    <div className="flex-1 h-full">
      <SizeClient sizes={formattedSizes} />
    </div>
  )
}

export default SizesPage