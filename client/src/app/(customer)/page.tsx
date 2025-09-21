import HomePage from './components/Home'
import { SkeletonCard } from './components/SkeletonCard'
import { SuspenseWithTransition } from '@/src/lib/transition-provider'

function Page() {
    return (
      <SuspenseWithTransition fallback={<SkeletonCard orientation='horizontal'/>}>
        <HomePage />
      </SuspenseWithTransition>
    )
}

export default Page


