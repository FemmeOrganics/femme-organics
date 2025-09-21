import { setCookie } from "cookies-next";
import { create } from "zustand";

export type UserType = { phoneNumber: string, role: string, id: number, customerId: number, name: string }

interface GlobalStoreState {
    user: UserType | null
}

interface GlobalStoreAction {
    setUser: (user: UserType | null) => void
}

export const useGlobalStore = create<GlobalStoreState & GlobalStoreAction>( (set) => ({
    user: null,
    setUser: (user: UserType | null) => set({user}),
  
}))