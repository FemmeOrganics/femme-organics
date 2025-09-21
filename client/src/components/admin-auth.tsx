'use client'
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { setCookie } from 'cookies-next'
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import DarkModeButton from '@/components/DarkModeButton';
import * as z from "zod"
import { useForm } from "react-hook-form"

import { LoginAdminDocument, SignUpAdminDocument, UserRole } from '@/graphql';

import ErrorComponent from './ErrorComponent';
import LoadingComponent from './LoadingSpinner';
import { isLoggedInVar } from './admin-auth-guard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PhoneNumberInput, validateNumber } from '@/components/PhoneNumberInput'
import { CustomFormLabel } from './ui/CustomFormLabel';
import { COUNTRIES, PhoneInput } from './phone-number-input';
import parsePhoneNumberFromString, { CountryCode } from 'libphonenumber-js';

export const Admin = () => {
    return (
        <div className='h-screen w-full flex flex-row space-x-2 items-center justify-center relative'>
            <div className='border p-5  bg-gradient-to-b  from-muted/20 to-muted/50 shadow md:shadow-lg rounded-md mX-auto my-auto flex flex-row space-x-2 items-center w-[900px] h-[500px] relative dark:'>
                <div className='absolute top-2 left-2'>
                    <DarkModeButton />
                </div>
                <div className='flex flex-col md:flex-row w-full items-center justify-center space-y-5'>
                    <div className=' w-full md:w-[60%]'>
                        <h1 className='text-5xl font-bold font-sans text-center md:text-left leading-20' >Femme Organics</h1>
                        <p className='my-2 text-center md:text-left'>Manage your products, orders and customers on one portal</p>
                    </div>
                    <div className='w-full md:flex-1 max-w-[350px]'>
                        <LoginRegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}


const SignInFormSchema = z.object({
    phone: z.string().min(1, { message: "Phone number is required" }),
    code: z.string().min(1, { message: "Country code is required" }),
    password: z.string().min(8, { message: "Password must be 8 characters" }),
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


type LoginProps = {
    showLogin: boolean
}
const LoginForm = ({ showLogin }: LoginProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [loginAdmin, { data, loading, error }] = useMutation(LoginAdminDocument)

    const form = useForm<SignInFormValues>()

    const onSubmit = async (data: SignInFormValues) => {
        const phoneNumber = `${data.code ?? ""}${data.phone?.replaceAll(" ", "")}`;
        await loginAdmin({
            //@ts-ignore
            update(cache, { data: { loginAdmin } }) {
                if (loginAdmin.auth.token) {
                    setCookie('jwt', loginAdmin.auth.token, { maxAge: 60 * 60 * 24 })
                    localStorage.setItem('jwt', loginAdmin.auth.token);
                    isLoggedInVar(true)
                }
            },
            variables: {
                user: {
                    phoneNumber: phoneNumber,
                    password: data.password,
                    role: UserRole.Admin
                }
            }
        })
    }

    return (
        <div className='w-full'>
            {loading
                ? <LoadingComponent />
                : <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">

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
                                    <CustomFormLabel title="Password" variant="required" description="" />
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
                        <Button type="submit" disabled={loading || !!Object.keys(form.formState.errors)?.length}>
                            Sign In
                        </Button>
                    </form>
                </Form>
            }
            {error && <ErrorComponent message={error.message} />}
        </div>
    )
}

const RegisterFormSchema = z.object({
    phone: z.string().min(1, { message: "Phone number is required" }),
    code: z.string().min(1, { message: "Country code is required" }),
    password: z.string().min(8, { message: "Password must be 8 characters" }),
    name: z.string().min(1, { message: "Your name is required" }),
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

type RegisterFormValues = z.infer<typeof RegisterFormSchema>

type RegisterProps = {
    showLogin: boolean
}

const RegisterForm = ({ showLogin }: RegisterProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [signupAdmin, { loading, error, data }] = useMutation(SignUpAdminDocument)

    const form = useForm<RegisterFormValues>()

    const onSubmit = async (data: RegisterFormValues) => {
        const phoneNumber = `${data.code ?? ""}${data.phone?.replaceAll(" ", "")}`;

        await signupAdmin({
            //@ts-ignore
            update(cache, { data: { signupAdmin } }) {
                console.log("signupAdmin", signupAdmin)
                if (signupAdmin.auth.token) {
                    setCookie('jwt', signupAdmin.auth.token, { maxAge: 60 * 6 * 24 })
                    localStorage.setItem('jwt', signupAdmin.auth.token);
                    isLoggedInVar(true)
                }
            },
            variables: {
                user: { phoneNumber: phoneNumber, password: data.password, role: UserRole.Admin },
                admin: {
                    name: data.name
                }
            }
        })
    }

    return (
        <div className='w-full'>
            {loading
                ? <LoadingComponent />
                : <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <CustomFormLabel title="Name" variant="required" description="" />
                                    <FormControl>
                                        <Input placeholder={"Enter name ..."} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                    <CustomFormLabel title="Password" variant="required" description="" />
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
                        <Button type="submit" disabled={loading || !!Object.keys(form.formState.errors)?.length}>
                            Signup
                        </Button>
                    </form>
                </Form>
            }
            {error && <ErrorComponent message={error.message} />}
        </div>
    )
}

const LoginRegisterForm = () => {
    const [showLogin, setShowLogin] = useState<boolean>(true)

    return (
        <div className=''>
            {showLogin
                ?
                <div className='text-center w-full'>
                    <LoginForm showLogin={showLogin} />
                    <Button className='text-blue-400' onClick={e => setShowLogin(false)} variant={'ghost'}>Or sign up </Button>
                </div>
                : <div className='text-center w-full'>
                    <RegisterForm showLogin={showLogin} />
                    <Button onClick={e => setShowLogin(true)} className='text-blue-400' variant={'ghost'}>Or login</Button>
                </div>
            }

        </div>
    )
}



export default LoginRegisterForm