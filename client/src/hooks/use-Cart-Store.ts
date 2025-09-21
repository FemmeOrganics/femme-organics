import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";
import {produce} from 'immer';
import type { GetProductQuery, GetColorQuery, GetCategoryQuery, GetSizeQuery } from "@/__gql__/graphql";

type PaymentType = "mpesa" | "visa" | null
export interface CartItemType {
    id: number;
    category: GetCategoryQuery["category"];
    name: string;
    price: number;
    isFeatured?: boolean;
    size?: GetSizeQuery["size"];
    color?: GetColorQuery["color"];
    images?: {id:number, url: string}[],
    quantity: number,
    totalPrice?: number
}

interface CartStore {
    items: CartItemType[];
    paymentMethod: PaymentType;
}

interface CartStoreActions {
    addItem: (data: CartItemType) => void;
    removeItem: (data: { id: number; sizeId?: number; colorId?: number }) => void;
    removeAll: () => void;
    addPaymentMethod: (paymentMethod: PaymentType) => void;
    updateQuantity: (quantity: number, itemId: number) => void;
}

export const useCart = create(
    persist<CartStore & CartStoreActions>((set, get) => ({
        items: [],
        paymentMethod: null,
        addItem: (data: CartItemType) => {
            const currentItems = get().items;
            
            const existingItem = currentItems.find((item) => 
              item.id === data.id &&
              item.size?.id === data.size?.id &&
              item.color?.id === data.color?.id
            );
          
            if (existingItem) {
              existingItem.quantity += data.quantity;
              existingItem.totalPrice = existingItem.quantity * (existingItem.price ?? 0);
              toast("Item updated in cart");
              set({ items: [...currentItems] }); // update state to trigger re-render
              return;
            }
          
            set({
              items: [
                ...currentItems,
                { ...data, totalPrice: (data.quantity ?? 1) * (data.price ?? 0) }
              ]
            });
          
            toast.success("Item added to cart");
        },
        updateQuantity: (quantity: number, itemId: number) => {
            set(produce((draft) => {
                
                const currentItems: CartItemType[] = draft.items;
                const existingItem = currentItems.find((item) => item.id === itemId);
                if(existingItem) {
                    existingItem.quantity = quantity
                    existingItem.totalPrice = existingItem.quantity * existingItem.price
                } else{
                    toast.error("Something went wrong.")
                }
            }))
            
        },
        removeItem: (data: { id: number; sizeId?: number; colorId?: number }) => {
            const { id, sizeId, colorId } = data;
          
            set({
              items: get().items.filter((item) => 
                !(item.id === id &&
                  item.size?.id === sizeId &&
                  item.color?.id === colorId)
              )
            });
          
            toast.success("Item removed from the cart.");
          },
        removeAll: () => set({items: []}),
        addPaymentMethod: (paymentMethod: PaymentType) => {
            set({paymentMethod})
        }
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
)