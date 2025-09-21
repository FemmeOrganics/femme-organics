"use client"
import { AddDeliveryAddressDocument, DeliveryAddressType, GetDeliveryAddressesDocument, GetPickupMtaanisQuery, type GetZonesQuery, } from "@/__gql__/graphql"
import { LocationWidget } from "@/src/components/location-widget"
import { validateNumber } from "@/src/components/PhoneNumberInput"
import { Button } from "@/src/components/ui/button"
import { CustomFormLabel } from "@/src/components/ui/CustomFormLabel"
import { DialogWrapper } from "@/src/components/ui/dialog-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { useMutation } from "@apollo/client"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { create } from "zustand";
import { PickAndDrop } from "./pick-and-drop"
import { Card } from "@/src/components/ui/card"
import { useAuth } from "@/src/lib/customer-auth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DialogClose } from "@radix-ui/react-dialog"
import { useScreenSize } from "@/src/hooks/use-screen-size"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { DrawerWrapper } from "@/src/components/ui/drawer-wrapper"
import { PickupMtaani } from "./pickup-mtaani"

import { calculateDeliveryFee, calculateUserDeliveryFee } from "@/src/lib/get-distance"
import { Coordinate } from "recharts/types/util/types"
import { formatter } from "@/src/lib/utils"


interface ZoneDialogProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useDeliveryFormDialog = create<ZoneDialogProps>((set) => ({
    isOpen: false,
    onOpen:() => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}))

export const DeliveryFormDialog = ({pickAndDrop, pickupMtaanis}: {pickAndDrop: GetZonesQuery["zones"],  pickupMtaanis: GetPickupMtaanisQuery["pickupMtaanis"]}) => {
    const deliveryDialog = useDeliveryFormDialog()
    const initialData = null
    return   (   
    <DialogWrapper
        isOpen={deliveryDialog.isOpen}
        title={`${initialData ? "Edit" : "Add New"} Delivery Location`}
        description=""
        onClose={deliveryDialog.onClose}
        className="min-h-[300px]"
    >
        <DeliveryForm pickupMtaanis={pickupMtaanis} pickAndDrop={pickAndDrop}/>
    </DialogWrapper>)
}

interface DeliveryFormDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useDeliveryFormDrawer = create<DeliveryFormDrawerProps>((set) => ({
    isOpen: false,
    onOpen:() => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}))


export const DeliveryFormDrawer = ({pickAndDrop,  pickupMtaanis}: {pickAndDrop: GetZonesQuery["zones"],  pickupMtaanis: GetPickupMtaanisQuery["pickupMtaanis"]}) => {
    const drawer = useDeliveryFormDrawer()
    const initialData = null
    return   (   
    <DrawerWrapper
        isOpen={drawer.isOpen}
        title={`${initialData ? "Edit" : "Add New"} Delivery Location`}
        description=""
        onClose={drawer.onClose}
    >
        <div className="h-[80vh] w-full">
            <ScrollArea className="h-full px-2 py-5">
                <DeliveryForm pickupMtaanis={pickupMtaanis} pickAndDrop={pickAndDrop}/>
            </ScrollArea >
        </div>
    </DrawerWrapper>)
}

const addressSchema = z.object({
    latLng: z.object({
      lat: z.number({ required_error: "Business Location is required" }),
      lng: z.number({ required_error: "Business Location is required" }),
    }),
    address: z.string().min(1, { message: "Business Location is required" }),
    locationId: z.string().min(1, { message: "Business Location is required" }),
  });
  
  const deliveryFormSchema = z.object({
    code: z.string().optional(),
    phone: z.string().min(7, {message: "phone number is required"}),
    name: z.string().min(1, {message: "Name is required"}),
    address: addressSchema.optional(),
    zoneLocationId: z.number().optional(),
    pickupMtaaniId: z.number().optional(),
  })

export type DeliveryAddressFormType = z.infer<typeof deliveryFormSchema>

export const DeliveryForm = ({pickAndDrop, pickupMtaanis}: {pickAndDrop: GetZonesQuery["zones"],  pickupMtaanis: GetPickupMtaanisQuery["pickupMtaanis"]}) => {
    const [deliveryType, setDeliveryType] = useState<DeliveryAddressType.PickAndDrop | DeliveryAddressType.Custom| DeliveryAddressType.PickupMtaani>(DeliveryAddressType.PickAndDrop)
    const {user} = useAuth()
    const deliveryDialog = useDeliveryFormDialog()
    const drawer = useDeliveryFormDrawer()
    const initialData = undefined
    const router = useRouter()
    const {isSm} = useScreenSize()
    const [calculatedDeliveryFee, setCalculatedDeliveryFee] = useState({distance: 0, fee: 0})

    const [addDeliveryAddresss] = useMutation(AddDeliveryAddressDocument, {
        refetchQueries: [GetDeliveryAddressesDocument]
    })

    const form = useForm<DeliveryAddressFormType>(
        {
            resolver: zodResolver(deliveryFormSchema),
            defaultValues: {
                name: user?.name ?? "",
                phone: user?.phoneNumber?.slice(-9)
            }
        }
    )

    const onSubmit = (data: DeliveryAddressFormType) => {
        console.log("DATA", data, "DELIVERY TYPE", deliveryType)
        const phoneNumber = validateNumber({code: data.code, phoneNumber: data.phone})
        const fn = async () => {
            if(deliveryType === DeliveryAddressType.PickAndDrop && data.zoneLocationId){
                 await addDeliveryAddresss({
                    variables: {
                      deliveryAddress: {
                        type: DeliveryAddressType.PickAndDrop,
                        phoneNumber,
                        name: data.name,
                        zoneLocationId: data.zoneLocationId,
                      },
                    }
                  });
            }

            if(deliveryType === DeliveryAddressType.PickupMtaani && data.pickupMtaaniId){
                await addDeliveryAddresss({variables: {
                    deliveryAddress: {
                        type: DeliveryAddressType.PickupMtaani,
                        phoneNumber,
                        name: data.name,
                        pickupMtaaniId: data.pickupMtaaniId,
                    }
                }})
            }

            if(deliveryType === DeliveryAddressType.Custom && data.address){
                await addDeliveryAddresss({variables: {
                    deliveryAddress: {
                        type: DeliveryAddressType.Custom,
                        phoneNumber,
                        name: data.name,
                        customAddress: {
                            lat: data.address.latLng.lat,
                            lng: data.address.latLng.lng,
                            address: data.address.address,
                            locationId: data.address.locationId,
                            deliveryFee: calculatedDeliveryFee.fee
                        }
                    }
                }})
            }
            router.refresh()
        }
        toast.promise(fn(), 
        {
            loading: `${initialData ? "Updating" : "Creating new"} delivery address.`,
            success: () => {
                deliveryDialog.onClose()
                drawer.onClose()
                form.reset()
                return `${initialData ? "Update": "Create new"} delivery address was successful.`
            },
            error: (error) => {
                console.log(error)
                return `An error occured while ${initialData ? "Updating" : "Creating new"} delivery address`}
        })
      
    }

    async function onAddressChange({
        latLng,
        address,
        locationId,
      }: {
        latLng: google.maps.LatLngLiteral;
        address: string;
        locationId: string;
      }) {

        console.log({
            latLng,
            address,
            locationId,
        })

        const result = await calculateUserDeliveryFee({userLocation: latLng});
        setCalculatedDeliveryFee({
            distance: parseFloat(result.distance),
            fee: parseFloat(result.fee),
        });

        form.setValue("address", {
          latLng,
          address,
          locationId,
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                <div className="space-y-2">
                    <CustomFormLabel title='Phone number' description=''/>
                        <div className="flex space-x-1">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormControl >
                                        <Input
                                            disabled
                                            placeholder="+254"
                                            type="number"
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="focus-visible:ring-0 w-20"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl >
                                        <Input
                                            placeholder="7XXXXXXXX"
                                            type="number"
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="focus-visible:ring-0 flex-1"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="">
                            <CustomFormLabel title='Name' description=''/>
                            <FormControl>
                                <Input
                                    placeholder="Person to receive the order."
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="focus-visible:ring-0"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Tabs defaultValue={deliveryType} className="p-0" onValueChange={(value) => setDeliveryType(value as DeliveryAddressType)}>
                    <TabsList className="w-full">
                    <TabsTrigger value={DeliveryAddressType.PickAndDrop} className="w-full">
                        Pick & Drop
                    </TabsTrigger>
                    <TabsTrigger value={DeliveryAddressType.PickupMtaani}   className="w-full">
                        Pick up Mtaani
                    </TabsTrigger>
                    <TabsTrigger value={DeliveryAddressType.Custom}  className="w-full">
                        Your Own
                    </TabsTrigger>
                    </TabsList>
                    <TabsContent value={DeliveryAddressType.PickAndDrop} className="min-h-[250px] max-h-[250px] p-0">
                        <Card className="min-h-[250px] max-h-[250px] p-2">
                            <PickAndDrop pickAndDrop={pickAndDrop} form={form}/>
                        </Card>
                    </TabsContent>
                    <TabsContent value={DeliveryAddressType.PickupMtaani}   className="min-h-[250px] max-h-[250px] p-0" >
                        <Card className="min-h-[250px] max-h-[250px] p-2">
                            <PickupMtaani form={form} pickupMtaanis={pickupMtaanis}/>
                        </Card>
                    </TabsContent>
                    <TabsContent value={DeliveryAddressType.Custom}  className="min-h-[300px] max-h-[350px] p-0">
                        <Card className="min-h-[300px] max-h-[350px] p-2 space-y-2">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                <FormItem className="w-full space-y-1">
                                    <FormLabel className="text-[#002C53] text-sm">
                                    Enter Location
                                    </FormLabel>
                                    <FormControl>
                                    <LocationWidget
                                        onAddressChange={(e) => {
                                        onAddressChange(e);
                                        }}
                                        showAutoComplete
                                        showMap
                                        className="rounded-none h-[150px]"
                                        mapLabel="Please a landmark close to your location."
                                        {...field}
                                    />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            <div className="rounded-md bg-slate-100 space-y-2 p-2">
                                <div className="flex space-x-3"><span>Distance</span> <span>{calculatedDeliveryFee.distance}</span></div>
                                <div className="flex space-x-3"><span>Delivery Fee</span> <span> {formatter.format(calculatedDeliveryFee.fee)}</span> </div>
                            </div>
                        </Card>
                        
                    </TabsContent>
                </Tabs>
                <div className="flex space-x-3 justify-end sticky">
                    {!isSm &&  
                    <DialogClose>
                        <Button type="button">
                            Cancel
                        </Button>
                    </DialogClose>}
                   
                    <Button type="submit">
                        {initialData ? "Save Changes" : "Add Address"}
                    </Button>
                </div>
                <div className="h-20"/>
            </form>
        </Form>
    )
}
