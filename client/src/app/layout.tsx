import './globals.css'
import type { Metadata, Viewport } from 'next'

import { ApolloWrapper } from '@/lib/graphql/ApolloWrapper'
import ToastProvider from '@/providers/ToastProvider'
import { Separator } from '@/components/ui/separator'
import { Toaster } from "@/components/ui/sonner"
import TopLoader from "nextjs-toploader";
import { TransitionProvider } from '../lib/transition-provider'
import NextTopLoader from 'nextjs-toploader';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Femme Organics',
  description: 'From Nature with love',
}

export const viewport: Viewport = {
  width: 'device-width',
  maximumScale: 3,
  minimumScale: 0.5,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="ar0ijriacdyy0d4d40r6c1090wmn23" />
      </head>
      <body className="text-slate-800 dark:text-slate-200  dark:bg-black my-0 font-sans">
            <ApolloWrapper>
              <TransitionProvider>
               <main className='flex flex-col h-full relative '>
                    <Separator />
                    <div className='flex-1'>
                      {children}
                    </div>
                      <ToastProvider />
                      <Toaster />
                      <NextTopLoader color='#84cc16' crawl height={5} showSpinner={false} />
                      {/* <TopLoader color="#84cc16" crawl height={5} showSpinner={false} /> */}
                  </main>
              </TransitionProvider>
            </ApolloWrapper>
      </body>
    </html>
  )
}
