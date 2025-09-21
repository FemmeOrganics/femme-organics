import { create } from "zustand";
import type { GetLocationQuery, GetZoneQuery } from "@/__gql__/graphql";

interface ZoneDialogProps {
    isOpen: boolean;
    data?: GetZoneQuery["zone"];
    onOpen: (data?:GetZoneQuery["zone"]) => void;
    onClose: () => void;
}

export const useZoneDialog = create<ZoneDialogProps>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen:(data?: GetZoneQuery["zone"]) => set({data, isOpen:true}),
    onClose: () => set({isOpen:false})
}))