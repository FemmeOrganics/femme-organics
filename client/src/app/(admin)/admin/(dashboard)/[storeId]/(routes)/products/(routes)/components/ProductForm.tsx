'use client'
import { useState, useEffect } from 'react';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash, ArrowLeftIcon, PlusIcon, RulerIcon, Paintbrush2Icon } from 'lucide-react';
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import { useRouter, useParams } from 'next/navigation'


import { UpdateProductDocument, DeleteProductDocument, AddProductDocument, GetProductsDocument } from "@/graphql"

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertModal from "@/components/modals/AlertModal"
import { useProductsStore } from '@/store/ProductsStore';
import { TipTool } from '@/components/ui/TipTool';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CustomFormLabel } from '@/components/ui/CustomFormLabel';
import {ImageUpload} from '@/components/appwrite/AppWriteImageUpload'
import { RichTextEditor } from '@/src/app/(admin)/admin/components/rich-editor';
import type { GetCategoriesQuery,GetProductQuery } from '@/graphql';
import { ColorForm, useColorDialog } from './ColorForm';
import { SizeForm, useSizeDialog } from './SizeForm';
import { formatter } from '@/src/lib/utils';
import { fileSchema } from '@/src/hooks/use-appwrite';

type Props = {
  initialData?: GetProductQuery["product"] | null;
  categories?: GetCategoriesQuery["categories"];
}

const formSchema = z.object({
  name: z.string().min(3, {message: "Product name is required."}),
  images: fileSchema.array(),
  description: z.string().min(1, {message: "Description is required."}),
  specification: z.string().min(1, {message: "Specification is required."}),
  price: z.coerce.number().min(1, {message: "Product base price is required."}),
  category: z.string().min(1, {message: "Category is required"}),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})

formSchema.extend({
  data: z.record(z.string(), z.string())
})

type ProductFormValue = z.infer<typeof formSchema>

const ProductForm = ({ initialData, categories }: Props) => {
  const [openDel, setOpenDel] = useState(false)
  const [prodDescription, setProdDescription] = useState('')
  const [prodSpecification, setProdSpecification] = useState('')
  const colorDialog = useColorDialog()
  const sizeDialog = useSizeDialog()
  const productStore = useProductsStore()

  const [setProductId, colors, sizes] = useProductsStore((state) => [state.setProductId, state.colors, state.sizes])

  const router = useRouter()
  const params = useParams()

  const [updateProduct, { loading: upLoading,}] = useMutation(UpdateProductDocument, {
     refetchQueries: [
          {
            query: GetProductsDocument,
            variables: { storeId: Number.parseInt(params.storeId.toString()) }
          }
        ]
  })
  const [addProduct, ] = useMutation(AddProductDocument, {
     refetchQueries: [
          {
            query: GetProductsDocument,
            variables: { storeId: Number.parseInt(params.storeId.toString()) }
          }
        ]
  })
  const [deleteProduct, { loading: delLoading, }] = useMutation(DeleteProductDocument, {
     refetchQueries: [
          {
            query: GetProductsDocument,
            variables: { storeId: Number.parseInt(params.storeId.toString()) }
          }
        ]
  })
  
  const title = initialData ? "Edit product" : "Create new product"
  const toastMessage = initialData ? "Product updated" : "Product created"
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<ProductFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      images: initialData.images.map((image) => ({url: image?.url ?? ""})),
      price: initialData.price,
      category: initialData.category.name,
      description: initialData.description ?? "",
      specification: initialData.specification ?? "",
      isFeatured: false,
      isArchived: false,
    } : {
      name: '',
      images: [],
      price: 0,
      category: "",
      description: "",
      specification: "",
      isFeatured: false,
      isArchived: false,
    }
  })

  const onSubmit = (data: ProductFormValue) => {
    console.log(data)
    if(!categories?.length){
      return
    }

    const product = {
      name: data.name,
      price: Number.parseInt(data?.price.toString()),
      description: data.description,
      specification: data.specification,
      isFeatured: data.isFeatured,
      isArchived: data.isArchived,
      categoryId: Number.parseInt(categories.find(c => c?.name?.includes(data.category))?.id?.toString() ?? "0"),
      images:data.images,
      sizes: productStore.sizes,
      colors: productStore.colors,
      storeId: Number.parseInt(params.storeId as string)
    }
   
    try {
      if(initialData){
        updateProduct({
          variables: {
            productId: initialData.id,
            payload: {
              ...product
            }
          }
        })
      } else {
        addProduct({
          variables: {
            product: {
              ...product
            }
          }
        })
      }
      toast.success(toastMessage)
      setProductId(null)
      router.push(`/admin/${params.storeId}/products`)
      router.refresh()
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  const onDelete = async () => {
    try {
      if (!initialData) return
      deleteProduct({
        variables: {
          productId: initialData?.id, 
          storeId: Number.parseInt(params.storeId as string)
        }
      })
      setProductId(null)
      toast.success("Product deleted")
      router.push(`/admin/${params.storeId}/products`)
    } catch (error) {
      toast.error("Failed to delete product try again later.")
    }
  }
  const onSetDescription = (value: string) => {
    setProdDescription(value)
    form.setValue('description', value)
  }

  // useEffect(() => {
  //   productStore.resetStore()
  // }, [productStore])

  useEffect(() => {
    if (initialData) {
      setProdDescription(initialData?.description ?? "")
      form.setValue('description', initialData?.description ?? "")
      form.setValue('specification', initialData?.specification ?? "")
      form.setValue('images', initialData?.images?.map(m =>({fileId: "", url: m.url, name: ""})) ?? [])
      form.setValue('category', initialData?.category?.name ?? "")
      form.setValue('isFeatured', initialData?.isFeatured ?? false)
      form.setValue('isArchived', initialData?.isArchived ?? false)
      form.setValue('price', initialData?.price ?? "")
      form.setValue('name', initialData?.name ?? "")


      productStore.resetStore()
      if(initialData.colors?.length){
        initialData?.colors.map((color) => {
          productStore.setColors({id: color?.id, name: color.name, value: color.value})
        })
      }
      if(initialData.sizes?.length){
        initialData?.sizes.map((size) => {
          productStore.setSizes({id: size?.id, name: size.name, value: size.value, price: size.price})
        })
      }
    
    }
  }, [initialData, form, productStore.setColors, productStore.setSizes])


  return (
    <div className='h-full'>
      <ColorForm />
      <SizeForm />
      <AlertModal
        isOpen={openDel}
        onClose={() => setOpenDel(false)}
        onConfirm={onDelete}
        loading={delLoading}
      />
      <div className='flex justify-end bg-muted/80 dark:bg-muted/50  px-2 py-1'>
          <div className="flex items-center space-x-5">
            <Button 
              // variant={'ghost'}
              className="py-0"
              onClick={() => setProductId(null)}
            >
              <ArrowLeftIcon size={20} className='text-white dark:text-black'/>
            </Button>
            <div className="font-bold text-lg">
              {title}
            </div>
          </div>
          <div className='ml-auto flex items-center space-x-4'>
            {initialData &&
              <div className=" px-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 py-2 rounded-md text-sm">
                <TipTool
                  tip="Delete product"
                  sideOffset={4}
                  className='flex items-center space-x-2 z-50'
                  onClick={() => { setOpenDel(true) }}
                >
                  <div className='text-md font-semibold'>Delete</div>
                  <Trash className='h-4 w-4' />
                </TipTool>
              </div>
            }
            <Button 
              disabled={upLoading}
              className="py-0 px-2"
              type='submit'
              form="productForm"
              >
                {action}
            </Button>
          </div>
      </div>
      <ScrollArea className='h-full px-2.5'>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
            id="productForm" 
            className='flex-flex-col space-y-4 w-full'
          >
              <CustomFormLabel title='Basic product Information' description=''/>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <CustomFormLabel title='Name' variant='required' description=''/>
                      <FormControl>
                        <Input disabled={upLoading} placeholder='Product name' {...field} className=" focus:outline-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className='w-full'>
                <FormField               
                  control={form.control}               
                  name="images"               
                  render={({ field }) => (                 
                    <FormItem>                   
                      <CustomFormLabel title='Main Image' variant='required' description=''/>                   
                      <FormControl>                     
                        <ImageUpload                       
                          imageSize="w-[200px] mb-2 h-auto"                       
                          value={field?.value.map(m => ({url: m.url, fileId: "", name: ""})) || []} // Ensure it's always an array of FileLink objects
                          disabled={upLoading}                       
                          onChange={(fileLink) => {                         
                            field.onChange([...field.value || [], fileLink])                       
                          }}                       
                          onRemove={(fileLink) => field.onChange(
                            (field.value || []).filter((current) => current.fileId !== fileLink.fileId)
                          )}                     
                        />                   
                      </FormControl>                   
                      <FormMessage />                 
                    </FormItem>               
                  )}             
                />
              </div>
              
              <div className='space-y-2'>
                <CustomFormLabel title='Description' variant='required' description=''/>
                <RichTextEditor value={prodDescription} setValue={onSetDescription}/>
              </div>

              <div className='space-y-2'>
                <CustomFormLabel title='Specification' variant='required' description=''/>
                <RichTextEditor value={prodSpecification} setValue={(value) =>  {
                        setProdSpecification(value)
                        form.setValue('specification', value)
                }}/>
              </div>
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Price' variant='required' description=''/>
                    <FormControl>
                      <Input min="0" disabled={upLoading} type='float' placeholder='9.99' {...field} className=" focus:outline-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <CustomFormLabel title='Category' variant='required' description=''/>
                    <Select
                      disabled={upLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl >
                        <SelectTrigger defaultValue={initialData?.category?.name}className='ring-0 focus:ring-0'>
                          <SelectValue
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='h-[200px]'>
                        <ScrollArea className='h-full'>
                          {categories?.map(c => c?.name)?.map((category) => (
                            <SelectItem
                              key={category}
                              value={category ?? ""}
                            >
                              {category}</SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 space-x-3">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 loading-none">
                        <FormLabel>
                          Featured
                        </FormLabel>
                        <FormDescription>
                          This product will appear on the home page
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isArchived"
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 loading-none">
                        <FormLabel>
                          Archived
                        </FormLabel>
                        <FormDescription>
                          This product will not appear anywhere in the store
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-4'>
                <CustomFormLabel title='Product Variations' variant='optional' description=''/>
                <div className='flex flex-col space-y-2'>
                  {!!sizes.length && <div className='flex space-x-3 items-center'>
                    <p className='font-semibold'>SIZES:</p> {sizes.map((size) => <div key={size.name} className='flex border p-2 rounded-md items-center space-x2' >{size.name} : {size.value} @ {formatter.format(size.price)}</div>)}
                  </div>}
                  {
                    !!colors.length && 
                    <div className='flex space-x-3 items-center'>
                      <p className='font-semibold'>COLORS:</p> {colors.map((color) => 
                        <div key={color.name} className='flex border space-x-2 p-2 rounded-md items-center'>
                          {color.name} : <span
                              className="h-4 w-4 rounded-full border"
                              style={{backgroundColor: color.value}}
                            />
                        </div>)}
                    </div>
                  }
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button type='button' size={"sm"} onClick={() => colorDialog.onOpen({})}>
                    <Paintbrush2Icon /> Color
                  </Button>
                  <Button type='button' size={"sm"} onClick={() => sizeDialog.onOpen({})}>
                    <RulerIcon /> Size
                  </Button>
                </div>
              </div>
          </form>
        </Form>
        <div className='mb-40'/>
      </ScrollArea>
    </div>
  )
}

export default ProductForm