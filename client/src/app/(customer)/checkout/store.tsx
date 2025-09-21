import {create} from "zustand"
import { DeliveryAddress, DeliveryAddressType, type GetDeliveryAddressesQuery, type GetZoneQuery, type OrderType } from "@/__gql__/graphql";
import { OrderType as OrderTypeValue } from "@/__gql__/graphql";
type PickAndDrop  = {
    zone: GetZoneQuery["zone"]
    location: {
        id: number;
        address: string;
    }
}

interface CheckoutState {
    orderType: OrderType;
    deliveryAddress?: NonNullable<GetDeliveryAddressesQuery["deliveryAddresses"]>[0]
}

interface CheckoutActions {
    setOrderType: ( orderType: OrderType) => void
    setDeliveryAddress: (deliveryAddress: CheckoutState["deliveryAddress"]) => void
}

export const useCheckoutStore = create<CheckoutActions & CheckoutState>((set) => ({
    orderType: OrderTypeValue.SelfCollect,
    setOrderType: ( orderType: OrderType) => set({orderType}),
    setDeliveryAddress: (deliveryAddress: CheckoutState["deliveryAddress"]) => {
        set({deliveryAddress})
    }
}))