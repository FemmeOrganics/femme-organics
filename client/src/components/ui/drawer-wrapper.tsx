"use client"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useEffect, useState } from "react";
import { create } from "zustand";
import type { GetProductQuery } from "@/__gql__/graphql";

interface PreviewModalStore {
    isOpen: boolean;
    data?: GetProductQuery["product"];
    onOpen: (data: GetProductQuery["product"]) => void;
    onClose: () => void;
}

export const useDrawer = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen:(data: GetProductQuery["product"]) => set({data, isOpen:true}),
    onClose: () => set({isOpen:false})
}))

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string
  headerClass?: string
};


export function DrawerWrapper({children, isOpen, title, description, onClose, headerClass}: DrawerProps) {
     const [isMounted, setIsMounted] = useState(false);
    const onChange = (open: boolean) => {
        if (!open) {
         onClose();
        }
    };
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if (!isMounted) {
        return null;
    }
    return (
        <Drawer open={isOpen} onOpenChange={onChange}>
            <DrawerContent className="p-0 bg-slate-100 dark:bg-slate-100 h-fit max-h-[85dvh] ">
                <DrawerHeader className={headerClass}>
                  <DrawerTitle className="text-center font-semibold text-2xl text-[#0F172A]">
                    {title ?? ""}
                  </DrawerTitle>
                  <DrawerDescription className="my-2 text-center text-brand-primary text-sm">
                    {description ?? ""}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="min-h-[200px] mx-auto w-full flex">
                    {children}
                </div>
                <div className="h-10"/>
            </DrawerContent>
        </Drawer>
    )
}
