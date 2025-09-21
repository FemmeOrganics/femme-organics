import { GetPickupMtaanisDocument, GetZonesDocument } from "@/__gql__/graphql"
import { getClient } from "@/src/lib/graphql/ApolloClient"
import Summary from "./components/summary"
import { Container } from "@/src/components/ui/Container"
import { DeliveryAddress } from "./components/Delivery"
import { Card } from "@/src/components/ui/card"

const page = async () => {
    const {data: pickAndDrop} = await getClient().query(
        {query: GetZonesDocument}
    )
    const {data: {pickupMtaanis}} = await getClient().query(
        {query: GetPickupMtaanisDocument}
    )
    return (
        <Container>
            <h1 className="font-bold text-2xl my-2">Checkout</h1>
            <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 space-y-4 md:space-y-0 lg:space-x-4 relative">
                <div className="lg:col-span-6">
                    <DeliveryAddress pickAndDrop={pickAndDrop?.zones ?? []} pickupMtaanis={pickupMtaanis ?? []}/>
                </div>
                <Card className="lg:col-span-6 p-4 sticky top-14">
                    <Summary />
                </Card>
            </div>
        </Container>
       
    )
}

export default page