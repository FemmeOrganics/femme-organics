"use client"
import {  type GetZonesQuery, GetDeliveryAddressesDocument, DeliveryAddressType, OrderType, GetPickupMtaanisDocument, GetPickupMtaanisQuery } from "@/__gql__/graphql"

import { useCheckoutStore } from "../store"
import {  HandIcon, MessageSquarePlusIcon, PhoneCallIcon, TruckIcon } from "lucide-react"
import { skipToken, useSuspenseQuery } from "@apollo/client"
import { useAuth } from "@/src/lib/customer-auth"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Label } from "@/src/components/ui/label"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { DeliveryFormDialog, DeliveryFormDrawer, useDeliveryFormDialog, useDeliveryFormDrawer } from "./add-delivery-form"
import { useScreenSize } from "@/src/hooks/use-screen-size"
import { formatter } from "@/src/lib/utils"

  
export const DeliveryAddress = ({pickAndDrop, pickupMtaanis}: {pickAndDrop: GetZonesQuery["zones"],  pickupMtaanis: GetPickupMtaanisQuery["pickupMtaanis"]}) => {
    const [orderType, deliveryAddress, setOrderType, setDeliveryAddress] = useCheckoutStore((state) => [state.orderType, state.deliveryAddress, state.setOrderType, state.setDeliveryAddress])
    const deliveryAddressDialog = useDeliveryFormDialog()
    const drawer = useDeliveryFormDrawer()
    const {user} = useAuth()

    const {data: deliveryAddressData} = useSuspenseQuery(GetDeliveryAddressesDocument, user?.customerId ? {variables: {
      customerId: user?.customerId
    }}: skipToken)

    const {isSm} = useScreenSize()


    const onAddLocation = () => {
      console.log(isSm)
      if (isSm){ drawer.onOpen()}
      else  {deliveryAddressDialog.onOpen()}
    }

    return (
      <div className="space-y-2">
        <DeliveryFormDialog pickAndDrop={pickAndDrop} pickupMtaanis={pickupMtaanis}/>
        <DeliveryFormDrawer pickAndDrop={pickAndDrop} pickupMtaanis={pickupMtaanis}/>
      <Card className="relative p-2">
          <RadioGroup
            className="flex"
            onValueChange={(value) =>
              setOrderType(value as OrderType)
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                checked={orderType === "delivery"}
                value="delivery"
                id="r2"
              />
              <TruckIcon />
              <Label htmlFor="r2">Delivered by Organics</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                checked={orderType === "selfCollect"}
                id="r3"
                value="selfCollect"
              />
              <HandIcon />
              <Label htmlFor="r3">Self Collect</Label>
            </div>
          </RadioGroup>
        </Card>
        {orderType === "delivery" && 
          <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between w-full p-2">
            <span className="font-semibold text-1.5xl">
              Select delivery Locations
            </span>
            <Button onClick={onAddLocation} variant={"link"} className="font-semibold text-blue-400">
              Add new location
            </Button>
          </CardHeader>
          <CardContent>
            <RadioGroup className="flex flex-col space-y-2" 
              onValueChange={(value) =>
                setDeliveryAddress(deliveryAddressData?.deliveryAddresses?.find((address) => address.id === Number.parseInt(value)))
              }
            >
              {deliveryAddressData?.deliveryAddresses?.map((address) =>
              <div key={address.id} className="flex items-center space-x-2 bg-slate-50 p-2 rounded-sm">
                <RadioGroupItem
                  value={address.id.toString()}
                  checked={address.id === deliveryAddress?.id}
                  id={address.id.toString()}
                />
                <Label htmlFor={address.id.toString()} className="text-sm w-full">
                  {address.type === DeliveryAddressType.Custom && 
                  <div>
                    <div className="flex items-center">
                      <p className="line-clamp-2 ">{address.address}</p>

                      <span className="ml-auto">{formatter.format(address?.deliveryFee ?? "N/A")}</span>
                    </div>
                    <p className="line-clamp-2">{address.address}</p>
                    <p>{address.phoneNumber}</p>
                    <p className="text-slate-400">{address.type?.replaceAll("_", " ").toLowerCase()}</p>
                  </div>}
                  {address.type === DeliveryAddressType.PickAndDrop && 
                  <div>
                    <div className="flex items-center">
                      <p className="line-clamp-2 ">{address.deliveryZoneLocation?.address}</p>
                      <span className="ml-auto">{formatter.format(address.deliveryZoneLocation?.zone?.standardPrice ?? "N/A")}</span>
                    </div>
                    <p>{address.phoneNumber}</p>
                    <p className="text-slate-400">{address.type?.replaceAll("_", " ").toLowerCase()}</p>
                  </div>}
                  {address.type === DeliveryAddressType.PickupMtaani && 
                  <div>
                    <div className="flex items-center">
                      <p className="line-clamp-2 ">{address.deliveryPickupMtaani?.locationName}</p>
                      <span className="ml-auto">{formatter.format(address.deliveryPickupMtaani?.deliveryFee ?? "N/A")}</span>
                    </div>

                    <p className="line-clamp-2">{address.deliveryZoneLocation?.address}</p>
                    <p>{address.phoneNumber}</p>
                    <p className="text-slate-400">{address.type?.replaceAll("_", " ").toLowerCase()}</p>
                  </div>}
                </Label>
              </div>
                
              )}
            </RadioGroup>
          </CardContent>
        </Card>
        }
        {orderType === "selfCollect" && 
          <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between w-full p-2">
            <span className="font-semibold text-1.5xl">
              We are located at
            </span>
          </CardHeader>
          <CardContent className="p-2 flex flex-col space0y-2">
            <p>Shop F4, 1st Flr Lake Turkana Business Center opposite smother&lsquo;s dishes.</p>
            <div className="flex items-center space-x-2"><PhoneCallIcon/> <p>+2547 26 516 606</p> </div>
            <div className="flex items-center space-x-2"><MessageSquarePlusIcon/> <p>+2547 26 516 606</p> </div>
          </CardContent>
        </Card>
        }
        
      </div>
    )
  }
  