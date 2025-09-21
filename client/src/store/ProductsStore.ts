import { toast } from 'sonner';
import {create} from 'zustand'

export interface StateProps {
    productId: "new" | number | null;
    colors: {id?: number, name: string, value: string}[]
    sizes: {id?: number, name: string, value: string, price: number}[]
}

export interface SettersProps {
    setProductId: (id: number | "new" | null) => void;
    setColors: (color: {id?: number,name: string, value: string}) => void
    setSizes: (color: {id?: number, name: string, value: string, price: number}) => void
    resetStore: () => void
}

export const useProductsStore = create<StateProps & SettersProps>((set, get) => ({
    productId: null,
    colors: [],
    sizes: [],
    setProductId: (id: number| "new" | null) => {
        set({productId: id})
    },
    setColors: (color: {id?: number, name: string, value: string}) => {
        const currentColors = get().colors
        const existingColor = currentColors.find((item) => item.name === color.name)

        if(existingColor){
            return toast(`Color of name ${color.name} already added.`)
        }

        set({colors: [...currentColors, color]})
    },
    setSizes: (size: {id?: number, name: string, value: string, price: number}) => {
        const currentSizes = get().sizes
        const existingSize = currentSizes.find((item) => item.value === size.value)

        if(existingSize){
            return toast(`Size of value ${size.value} already added.`)
        }

        set({sizes: [...currentSizes, size]})
    },
    resetStore: () => {
        set({sizes: [], colors: []})
    }
}))