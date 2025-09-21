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
import type {  GetZonesQuery } from "@/__gql__/graphql"
import type { DeliveryAddressFormType } from "./add-delivery-form"
import type {UseFormReturn} from "react-hook-form"
import { useState } from "react"

export const PickAndDrop = ({pickAndDrop, form}: {pickAndDrop: GetZonesQuery["zones"], form: UseFormReturn<DeliveryAddressFormType>}) => {
  const [selected, setSelected] = useState(0)

  const onSelect = (value: number) => {
    setSelected(value)
    form.setValue("zoneLocationId",  value)
  }

  return (
    <Command>
      <CommandInput placeholder="Search for delivery location." />
      <CommandList>
        <p className="px-2 text-muted-foreground text-center">Delivery by a rider</p>
        <CommandEmpty>No results found.</CommandEmpty>
        {pickAndDrop?.map((zone) =>
          <div key={zone.id}>
            <CommandGroup  heading={
              <div className="flex">
                <p className="w-10">{zone.standardTime}</p>
              </div>}>
              {zone.locations?.map((location) => 
              <CommandItem 
                className="flex items-center"
                onSelect={() => onSelect(location.id)} key={location?.id}
              >
                 <div className="flex items-center flex-1">
                    <p className="line-clamp-2 ">{location?.address}</p>
                    <span className="ml-auto">{formatter.format(zone.expressPrice ?? "N/A")}</span>
                  </div>
                {
                  location.id === selected &&  <CheckIcon className={cn("ml-auto h-4 w-4")} />
                }
              </CommandItem>)}
            </CommandGroup>
            <CommandSeparator />
          </div>
        )}
      </CommandList>
    </Command>
  )
}