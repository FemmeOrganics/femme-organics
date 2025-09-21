"use client"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { cn, formatter } from "@/src/lib/utils"
import { CheckIcon } from "lucide-react"
import type {  GetPickupMtaanisQuery, GetZonesQuery } from "@/__gql__/graphql"
import type { DeliveryAddressFormType } from "./add-delivery-form"
import type {UseFormReturn} from "react-hook-form"
import { useState } from "react"

export const PickupMtaani = ({pickupMtaanis, form}: {pickupMtaanis:  GetPickupMtaanisQuery["pickupMtaanis"], form: UseFormReturn<DeliveryAddressFormType>}) => {
  const [selected, setSelected] = useState(0)

  const onSelect = (value: number) => {
    setSelected(value)
    form.setValue("pickupMtaaniId",  value)
  }

  return (
    <Command>
      <CommandInput placeholder="Search for delivery location." />
      <CommandList>
        <p className="px-2 text-muted-foreground text-center">Pickup Mtaani agent near you</p>
        <CommandEmpty>No results found.</CommandEmpty>
        {pickupMtaanis?.map((location) =>
            <CommandItem 
              className="flex items-center"
              onSelect={() => onSelect(location.id)} key={location?.id}
            >
            <div className="flex items-center flex-1">
                <p className="line-clamp-2 ">{location?.locationName}</p>
                <span className="ml-auto">{formatter.format(location.deliveryFee ?? "N/A")}</span>
              </div>
              {
                location.id === selected &&  <CheckIcon className={cn("ml-auto h-4 w-4")} />
              }
            </CommandItem>
        )}
      </CommandList>
    </Command>
  )
}