import { create } from "zustand";
import type { GetProductQuery } from "@/__gql__/graphql";

interface PreviewModalStore {
    isOpen: boolean;
    data?: GetProductQuery["product"];
    onOpen: (data: GetProductQuery["product"]) => void;
    onClose: () => void;
}

export const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen:(data: GetProductQuery["product"]) => set({data, isOpen:true}),
    onClose: () => set({isOpen:false})
}))