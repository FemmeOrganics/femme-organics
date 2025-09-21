'use client'
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as z from "zod"
import { useForm } from "react-hook-form"


import LoadingComponent from '@/components/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PhoneNumberInput, validateNumber } from '@/components/PhoneNumberInput'
import { CustomFormLabel } from '@/components/ui/CustomFormLabel';
import { useAuth } from '@/src/lib/customer-auth';
import { toast } from 'sonner';
import { COUNTRIES, PhoneInput } from '@/src/components/phone-number-input';
import parsePhoneNumberFromString, { CountryCode } from 'libphonenumber-js';


const SignInFormSchema = z.object({

    password: z.string().min(8, { message: "Password must be 8 characters" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    code: z.string().min(1, { message: "Country code is required" }),
}).superRefine(({ phone, code }, ctx) => {
    if (phone && code) {
        const defaultCountry = COUNTRIES.find((country) =>
            country.code.endsWith(code),
        );
        const phoneNumber = parsePhoneNumberFromString(
            phone,
            defaultCountry?.flag as CountryCode,
        );
        if (!phoneNumber || !phoneNumber.isValid()) {
            ctx.addIssue({
                path: ["phone"],
                code: z.ZodIssueCode.custom,
                message: "Invalid phone number",
            });
        }
    }
});


type SignInFormValues = z.infer<typeof SignInFormSchema>


export const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { signIn, } = useAuth()
    const [err, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const form = useForm<SignInFormValues>()

    const onSubmit = async (data: SignInFormValues) => {
        setLoading(true)
        const phoneNumber = `${data.code ?? ""}${data.phone?.replaceAll(" ", "")}`;

        async function fn() {
            await signIn({ phoneNumber, password: data.password })
            setLoading(false)
        }

        toast.promise(fn(), {
            success: () => {
                setLoading(false)
                return "You are signed in successfully."
            },
            error: (err) => {
                setLoading(false)
                return `Error sigining you in. ${err.message}`
            },
            loading: "Signing you in"
        })
    }

    return (
        <div className='w-full'>
            {loading
                ? <LoadingComponent />
                : <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <PhoneInput
                                            code={form.getValues().code}
                                            phone={form.getValues().phone}
                                            setCode={(code) => form.setValue("code", code)}
                                            setPhone={(phone) => form.setValue("phone", phone)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className=''>
                                    <CustomFormLabel title="Password" description="" />
                                    <div className='flex items-center relative'>
                                        <FormControl>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder={"Password..."}
                                                {...field}
                                            />
                                        </FormControl>
                                        <Button
                                            type='button'
                                            variant={"ghost"}
                                            size={'icon'}
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute right-0'
                                        >
                                            {!showPassword ? <EyeOffIcon size="20" /> : <EyeIcon size="20" />}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='text-red-500'>{err}</div>
                        <Button type="submit" disabled={loading || !!Object.keys(form.formState.errors)?.length}>
                            Sign In
                        </Button>
                    </form>
                </Form>
            }
        </div>
    )
}
