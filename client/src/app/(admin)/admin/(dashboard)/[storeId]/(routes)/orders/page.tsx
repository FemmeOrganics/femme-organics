
import OrderClient from './components/OrderClient'
import { getClient } from "@/lib/graphql/ApolloClient"
import { GetOrdersDocument, GetOrdersQuery } from "@/graphql"

async function OrdersPage() {
  let formattedOrders: GetOrdersQuery["orders"] = []
  try {
    const { data } = await getClient().query({
      query: GetOrdersDocument,
    })

    formattedOrders = data.orders
  } catch (error) {
    console.log("Something went wrong.")
  }


  return (
    <div className="flex-1 space-y-4 h-full">
 <OrderClient orders={formattedOrders} />
      
    </div>
  )
}

export default OrdersPage