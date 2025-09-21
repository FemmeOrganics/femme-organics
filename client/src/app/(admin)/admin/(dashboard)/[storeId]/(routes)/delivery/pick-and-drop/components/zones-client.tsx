"use client"
import { DeleteZoneDocument, type GetLocationQuery, type GetZonesQuery } from "@/__gql__/graphql"
import { Accordion, AccordionItem } from "@/components/ui/accordion"
import { CustomTrigger } from "@/components/ui/custom-accordion-trigger"
import { DataTable } from "@/components/ui/DataTable"
import { AccordionContent } from "@radix-ui/react-accordion"
import { useState } from "react"
import { columns } from "./columns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatter } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Edit3Icon, PlusCircleIcon, PlusIcon, Trash2, Trash2Icon } from "lucide-react"
import { useLocationDialog } from "@/hooks/use-location-dialog"
import { LocationForm } from "./location-form"
import { capitalize } from "@/src/lib/clean-string"
import type { ColumnDef } from "@tanstack/react-table"
import { useZoneDialog } from "@/src/hooks/use-zone-dialog"
import { ZoneForm } from "./zone-form"
import { useMutation } from "@apollo/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import Heading from "@/components/ui/Heading"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const ZonesClient = ({zones}: {zones: GetZonesQuery["zones"]}) => {
    const [value, setValue] = useState<string | null>(null);
    const locationDialog = useLocationDialog()
    const [deleteZone] = useMutation(DeleteZoneDocument)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const zoneDialog = useZoneDialog()
    const handleToggle = (index: string) => {
        setValue(value === index ? null : index);
      };

    const onDelete = (zoneId: number) => {
        const fn = async () => {
            if(zoneId) {
            await deleteZone({
                variables: {
                zoneId: zoneId
                }
            })
            }
        }

        toast.promise(fn(), {
            loading: "Deleting",
            success: () => {
                setOpen(false)
                router.refresh()
                return "Deleted successfully"
            },
            error: () => {
                return "There was an error deleting the location"
            }
        })
    
    }
    
  return (
    <ScrollArea className="h-full relative">
        <LocationForm />
        <ZoneForm />
        <Card className="rounded-md h-full w-full justify-between items-center  px-0">
            <CardHeader>
                <CardTitle className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50  px-2  py-1">
                    <Heading
                        title={`Pick and Drop (${zones?.length})`}
                        description="Manage Pick & Drop zones and locations"
                    />
                    <Button variant={"default"} className="space-x-2" onClick={() => zoneDialog.onOpen()}>
                        <PlusCircleIcon size={"20"} />
                        <p>Add Zone</p>
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full grid-cols-[200px_200px_200px_1fr_1fr] items-center text-left font-semibold text-md bg-slate-100 bg-muted/80 dark:bg-muted/50 p-2">
                    <p>Name</p>
                    <p>Standard Time</p>
                    <p>Standard Price</p>
                    <p>Express Price</p>
                    <p>Actions</p>
                </div>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full py-2"
                >
                    {zones.map((zone) => 
                        <AccordionItem value={zone.id.toString()} key={zone.id}>
                            <CustomTrigger
                                onClick={() => handleToggle(zone.id.toString())}
                                className="hover:no-underline"
                                showTrigger={!!zone.locations?.length}
                            >
                                <div className="grid w-full grid-cols-[200px_200px_200px_1fr_1fr] items-center text-left text-sm p-2">
                                    <p>{capitalize(zone.name)}</p>
                                    <p>{zone.standardTime}</p>
                                    <p>{formatter.format(zone.standardPrice)}</p>
                                    <p>{formatter.format(zone.expressPrice)}</p>
                                    <div className="flex space-x-3">
                                        <Button variant={"outline"} className="space-x-2" onClick={(e) => {e.stopPropagation(); locationDialog.onOpen({zoneId: zone.id})}}>
                                            <PlusCircleIcon size={"20"} />
                                            <p>Add Location</p> 
                                        </Button>
                                        <Button variant="ghost" size="icon" className="" onClick={(e) => {e.stopPropagation(); zoneDialog.onOpen(zone)}}>
                                            <Edit3Icon size="20"/>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Location</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                Are you sure you want to delete &quot;{zone.name}&quot;? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                onClick={() => onDelete(zone.id)}
                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </CustomTrigger>
                            <AccordionContent className="bg-slate-100 dark:bg-muted/50 p-2">
                                {zone.locations?.length && <DataTable columns={columns as unknown as ColumnDef<GetLocationQuery["location"] | unknown>[]} data={zone.locations.length ? zone.locations : []} searchKey={"address"} />}
                            </AccordionContent>
                        
                    </AccordionItem>
                )}
                    

                </Accordion>
            </CardContent>
        </Card>
    </ScrollArea>
    
  )
}
