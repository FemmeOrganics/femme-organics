"use client"
import type { ReactNode } from "react"
import { CustomerAuthProvider } from "@/src/lib/customer-auth"

export const CustomerProviders = ({children}: {children: ReactNode}) => {
  return (
    <CustomerAuthProvider home="/" publicRoutes={["/", /\/cart\/*/, /\/category\/*/, /\/product\/*/, ]}>
       {children} 
    </CustomerAuthProvider>
  )
}
