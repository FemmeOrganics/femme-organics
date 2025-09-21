'use client'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "sonner"
import { useRouter, useParams } from 'next/navigation'

import { UpdateBillboardDocument, DeleteBillboardDocument, AddBillboardDocument, type GetBillboardQuery, GetBillboardsDocument } from "@/graphql"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertModal from "@/components/modals/AlertModal"
import {ImageUpload} from '@/components/appwrite/AppWriteImageUpload'
import { CustomFormLabel } from '@/components/ui/CustomFormLabel';
import type { Models } from 'appwrite'
import { fileSchema } from '@/src/hooks/use-appwrite'
import { CardContent, Card } from '@/src/components/ui/card'

type Props = {
  initialData?: GetBillboardQuery["billboard"] | null
}

const formSchema = z.object({
  label: z.string().min(3),
  image: fileSchema.optional()
})

type BillboardFormvalue = z.infer<typeof formSchema>

const BillboardForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams() // GET STORE ID

  const [updateBillboard, { loading: upLoading, }] = useMutation(UpdateBillboardDocument,
    {
      refetchQueries: [GetBillboardsDocument]
    }
  )
  const [addBillboard,] = useMutation(AddBillboardDocument,  {
      refetchQueries: [GetBillboardsDocument]
    })
  const [deleteBillboard, { loading: delLoading, }] = useMutation(DeleteBillboardDocument,  {
      refetchQueries: [GetBillboardsDocument]
    })

  const title = initialData ? "Edit a billboard" : "Create billboard"
  const description = initialData ? "Edit billboard" : "Add a new billboard"
  const toastMessage = initialData ? "Billboard updated" : "Billboard created"
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<BillboardFormvalue>({
    resolver: zodResolver(formSchema),
    defaultValues:  initialData ? {
      label: initialData.label,
      image: {
        url: initialData.url,
        fileId: initialData.fileId,
        name: initialData.name ?? undefined
      }
    } : {label: ""}
  })


  const onSubmit = async (data: BillboardFormvalue) => {
    if(!data.image) {
      return toast.error("Image is required")
    }
  
    const payload = {
      label: data.label,
      ...data.image,
      storeId: Number.parseInt(params.storeId as string)
    }

  

    try{
      if(initialData){
        await updateBillboard({
          variables: {
            billboardId: initialData.id,
            payload: {
              ...payload
            }
          }
          
         })
         
      } else {
        await addBillboard({
          variables: {
            billboard: {
              ...payload
            }
          }
        })
      }
      toast.success(toastMessage)
      router.push(`/admin/${params.storeId}/billboards`)
    } catch(error){
      toast.error("Something went wrong")
    }
  }

  const onDelete = async () => {
    try {
      if(initialData?.id ){
        await deleteBillboard({
            variables: {
                billboardId: initialData?.id,
                storeId: Number.parseInt(params.storeId as string)
            }
        })
        router.push(`/admin/${params.storeId}/billboards`)
        toast.success("billboard deleted")}
    } catch (error) {
        toast.error("Make sure you remove all categories using this billboard")
    }
}

  return (
    <div className='h-full'>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={delLoading}
      />
      <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50   px-2  py-2">
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
      <Separator className=""/>
      <Card className="h-full w-full py-2 px-2">
        <CardContent className='max-w-[600px]'>
 <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField               
              control={form.control}               
              name="image"               
              render={({ field }) => (                 
                <FormItem>                   
                  <CustomFormLabel title='Main Image' variant='required' description=''/>                   
                  <FormControl>                     
                    <ImageUpload                       
                      imageSize="w-[200px] mb-2 h-auto"                       
                      value={ field?.value ? [field.value] : []} // Ensure it's always an array of FileLink objects
                      disabled={upLoading || !!form.getValues("image")}                       
                      onChange={(fileLink) => {                         
                        field.onChange(fileLink)                       
                      }}                       
                      onRemove={(fileLink) => field.onChange(null)}                     
                    />                   
                  </FormControl>                   
                  <FormMessage />                 
                </FormItem>               
              )}             
            />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Label' variant='required' description=''/>
                    <FormControl>
                      <Input disabled={upLoading} placeholder='Billboard label' {...field} className="focus-visible:ring-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={upLoading} className=''>
                {action}
              </Button>
          </form>
        </Form>
        </CardContent>
       
        <Separator className="my-2" />
        <div className="pb-[100px]"/>
      </Card>
    </div>
  )
}

export default BillboardForm