"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/src/lib/utils";
import { useEffect, useState } from "react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  onCloseAction?: () => void
};


export function DialogWrapper({children, isOpen, title, onClose, description, className, onCloseAction}: DialogProps) {
     const [isMounted, setIsMounted] = useState(false);
    const onChange = (open: boolean) => {
        // if (open) {
          onCloseAction && onCloseAction()
          onClose();
        // }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if (!isMounted) {
        return null;
    }
    return (
        <Dialog open={isOpen} onOpenChange={(value)=> onChange(value)}>
            <DialogContent className={cn("bg-slate-100  dark:bg-black",className)}>
              <DialogHeader className="bg-slate-100 dark:bg-black">
                <DialogTitle className="text-center font-semibold text-2xl text-[#0F172A] dark:text-white">
                  {title ?? ""}
                </DialogTitle>
                <DialogDescription className="my-2 text-center text-brand-primary text-sm">
                  {description ?? ""}
                </DialogDescription>
              </DialogHeader>
                <div className="mx-auto w-full px-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}
