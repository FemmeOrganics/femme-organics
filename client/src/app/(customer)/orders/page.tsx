
import { Container } from '@/src/components/ui/Container'
import OrderClient from './components/OrderClient'
import { SuspenseWithTransition } from '@/src/lib/transition-provider'
import { SkeletonCard } from '../components/SkeletonCard'

async function OrdersPage() {
 return(
    <SuspenseWithTransition fallback={<SkeletonCard orientation='horizontal'/>}>
      <Container className="space-y-4 h-full">
        <OrderClient />
      </Container>
    </SuspenseWithTransition>
  )
}

export default OrdersPage