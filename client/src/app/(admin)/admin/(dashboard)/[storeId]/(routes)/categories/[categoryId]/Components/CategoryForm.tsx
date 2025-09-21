'use client'
import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { useMutation } from '@apollo/client'
import { toast } from "sonner"
import { useRouter, useParams } from 'next/navigation'

import { UpdateCategoryDocument, DeleteCategoryDocument, AddCategoryDocument,  GetCategoriesQuery, GetCategoriesDocument } from "@/graphql"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertModal from "@/components/modals/AlertModal"
import { CustomFormLabel } from '@/components/ui/CustomFormLabel'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/src/components/ui/textarea'
import { Card, CardContent } from '@/src/components/ui/card'


type Props = {
  initialData?: NonNullable<GetCategoriesQuery["categories"]>[number] | null;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Category name is required" }),
  description: z.string().optional()
})

type CategoryFormvalue = z.infer<typeof formSchema>

const CategoryForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams() // GET STORE ID

  const [updateCategory, { loading: upLoading, error: upError, data: upData }] = useMutation(UpdateCategoryDocument, {
    refetchQueries: [
      {
         query: GetCategoriesDocument,
        variables: { storeId: Number.parseInt(params.storeId.toString()) }
      }
    ]
  })
  const [addCategory ] = useMutation(AddCategoryDocument, {
    refetchQueries: [
      {
         query: GetCategoriesDocument,
        variables: { storeId: Number.parseInt(params.storeId.toString()) }
      }
    ]
  })
  const [deleteCategory, { loading: delLoading }] = useMutation(DeleteCategoryDocument, {
    refetchQueries: [
      {
         query: GetCategoriesDocument,
        variables: { storeId: Number.parseInt(params.storeId.toString()) }
      }
    ]
  })

  const title = initialData ? "Edit a category" : "Create category"
  const description = initialData ? "Edit category" : "Add a new category"
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<CategoryFormvalue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
    }
  })

  const onSubmit = async (data: CategoryFormvalue) => {

    if (initialData) {
       toast.promise(async () => {
        await updateCategory({
          variables: {
            categoryId: initialData.id,
            payload: {
              ...data,
              storeId: Number.parseInt(params.storeId as string)
            }
          }

        })
      }, {
        loading: "Updating category",
        success: () => {
          router.push(`/admin/${params.storeId}/categories`)
          return "Category updated successfuly"
        },
        error: (err) => `Error: ${(err as Error).message}`
      })
    } else {
       toast.promise(async () => {
        await addCategory({
          variables: {
            category: {
              ...data,
              storeId: Number.parseInt(params.storeId as string)
            }
          }

        })
      }, {
        loading: "Creating category",
        success: () => {
          router.push(`/admin/${params.storeId}/categories`)
          return "Category created successfuly"
        },
        error: (err) => `Error: ${(err as Error).message}`
      })
    }
  }

  const onDelete = async () => {
    if (!initialData?.id) {
      return toast.error("Id is required")
    }
    try {
      deleteCategory({
        variables: {
          categoryId: initialData?.id,
          storeId: Number.parseInt(params.storeId as string)
        }
      })
      toast.success("Category deleted")
      router.push(`/admin/${params.storeId}/categories`)
    } catch (error) {
      toast.error("Make sure you remove all products in this category")
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
      <ScrollArea className='h-full px-2 p-4'>
        <Card>
          <CardContent className='p-6'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[600px]'>
                <div className='space-y-6 '>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <CustomFormLabel title='Name' variant='required' description='' />
                        <FormControl>
                          <Input disabled={upLoading} placeholder='Category name' {...field} className="focus:outline-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <CustomFormLabel title='Description' variant='optional' description='' />
                        <FormControl>
                          <Textarea disabled={upLoading} placeholder='Category description (Optional)' {...field} className="focus:outline-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={upLoading} className='ml-auto mt-2' type='submit'>{action}</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Separator className='my-2' />
      </ScrollArea>
    </div>
  )
}

export default CategoryForm