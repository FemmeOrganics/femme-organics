"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { toast } from "sonner"
import { formatter } from "@/lib/utils"
import { useSuspenseQuery } from "@apollo/client"
import { AddPickupMtaaniDocument, DeletePickupMtaaniDocument, GetPickupMtaanisDocument, GetPickupMtaanisQuery, UpdatePickupMtaaniDocument } from "@/__gql__/graphql"
import { useMutation } from "@apollo/client"

type DeliveryLocation = NonNullable<GetPickupMtaanisQuery["pickupMtaanis"]>[number]

export default function DeliveryLocationsAdmin() {
  const {data} = useSuspenseQuery(GetPickupMtaanisDocument)
  const locations = data?.pickupMtaanis ?? []
  const [addLocation] = useMutation(AddPickupMtaaniDocument, {
    refetchQueries: [GetPickupMtaanisDocument]
  })
  const [updateLocation] = useMutation(UpdatePickupMtaaniDocument, {
    refetchQueries: [GetPickupMtaanisDocument]
  })
  const [deleteLocation] = useMutation(DeletePickupMtaaniDocument, {
    refetchQueries: [GetPickupMtaanisDocument]
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<DeliveryLocation | null>(null)

  const [formData, setFormData] = useState({
    locationName: "",
    agentName: "",
    deliveryFee: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const resetForm = () => {
    setFormData({
      locationName: "",
      agentName: "",
      deliveryFee: "",
    })
  }

  const handleAddLocation = async () => {
    if (!formData.locationName || !formData.agentName || !formData.deliveryFee) {
      toast.success("All fields are required")
      return
    }

    const fn = async () => {
      await addLocation({
        variables: {
          pickupMtaani: {
            locationName: formData.locationName,
            agentName: formData.agentName,
            deliveryFee: Number.parseFloat(formData.deliveryFee),
          }
        }
      })
    }

    toast.promise(fn(), {
      loading: "Adding pickup mtaani location",
      success: () => {
        setIsAddDialogOpen(false)
        resetForm()
        return "Added pickup location successfully"
      },
      error: (err) => {
        return err
      }

    })
  }

  const handleEditClick = (location: DeliveryLocation) => {
    setCurrentLocation(location)
    setFormData({
      locationName: location.locationName ?? "",
      agentName: location.agentName ?? "",
      deliveryFee: location.deliveryFee,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateLocation = () => {
    if (!currentLocation) return
    if (!formData.locationName || !formData.agentName || !formData.deliveryFee) {
      toast.error("All fields are required")
      return
    }

    const fn = async () => {
      await updateLocation({
        variables: {
          pickupMtaaniId: currentLocation.id,
          payload: {
            locationName: formData.locationName,
            agentName: formData.agentName,
            deliveryFee: Number.parseFloat(formData.deliveryFee),
          }
        }
      })
    }

    toast.promise(fn(), {
      loading: "Updating pickup mtaani location",
      success: () => {
        setIsAddDialogOpen(false)
        return "Updated pickup location successfully"
      },
      error: (err) => {
        return err
      }

    })

    

    
  }

  const handleDeleteLocation = (id: number) => {
    const fn = async () => {
      await deleteLocation({
        variables: {
          pickupMtaaniId: id,
        }
      })
    }

    toast.promise(fn(), {
      loading: "Deleting pickup mtaani location",
      success: () => {
        setIsAddDialogOpen(false)
        return "Deleted pickup location successfully"
      },
      error: (err) => {
        return err
      }

    })
  }

  return (
    <div className=" p-4">
      <Card className="p-0">
        <CardHeader className="flex flex-row items-center justify-between clas">
          <div>
            <CardTitle className="text-2xl">Delivery Locations</CardTitle>
            <CardDescription>Manage delivery locations, agents, and fees for customer selection.</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Location
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Delivery Location</DialogTitle>
                <DialogDescription>Add a new delivery location with agent and fee details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="locationName">Location Name</Label>
                  <Input
                    id="locationName"
                    name="locationName"
                    placeholder="e.g., Downtown"
                    value={formData.locationName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="agentName">Agent Name</Label>
                  <Input
                    id="agentName"
                    name="agentName"
                    placeholder="e.g., John Smith"
                    value={formData.agentName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deliveryFee">Delivery Fee (KSh)</Label>
                  <Input
                    id="deliveryFee"
                    name="deliveryFee"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g., 5.99"
                    value={formData.deliveryFee}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLocation}>Save Location</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location Name</TableHead>
                <TableHead>Agent Name</TableHead>
                <TableHead>Delivery Fee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No delivery locations found. Add your first location.
                  </TableCell>
                </TableRow>
              ) : (
                locations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.locationName}</TableCell>
                    <TableCell>{location.agentName}</TableCell>
                  <TableCell>{formatter.format(location.deliveryFee)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(location)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
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
                                Are you sure you want to delete &quot;{location.locationName}&quot;? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteLocation(location.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Location Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Delivery Location</DialogTitle>
            <DialogDescription>Update the delivery location details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-locationName">Location Name</Label>
              <Input
                id="edit-locationName"
                name="locationName"
                value={formData.locationName}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-agentName">Agent Name</Label>
              <Input id="edit-agentName" name="agentName" value={formData.agentName} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-deliveryFee">Delivery Fee </Label>
              <Input
                id="edit-deliveryFee"
                name="deliveryFee"
                type="number"
                step="0.01"
                min="0"
                value={formData.deliveryFee}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateLocation}>Update Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
