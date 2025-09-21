import Footer from '@/components/Footer'
import ModalProvider from '../providers/Modal-Provider'
import { ToastProvider } from '../providers/Toast-Provider'
import Header from './components/Header'
import { CustomerProviders } from '../providers/providers'
import PaymentModal from '@/src/components/modals/PaymentModal'
import WhatsappButton from '@/src/components/whatsapp'
import { MobileFooter } from './components/mobile-footer'
export default async function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    return(
        <main className='relative min-h-screen'>
            <section  className='flex flex-col min-h-screen relative'>
                <ModalProvider />
                <Header />
                <ToastProvider />
                <CustomerProviders>
                    <PaymentModal />
                        <div className='min-h-screen'>
                            {children}
                            <div className='h-10 md:hidden'/>
                        </div>
                    <MobileFooter />
                    <Footer/>
                </CustomerProviders>
            </section>
            <WhatsappButton />
      </main>
    )
}
