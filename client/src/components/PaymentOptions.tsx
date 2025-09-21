import { zodResolver } from "@hookform/resolvers/zod"
//@ts-ignore
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { useCart } from "@/hooks/use-Cart-Store"
import { usePaymentModal } from "./modals/PaymentModal"
import { Dispatch, SetStateAction } from "react"


const FormSchema = z.object({
    type: z.enum(["mpesa", "visa"], {
      required_error: "You need to select a payment type.",
    }),
  })

type Props = {
  loading: boolean;
}

export function RadioGroupForm({loading}: Props) {
    const [addPaymentMethod] = useCart((state) => [state.addPaymentMethod])
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })
    const paymentModal = usePaymentModal()
  
    function onSubmit(data: z.infer<typeof FormSchema>) {
        addPaymentMethod(data.type)
        toast({
            title: "You submitted the following values:",
            description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
            ),
        })
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem id="value" value="mpesa" />
                      </FormControl>
                      <FormLabel htmlFor="value"  className="font-normal">
                        M-Pesa
                      </FormLabel>
                    </FormItem>
                    {/* <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="visa" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Visa
                      </FormLabel>
                    </FormItem> */}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={() => { paymentModal.onClose()}}>
              Cancel
            </Button>
            <Button className="" type="submit" disabled={loading}>Next</Button>

          </div>
        </form>
      </Form>
    )
  }
  