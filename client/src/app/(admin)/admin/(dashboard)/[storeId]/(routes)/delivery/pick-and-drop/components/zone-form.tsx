"use client"
import { AddZoneDocument, UpdateZoneDocument } from "@/__gql__/graphql"
import { Button } from "@/src/components/ui/button"
import { DialogWrapper } from "@/src/components/ui/dialog-wrapper"
import { Form, 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { useZoneDialog } from "@/src/hooks/use-zone-dialog"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import {useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"


const formschema = z.object({
    name: z.string().min(1, {message: "Zone name is required"}),
    standardTime: z.string().min(1, {message: "Zone's standard time is required."}),
    standardPrice: z.number().min(1, {message: "Zone's Standard price is required."}),
    expressPrice: z.number().min(1, {message: "Zone's Express price is required."})
})

type FormValuesType = z.infer<typeof formschema>

export const ZoneForm = () => {
    const zoneDialog = useZoneDialog()
    const router = useRouter()
    const initialData = useMemo(() => {
        return zoneDialog.data
    }, [zoneDialog.data])
    const [addZone, {loading: addingLocation, data: addData}] = useMutation(AddZoneDocument)
    const [updateZone, {loading: updatingLocation, data: updateData}] = useMutation(UpdateZoneDocument)

    const form = useForm<FormValuesType>({defaultValues: {
        name: initialData?.name ?? "", 
        standardPrice: initialData?.standardPrice ?? "",
        standardTime: initialData?.standardTime ?? "",
        expressPrice: initialData?.expressPrice ?? ""
    }})

    const onSubmit = (data: FormValuesType) => {
        const fn = async () => {
            if(initialData) {
                await updateZone({
                    variables: {
                        zoneId: initialData.id,
                        payload: {
                            ...data
                        }
                    },
                })
            } else {
                await addZone({variables: {
                    zone: {
                        ...data
                    }
                }})
            }
        }
        toast.promise(fn(), 
        {
            loading: `${initialData ? "Updating" : "Creating new"} zone.`,
            success: () => {
                zoneDialog.onClose()
                form.reset()
                router.refresh()
                return `${initialData ? "Update": "Create new"} zone was successful.`
            },
            error: (error) => {
                console.log(error)
                return `An error occured while ${initialData ? "Updating" : "Creating new"} zone`}
        })
      
    }

    useEffect(() => {
        if (initialData){
            form.setValue("name", initialData.name)
            form.setValue("standardPrice", initialData.standardPrice)
            form.setValue("standardTime", initialData.standardTime)
            form.setValue("expressPrice", initialData.expressPrice)
        }
    }, [initialData, form])

    return (
        <DialogWrapper
            isOpen={zoneDialog.isOpen}
            title={`${initialData ? "Edit" : "Add New"} Zone`}
            description=""
            onClose={zoneDialog.onClose}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Zone name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="standardTime"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Standard Time</FormLabel>
                                <FormControl>
                                    <Input placeholder="Standard time" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="standardPrice"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Standard Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Standard price" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expressPrice"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Express price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Express price" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex space-x-3 justify-end">
                        <Button type="button" onClick={() => zoneDialog.onClose()}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {initialData ? "Save Changes" : "Create Location"}
                        </Button>
                    </div>
                </form>
            </Form>
        </DialogWrapper>
    )
}
