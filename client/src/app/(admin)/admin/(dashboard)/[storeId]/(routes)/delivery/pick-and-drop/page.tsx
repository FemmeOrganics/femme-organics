import { GetZonesDocument } from "@/__gql__/graphql"
import { getClient } from "@/src/lib/graphql/ApolloClient"
import { ZonesClient } from "./components/zones-client"
const page = async  () => {
  const {data} = await getClient().query({query: GetZonesDocument})
  return (
    <div className="flex-1 h-full p-4">
      <ZonesClient zones={data.zones} />
    </div>
  )
}

export default page