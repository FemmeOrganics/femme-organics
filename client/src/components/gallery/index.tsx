'use client'
import { Tab } from "@headlessui/react"
import Image from "next/image"
import GalleryTab from "./Gallery-Tab"
import type { GetProductQuery } from "@/__gql__/graphql"
import { useScreenSize } from "@/src/hooks/use-screen-size"
import { cn } from "@/src/lib/utils"
// @ts-ignore
import noImage from "@/app/assets/no-image.jpeg";

interface GalleryPros {
    images: GetProductQuery["product"]["images"]
}
function Gallery({images}: GalleryPros) {
    const {isSm} = useScreenSize()

  return (
    <Tab.Group as='div' className={cn("flex flex-col-reverse", isSm ? "h-[40vh]" : "")}>
        <div 
            className="mx-auto mt-6 hidden w-full max-w-2xl sm:block md:max-w-none max-h-"
        >
            <Tab.List className={'grid grid-cols-4 gap-6'}>
                { images?.map((image) => (
                    <GalleryTab key={image?.id} image={image} />
                ))}
            </Tab.List>
        </div>
        <Tab.Panels className={cn("aspect-square w-full", isSm ? "" : "")} >
            {[...images, ...(images.length ? [] : [{id: 2, url:noImage}])]?.map((image) => (
                <Tab.Panel key={image?.id}>
                    <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                        <Image
                            fill
                            src={image?.url ?? ""}
                            alt="Image"
                            className={cn("object-cover object-center",  isSm ? "" : "")}
                        />
                    </div>
                </Tab.Panel>
            ))}
        </Tab.Panels>
    </Tab.Group>
  )
}

export default Gallery
