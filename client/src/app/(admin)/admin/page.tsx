"use client"
import { GetAllStoresDocument } from "@/graphql"
import {ReactiveStoreModal} from "./components/ReactiveStoreModal"
import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import StoreCard from "./components/StoreCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStoreModal } from "@/src/hooks/useStoreModal"
import { useEffect, } from "react"
import { useSuspenseQuery } from "@apollo/client"
import { Button } from "@/src/components/ui/button"
import { useRouter } from 'nextjs-toploader/app';
// used to trigger the modal to add a store nothing is returned
function SetupPage() {
  const storeModal = useStoreModal()
  const router = useRouter()
  const {data} = useSuspenseQuery(
    GetAllStoresDocument
  )
  let stores: typeof data.stores = []
  stores = data.stores

  useEffect(() => {
    if (!stores?.length) {
      storeModal.onOpen()
    } else {
      router.push(`/admin/${stores[0]?.id}`)
    }
  }, [ stores?.length])


  return (
    <div className="flex-col items-center justify-center w-full h-full relative">
      <div className="flex w-full justify-between items-center bg-muted/80 dark:bg-muted/50 px-2 py-2 sticky top-0">
        <Heading 
          title={`Stores (${stores?.length})`}
          description="Overview of all your stores."
        />
        {!stores?.length && <Button onClick={() => storeModal.onOpen()}>
          Create Store
          </Button>}
      </div>
      <Separator className="my-2 " />
      <ScrollArea className=" px-2 h-full">
        <div className="grid gap-8 w-full">
          {!stores?.length && <ReactiveStoreModal/> }
          {stores?.map((store) => <StoreCard key={store?.id} store={store} />)}
        </div>
      </ScrollArea>
    </div>
  )
}

export default SetupPage