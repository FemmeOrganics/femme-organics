import {useState, SetStateAction, Dispatch} from "react"
import {Button} from "@/components/ui/button"
import {ArrowLeftIcon} from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useCart } from "@/hooks/use-Cart-Store"
import { Input } from "./ui/input"
import { usePaymentModal } from "./modals/PaymentModal"
import { toast } from "sonner"
import { DialogClose } from "@radix-ui/react-dialog"
import LoadingSpinner from "./LoadingSpinner"

const FormSchema = z.object({
    phoneNumber: z.string().regex(/^(?:\d{9}|0\d{9})$/, {
        message: "Invalid Kenyan phone number. It should be exactly 9 digits."
      }),
    code: z.string().optional()
})

type Props = {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

export const MpesaPayment = ({loading, setLoading}: Props) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const [isWaitingForConfirm, setWaitingForConfirm] = useState(false)
    const paymentModal = usePaymentModal()

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setLoading(true)
        let phoneNumber = "254"
        if(data.phoneNumber.length === 10 ){
            phoneNumber += data.phoneNumber.slice(1)
        } else if( data.phoneNumber.length === 9){
            phoneNumber += data.phoneNumber
        }

        if(!paymentModal.data?.amount || !paymentModal.data.orderId) return toast.error("Something went wrong order amount or id is undefined")

        async function fn(){
            await fetch("/api/mpesa-checkout", {
                method: "POST",
                body: JSON.stringify({
                    phoneNumber, amount: 1, orderId: paymentModal.data?.orderId
                })
            }).then((res) => {
                if(res.ok){
                    setWaitingForConfirm(true)
                }
            })
            setLoading(false);
        }

        toast.promise(fn, {
            loading: "Sending payment request. Please wait for an M-Pesa prompt to pay.",
            success: (res) => {
                
                return "Payment request sent please enter your M-Pesa PIN to confirm payment"
            },
            error: (err) => {
                return "Error sending payment request " + err.message + ". Contact Support."
            },
            duration: 2000
        })
       
    }

    return (
      <div className="flex flex-col space-y-2 ">
        {isWaitingForConfirm ?
        <WaitingForPin phoneNumber={ "+254XXXXXXX" + form.getValues("phoneNumber").slice(-3)}/> 
        : <Form {...form}>
            <form id="form" onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                <div className="">
                    <FormLabel>Mpesa phone number</FormLabel> 
                    <div className="flex space-x-1">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="w-20">
                                    <FormControl >
                                        <Input
                                            disabled
                                            placeholder="+254"
                                            type="number"
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="focus-visible:ring-0 w-20"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl >
                                        <Input
                                            id="phoneNumber"
                                            placeholder="7XXXXXXXX"
                                            type="number"
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="focus-visible:ring-0 flex-1"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
        }
        
        <div className="flex justify-end space-x-2">
            {
                !isWaitingForConfirm ?
                    <DialogClose>
                        <Button 
                            className=""
                            type="button"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                : <Button type="reset" form="dds" onClick={() => setWaitingForConfirm(false)}>
                    Change Phone Number
                </Button>
            }
           
           {!isWaitingForConfirm && <Button 
                className="space-x-2 flex items-center"
                type="submit"
                form="form"
                disabled={loading}
            >
                {loading && <LoadingSpinner />}
                <span>{isWaitingForConfirm ? "Retry" : "Continue"}</span>
            </Button>}
            
        </div>
      </div>
    )
}

const WaitingForPin = ({phoneNumber}:{phoneNumber: string}) => {
    return (
        <div className="p-5 bg-white rounded-lg min-h-10">
            <p>An M-Pesa prompt was sent to phone number <em className="font-semibold">{phoneNumber}</em></p>
            <p>Please enter your pin to confirm your order</p>
        </div>
    )
}