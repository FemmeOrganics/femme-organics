import type { Metadata, Viewport } from 'next'
import CustomThemeProvider from '@/providers/CustomThemeProvider'
import { Separator } from '@/components/ui/separator'
import { StoreModal } from '@/src/components/modals/storeModal'
import AdminAuthGuard from '@/src/components/admin-auth-guard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Femme Organics',
  description: 'femme organics',
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
    <main className="h-screen text-slate-800 dark:text-slate-200  dark:bg-black my-0 font-sans max-w-[1920px]">
      <CustomThemeProvider>
        <AdminAuthGuard>
        <div className='flex flex-col h-full relative '>
          <Separator />
          <div className='flex-1 overflow-hidden'>
              {children}
          </div>
        </div>
        <StoreModal />
        </AdminAuthGuard>
      </CustomThemeProvider>
    </main>
  )
}
