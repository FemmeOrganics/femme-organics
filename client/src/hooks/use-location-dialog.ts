import { create } from "zustand";
import type { GetLocationQuery } from "@/__gql__/graphql";

interface AddStoreModalProps {
    isOpen: boolean;
    data: {location?: GetLocationQuery["location"], zoneId?: number};
    onOpen: ({location, zoneId}:{location?: GetLocationQuery["location"], zoneId: number}) => void;
    onClose: () => void;
}

export const useLocationDialog = create<AddStoreModalProps>((set) => ({
    isOpen: false,
    data: {location: undefined, zoneId: undefined},
    onOpen:({location, zoneId}: {location?: GetLocationQuery["location"], zoneId: number}) => set({data: {location, zoneId}, isOpen:true}),
    onClose: () => set({isOpen:false})
}))