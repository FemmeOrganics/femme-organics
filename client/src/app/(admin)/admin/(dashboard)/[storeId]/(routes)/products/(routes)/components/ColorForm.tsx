import { DialogWrapper } from "@/src/components/ui/dialog-wrapper"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage  } from "@/src/components/ui/form"
import { create } from "zustand";
import type { GetColorQuery } from "@/__gql__/graphql";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useEffect, useState } from "react";
import { useProductsStore } from "@/src/store/ProductsStore";
import ColorPicker from '@rc-component/color-picker';
import '@rc-component/color-picker/assets/index.css';
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

interface ColorDialogProps {
    isOpen: boolean;
    data: {color?: GetColorQuery["color"], productId?: number};
    onOpen: ({color, productId}:{color?: GetColorQuery["color"], productId?: number}) => void;
    onClose: () => void;
}

export const useColorDialog = create<ColorDialogProps>((set) => ({
    isOpen: false,
    data: {color: undefined, productId: undefined},
    onOpen:({color, productId}: {color?: GetColorQuery["color"], productId?: number}) => set({data: {color, productId}, isOpen:true}),
    onClose: () => set({isOpen:false})
}))

const formSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  value: z.string().min(1, {message: "Color value is required"})
})

type ColorFormvalue = z.infer<typeof formSchema>

export const ColorForm = () => {
  const colorDialog = useColorDialog()
  const productStore = useProductsStore()
  const [initialData, setInitialData] = useState< GetColorQuery["color"] | undefined>()
  const title = initialData ? "Edit a color" : "Create color"
    const action = initialData ? "Save changes" : "Create"
  

  const form = useForm<ColorFormvalue>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: colorDialog.data.color?.name ?? "",
        value: colorDialog.data.color?.value ?? ""
      }})

  const onSubmit = (data: ColorFormvalue) => {
    productStore.setColors({...data})
    colorDialog.onClose()
    form.setValue("name", "")
    form.setValue("value", "")
  }

  useEffect(() => {
    setInitialData(colorDialog.data.color)
  }, [colorDialog.data.color])
  
  return (
    <DialogWrapper
      isOpen={colorDialog.isOpen}
      onClose={colorDialog.onClose}
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
                    <Input placeholder='Color name' {...field} value={field.value} className=" focus:outline-none" />
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
                  <FormLabel>Hex value</FormLabel>
                  <FormControl>
                      <Popover>
                        <PopoverTrigger className="w-full">
                          <div className="flex items-center gap-x-4 relative">
                            <Input
                              placeholder="Color value..."
                              value={field.value}
                              className="focus:outline-none"
                            />
                             <div
                              className="border p-4 rounded-full absolute right-2"
                              style={{ backgroundColor: field.value }}
                            />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent>
                          <ColorPicker
                            value={field.value} 
                            onChange={(color) => field.onChange(color.toHexString())} // Update form state

                          />
                        </PopoverContent>
                      </Popover>
                      
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-3">
              <Button  className='' type='button' onClick={() => colorDialog.onClose()}>Cancel</Button>
              <Button  className='' type='submit'>{action}</Button>
            </div>
          </form>
      </Form>
    </DialogWrapper>
  )
}
