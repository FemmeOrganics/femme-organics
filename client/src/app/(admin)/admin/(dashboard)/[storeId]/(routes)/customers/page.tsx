
import { getClient } from "@/lib/graphql/ApolloClient"
import { GetCustomersDocument, GetCustomersQuery, } from "@/graphql"
import { CustomerClient } from "./components/CustomerClient"


async function OrdersPage() {
  let customers: GetCustomersQuery["customers"] = []
  try {
    const { data } = await getClient().query({
      query: GetCustomersDocument,
    })

    customers = data.customers
  } catch (error) {
    console.log("Something went wrong.")
  }


  return (
    <div className="flex-1 space-y-4 h-full">
      <CustomerClient customers={customers} />
    </div>
  )
}

export default OrdersPage