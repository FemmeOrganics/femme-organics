import { DialogWrapper } from "@/src/components/ui/dialog-wrapper"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage  } from "@/src/components/ui/form"
import { create } from "zustand";
import type { GetSizeQuery } from "@/__gql__/graphql";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useEffect, useState } from "react";
import { useProductsStore } from "@/src/store/ProductsStore";

interface SizeDialogProps {
    isOpen: boolean;
    data: {size?: GetSizeQuery["size"], productId?: number};
    onOpen: ({size, productId}:{size?: GetSizeQuery["size"], productId?: number}) => void;
    onClose: () => void;
}

export const useSizeDialog = create<SizeDialogProps>((set) => ({
    isOpen: false,
    data: {size: undefined, productId: undefined},
    onOpen:({size, productId}: {size?: GetSizeQuery["size"], productId?: number}) => set({data: {size, productId}, isOpen:true}),
    onClose: () => set({isOpen:false})
}))

const formSchema = z.object({
  name: z.string().min(1, {message: "Size name is required"}),
  value: z.string().min(1, {message: "Size value is required"}),
  price: z.coerce.number().min(1, {message: "Size value is required"})
})

type SizeFormValue = z.infer<typeof formSchema>

export const SizeForm = () => {
  const sizeDialog = useSizeDialog()
  const productStore = useProductsStore()
  const [initialData, setInitialData] = useState< GetSizeQuery["size"] | undefined>()
  const title = initialData ? "Edit a size" : "Create size"
  const action = initialData ? "Save changes" : "Create"
  

  const form = useForm<SizeFormValue>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: sizeDialog.data.size?.name ?? "",
        value: sizeDialog.data.size?.value ?? ""
      }})

  const onSubmit = (data: SizeFormValue) => {
    productStore.setSizes({...data})
    sizeDialog.onClose()
    form.reset()
  }

  useEffect(() => {
    setInitialData(sizeDialog.data.size)
  }, [sizeDialog.data.size])
  
  return (
    <DialogWrapper
      isOpen={sizeDialog.isOpen}
      onClose={sizeDialog.onClose}
      title={title}
    >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Size name' {...field} value={field.value} className=" focus:outline-none" />
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
                  <FormLabel>Size Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4 relative">
                      <Input placeholder='Value' {...field} value={field.value} className=" focus:outline-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4 relative">
                      <Input placeholder='Price' {...field} value={field.value} className=" focus:outline-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-3">
              <Button  className='' type='button' onClick={() => sizeDialog.onClose()}>Cancel</Button>
              <Button  className='' type='submit'>{action}</Button>
            </div>
          </form>
      </Form>
    </DialogWrapper>
  )
}
