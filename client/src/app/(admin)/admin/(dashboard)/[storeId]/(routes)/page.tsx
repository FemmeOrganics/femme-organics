
import Heading from "@/components/ui/Heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatter } from "@/lib/utils"
import { CreditCard, DollarSign, Package } from "lucide-react"
import { getTotalRevenue } from "@/app/actions/get-total-revenue"
import { getSalesCount } from "@/app/actions/get-sales-count"
import { getStocksCount } from "@/app/actions/get-stock-count"
import {RevenueGraph} from "@/components/Overview"
import { getGraphRevenue } from "@/app/actions/get-graph-data"

import { getClient } from "@/lib/graphql/ApolloClient"
import { GetOrdersDocument, OrderPaymentStatusType } from "@/graphql"
import { ScrollArea } from '@/components/ui/scroll-area';


interface DashBoardProps {
  params: { storeId: string }
}

const DashBoardPage: React.FC<DashBoardProps> = async ({
  params
}) => {
  const { data } = await getClient().query({
    query: GetOrdersDocument
  })

  // const data = {orders: []}



  const paidOrders = data?.orders?.filter((order) => order?.paymentStatus === OrderPaymentStatusType.Full) 
  let totalRevenue: number
  let salesCount: number
  let stockCount: number
  let graphRevenue: unknown
  if(paidOrders){
     totalRevenue = await getTotalRevenue(paidOrders)
     salesCount = await getSalesCount(paidOrders)
     stockCount = await getStocksCount(params.storeId)
     graphRevenue = await getGraphRevenue(paidOrders)
  }



  return (
    <div className="flex-col h-full">
        <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50  px-2  py-1">
          <Heading title="Dashboard" description="Overview of your store" />
        </div>
        <ScrollArea className="h-full px-2 flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <div className="grid gap-4 grid-cols-3">
                <Card className="glassy">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground"/>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatter.format(totalRevenue ?? 0)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Sales
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground"/>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      +{salesCount.toString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Products In Stock
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground"/>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      N/A
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="col-span-4">
                <CardHeader className=" py-2">
                  <CardTitle>
                    Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2 ">
                  <RevenueGraph data={graphRevenue} />
                </CardContent>
              </Card>
            </div>
            <div className='mb-20'/>
        </ScrollArea>
    </div>
  )
}

export default DashBoardPage