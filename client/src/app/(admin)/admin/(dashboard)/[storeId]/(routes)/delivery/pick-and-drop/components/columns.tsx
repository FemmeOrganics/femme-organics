"use client"

import type { ColumnDef, Row } from "@tanstack/react-table"
import { DeleteLocationDocument, type GetLocationQuery } from "@/__gql__/graphql"
import { format } from "date-fns"
import { Button } from "@/src/components/ui/button"
import { Edit3Icon, Trash2Icon } from "lucide-react"
import { useLocationDialog } from "@/src/hooks/use-location-dialog"
import { useMutation } from "@apollo/client"
import AlertModal from "@/src/components/modals/AlertModal"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { capitalize } from "@/src/lib/clean-string"

export const columns: ColumnDef<GetLocationQuery["location"]>[] = [
  {
    accessorKey: "address",
    header: "Address",
    cell: ({row}) => <div>{capitalize(row.original?.address)}</div>
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({row}) => <div>{ format(new Date(row.original?.createdAt), "MMMM do, yyyy")}</div>
  },
  {
    header: "Actions",
    cell: ({row}) => <LocationAction location={row.original} />
  }
]

const LocationAction = ({location}: {location: GetLocationQuery["location"]}) => {
  const locationDialog = useLocationDialog()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [deleteZoneLocation, {loading: delLoading}] = useMutation(DeleteLocationDocument)
  const onDelete = () => {
    const fn = async () => {
      if(location?.id) {
        await deleteZoneLocation({
          variables: {
            locationId: location.id
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
  return( 
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={delLoading}
      />
      <div className="space-x-3">
        <Button size={"icon"}  variant={"ghost"} onClick={() => locationDialog.onOpen({location: location, zoneId: -100})}>
          <Edit3Icon />
        </Button>
        <Button size={"icon"} variant={"destructive"} onClick={() => setOpen(true)}>
          <Trash2Icon />
        </Button>
      </div>
    </>
  )
}
