"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

//@ts-ignore
import noImage from "@/app/assets/no-image.jpeg";
import Image from "next/image"
import IconButton from "@/components/ui/Icon-Button"
import {  Expand, ShoppingCart } from "lucide-react"
import type { MouseEventHandler } from "react"
import { usePreviewModal } from "@/hooks/use-Preview-modal"
import { useCart } from "@/hooks/use-Cart-Store"
import type { GetProductQuery } from "@/__gql__/graphql"
import { useScreenSize } from "@/src/hooks/use-screen-size";
import { useDrawer } from "./drawer-wrapper";

interface ProductCard {
    data: GetProductQuery["product"]
}

export function ProductCard(
    {data}: ProductCard
) {
    const [url, setUrl] = useState<string | undefined>(undefined);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const previewModal = usePreviewModal()
    const drawer = useDrawer()
    const cart = useCart()
    const {isSm} = useScreenSize()

    useEffect(() => {
        if (url && linkRef.current) {
        linkRef.current.click();
        }
    }, [url]);

  
  
    const handleClick = () => {
        setUrl(`/product/${data?.id}`)
    }
    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        if (isSm) drawer.onOpen(data)
        else previewModal.onOpen(data)
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem({...data, quantity: 1})
    }

    return (
    <div className="w-fit h-fit">
        <Link href={url ?? ""} ref={linkRef} />
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
            className="group relative bg-gray-200 flex max-h-[240px] min-h-[240px] min-w-[145px] max-w-[175px] md:min-w-[180px] flex-1 cursor-pointer flex-col items-center justify-center space-y-2 rounded-md border border-[#CBD5E1] p-2 md:h-[350px] md:w-[220px] dark:border-[#334155]"
            onClick={handleClick}
            >
            <div className="grow flex-1 relative w-full h-full">
                <Image
                    alt={data.name}
                    className="w-full flex-1 grow rounded-md object-cover mix-blend-multiply h-full min-h-[160px] max-h-[160px]"
                    height={100}
                    src={data.images[0]?.url ?? noImage}
                    width={200}
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-slate-100 bg-slate-500/60 rounded-full h-8 w-8" />}
                        />
                        {!data.sizes?.length && !data.colors?.length  && <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-slate-100  bg-slate-500/60 rounded-full h-8 w-8" />}
                        />}
                        
                    </div>
                </div>
            </div>
            
            <div className="mt-auto flex h-[80px] w-full flex-col justify-end md:h-[150px]">
                <p className="line-clamp-2 w-fit text-black capitalize">
                {data.name}
                </p>
                <p className="mt-1 line-clamp-2 text-nowrap text-[#1A1A1D] text-base">
                <span className="text-nowrap font-semibold text-sm md:text-lg">
                        KES{" "}
                        {data.price.toLocaleString()}
                        </span>
                </p>
            </div>
        </div>
    </div>
  );
}
