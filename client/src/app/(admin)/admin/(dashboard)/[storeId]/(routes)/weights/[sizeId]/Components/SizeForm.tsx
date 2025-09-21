'use client'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'

import { UpdateSizeDocument, DeleteSizeDocument, AddSizeDocument } from "@/graphql"

import { StoreType } from "@/types"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertModal from "@/components/modals/AlertModal"
import ImageUpload from '@/components/ui/ImageUpload'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { SizeType } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
  initialData?: SizeType | null;
}

const formSchema = z.object({
  name: z.string().min(3),
  value: z.string().min(1)
})

type SizeFormvalue = z.infer<typeof formSchema>

const SizeForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams() // GET STORE ID

  const [updateSize, { loading: upLoading, error: upError, data: upData }] = useMutation(UpdateSizeDocument)
  const [addSize, { loading: creLoading, error: creError, data: creData }] = useMutation(AddSizeDocument)
  const [deleteSize, { loading: delLoading, error: delError }] = useMutation(DeleteSizeDocument)

  const title = initialData ? "Edit a size" : "Create size"
  const description = initialData ? "Edit size" : "Add a new size"
  const toastMessage = initialData ? "size updated" : "size created"
  const action = initialData ? "Save changes" : "Create"
  const mutation = initialData ? updateSize : addSize


  const form = useForm<SizeFormvalue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
      storeId: '',
    }
  })

  const onSubmit = async (data: SizeFormvalue) => {
      let updateData = {}
      let addData = {}

      const variables = initialData ? updateData = {
        sizeId: initialData.id,
        payload: {
          name: data.name,
          value: data.value,
          storeId: Number.parseInt(initialData.store.id),
        }
      } : addData = {
        size: {
          name: data.name,
          value: data.value,
          storeId: Number.parseInt(params.storeId),

        }
      }
      try{
        mutation({ variables })
        toast.success(toastMessage)
        router.push(`/admin/${params.storeId}/sizes`)
      } catch(err) {
        toast.error(err.message)
      }

  }

  const onDelete = async () => {
      try {
        deleteSize({
          variables: {
            sizeId: initialData.id,
            storeId: Number.parseInt(initialData.store.id as string)
          }
        })
        router.push(`/admin/${params.storeId}/sizes`)
        toast.success("Size deleted")
      } catch (error) {
        toast.error("Make sure you remove all products in this size")
      }
  }

  return (
    <div className="h-full">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={delLoading}
      />
      <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50  px-2  py-1">
        <Heading
          title={title}
          description={description}
        />
        {initialData &&
          <Button
            variant="destructive"
            disabled={delLoading}
            size="icon"
            onClick={() => { setOpen(true) }}
          >
            <Trash className='h-4 w-4' />
          </Button>
        }
      </div>
      <Separator />
      <ScrollArea className='h-full px-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-3 gap-8 space-y-2 items-end'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Size name' {...field} value={field.value} className="border-none focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Value' {...field} value={field.value} className="border-none focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={upLoading} className='ml-auto mt-2' type='submit'>{action}</Button>
          </form>
        </Form>
        <Separator className='my-2'/>
      </ScrollArea>
    </div>  
  )
}

export default SizeForm