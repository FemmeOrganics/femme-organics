"use client"
import { AddLocationDocument, UpdateLocationDocument, type GetLocationQuery } from "@/__gql__/graphql"
import { Button } from "@/src/components/ui/button"
import { DialogWrapper } from "@/src/components/ui/dialog-wrapper"
import { Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { useLocationDialog } from "@/src/hooks/use-location-dialog"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import {useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


const formschema = z.object({
    address: z.string().min(1, {message: "Address is required"})
})

type FormValuesType = z.infer<typeof formschema>

export const LocationForm = () => {
    const addLocationDialog = useLocationDialog()
    const router = useRouter()
    const initialData = useMemo(() => {
        return addLocationDialog.data
    }, [addLocationDialog.data])
    const [addZoneLocation, {loading: addingLocation, data: addData}] = useMutation(AddLocationDocument)
    const [updateZoneLocation, {loading: updatingLocation, data: updateData}] = useMutation(UpdateLocationDocument)

    const form = useForm<FormValuesType>({defaultValues: {address: initialData?.location?.address ?? ""}})

    const onSubmit = (data: FormValuesType) => {
        const fn = async () => {
            if(!initialData.zoneId) {
                toast.error("Zone ID is required to create a location.")
                return
            }
            if(initialData?.location) {
                await updateZoneLocation({
                    variables: {
                        locationId: initialData.location.id,
                        payload: {
                            address: data.address,
                        }
                    },
                })
            } else{
                await addZoneLocation({variables: {
                    location: {
                        address: data.address,
                        zoneId: initialData.zoneId
                    }
                }})
            }
        }
        toast.promise(fn(), 
        {
            loading: `${initialData.location ? "Updating" : "Creating new"} location.`,
            success: () => {
                addLocationDialog.onClose()
                form.reset()
                router.refresh()
                return `${initialData.location ? "Update": "Create new"} Location was successful.`
            },
            error: (error) => {
                console.log(error)
                return `An error occured while ${initialData.location ? "Updating" : "Creating new"} location`}
        })
      
    }

    useEffect(() => {
        if (initialData.location){
            form.setValue("address", initialData.location?.address ?? "")
        }
    }, [initialData.location, form])

    return (
        <DialogWrapper
            isOpen={addLocationDialog.isOpen}
            title={`${initialData.location ? "Edit" : "Add New"} Location`}
            description=""
            onClose={addLocationDialog.onClose}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Location Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Location address" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex space-x-3 justify-end">
                        <Button type="button" onClick={() => addLocationDialog.onClose()}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {initialData.location ? "Save Changes" : "Create Location"}
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogWrapper>
    )
}
