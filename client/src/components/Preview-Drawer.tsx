import Gallery from "./gallery"
import Info from "./Info"
import { DrawerWrapper, useDrawer } from "@/components/ui/drawer-wrapper"
import { ScrollArea } from "./ui/scroll-area"

function PreviewDrawer() {
    const previewModal = useDrawer()
    const product = useDrawer((state) => state.data)

    if(!product) return null

    return (
        <DrawerWrapper isOpen={previewModal.isOpen} onClose={previewModal.onClose} headerClass="p-0 gap-0">
            <div className="h-[80vh] w-full">
                <ScrollArea className="h-full px-2 py-5">
                    <div className="grid w-full grid-cols-1 items-start gap-x-6 sm:grid-cols-12 lg:gap-x-6 ">
                        <div className="sm:col-span-4 lg:col-span-5">
                            <Gallery images={product.images} />
                        </div>
                        <div className="sm:col-span-8 lg:col-span-7">
                            <Info data={product} />
                        </div>
                        <div className="h-20" />
                    </div>
                </ScrollArea >
            </div>
        </DrawerWrapper>
        
            
    )
}

export default PreviewDrawer
