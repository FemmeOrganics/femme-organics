"use client";

import type { ReadonlyURLSearchParams } from "next/navigation";
import type { z } from "zod";
import { create } from "zustand";

export interface PickupLocationType {
    id: string;
    address: string;
  }

export interface CartItem {
  quantity: number;
  pickupLocation?: PickupLocationType;
  skuId?: string;
  locationPriceId?: string;
  metaData: {
    price: number;
    name: string;
    image?: string;
    uom?: string;
    batchSize?: number;
    moq?: number;
    pickupLocations?: PickupLocationType[];
  };
}


export interface LocationProps {
  latLng: { lat: number; lng: number };
  address: string;
  locationId: string;
}


export interface PricedProduct {
  productId: string;
  id: string;
  images: string[];
  name: string;
  description?: string;
  pickupLocationId: string;
  pickupRegionId: string;
  transportCost: number;
  priceRange?: {
    min: number;
    max: number;
  };
  uom: string;
  itemType: string;
  locationPriceId?: string;
  variants?: Variant[];
  skus?: Sku[];
  skuId?: string;
  available?: boolean;
}

export interface Sku {
  id: string;
  name: string;
  variants: Variant[];
  price: number;
  locationPriceId: string;
  batchSize: number;
  moq: number;
}

export interface Attribute {
  attributeName: string;
  attributeValues: Variant[];
  attributeId: string;
}

export interface Variant {
  variantId: string;
  variantValue: string;
  variantMetadata: {
    price: number;
    locationPriceId: string;
    weight: number;
    colorCode?: string;
    colorCategory?: string;
  };
}

export interface OrderItems {
  stashId: string;
  amount: number;
  totalTransportCost?: number;
  costWithoutTransport?: number;
  items: [
    {
      transportCost: number;
      unitPrice: number;
      skuId: string;
      quantity: number;
      productId: string;
      pickupLocation: string;
      productName: string;
      basePrice: number;
      totalPrice: number;
      category: string;
      uom: string;
    },
  ];
  discount?: {
    discountDescription: string;
    discountId: string;
    totalDiscount: number;
  };
}

interface StateProps {
  cart: CartItem[];
  selectedCategory: string | undefined;
 
  showCheckout: boolean;
  showPayment: boolean;
  showLandingRates: boolean;
  expectedDeliveryDate?: Date;
  deliveryInstructions: string;
  orderWeight: number;
  location?: LocationProps;
  pickupRegionId: string;
  openModal: boolean;
  showTip: boolean;
  openCart: boolean;
  uploading: boolean;
  completed: boolean;
  selfCollectDeliveryInformation: string;
  orderItems: OrderItems | undefined;
  loading: boolean;
  showTransactions: boolean;
  statements: unknown[];
  url: string | undefined;
  partner: {
    getPartner: {
      AccountBalance: number;
    };
  };
  selectedProduct: PricedProduct | null;
  selectedFilters: Record<string, string>[];
  discountCode: string | undefined;
  redeemReferralBonus: boolean;
  referralParams?: ReadonlyURLSearchParams;
  dummyUser?: { name?: string; email?: string; phone_number?: string };
}

interface Actions {
  addToCart: ({
    quantity,
    pickupLocation,
    skuId,
    locationPriceId,
    metaData,
  }: CartItem) => void;
  getItemsInCart: () => void;
  setCart: (cart: CartItem[]) => void;
  setSelectedFilters: (filters: Record<string, string>[]) => void;
  removeItemFromCart: (skuId: string) => void;
  addedToCart: (skuId: string) => boolean;
  updateQuantity: (skuId: string, quantity: number) => void;
}

const initialState: StateProps = {
  cart: [],
  expectedDeliveryDate: new Date(new Date().getDate() + 2),
  deliveryInstructions: "",
  orderWeight: 0,
  location: undefined,
  openCart: false,
  selfCollectDeliveryInformation: "",
  orderItems: undefined,
  statements: [],
  url: undefined,
};

// get the date for the expected delivery date two days from now
const date = new Date();
date.setDate(date.getDate() + 2);
initialState.expectedDeliveryDate;

export const useData = create<StateProps & Actions>()((set, get) => ({
  ...initialState,

  addToCart: ({
    quantity,
    pickupLocation,
    skuId,
    locationPriceId,
    metaData,
  }: CartItem) => {
    set((state) => {
      const cart = [...state.cart];
      const existingProduct = cart.find((item) => item?.skuId === skuId);
      if (existingProduct?.quantity) {
        existingProduct.quantity += quantity ?? 100;
      } else {
        cart.push({
          pickupLocation,
          metaData,
          skuId: skuId ?? "",
          quantity: quantity ?? 100,
          locationPriceId: locationPriceId ?? "",
        });
      }

      localStorage.setItem("cartData", JSON.stringify(cart));
      state.cart = cart;
      return { ...state, cart };
    });
  },

  removeItemFromCart: (skuId: string) => {
    const newCart = [...get().cart];
    const existingProduct = newCart.find((item) => item.skuId === skuId);
    if (existingProduct) {
      const index = newCart.indexOf(existingProduct);
      newCart.splice(index, 1);
      localStorage.setItem("cartData", JSON.stringify(newCart));
      set((state) => ({
        ...state,
        cart: newCart,
      }));
    }
  },

  updateQuantity: (skuId: string, quantity: number) => {
    set((state) => {
      const cart = [...state.cart];
      const existingProduct = cart.find((item) => item.skuId === skuId);
      if (existingProduct) {
        existingProduct.quantity = quantity;
        localStorage.setItem("cartData", JSON.stringify(cart));
      }
      state.cart = cart;
      return { ...state, cart };
    });
  },

  getItemsInCart: () => {
    const cartData =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("cartData")
        : "[]";
    const cart = JSON.parse(cartData || "[]");
    set((state) => ({ ...state, cart }));
    return cart;
  },

  addedToCart: (skuId) => {
    const cart = get().cart;
    const existingProduct = cart.find((item) => item.skuId === skuId);
    return Boolean(existingProduct);
  },

  setCart: (cart) => {
    set((state) => ({ ...state, cart }));
  },


  setSelectedFilters: (filters) => {
    set((state) => ({ ...state, selectedFilters: filters }));
  },

}));
