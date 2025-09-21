import {create} from "zustand"
import {produce} from "immer"

export interface ProductAttributeType {
    variant: {id: string, name: string}
    sku: unknown
}

interface ProductToCartState {
    attributes: ProductAttributeType[] | []
}

interface ProductToCartSetter {
    addAttributes: (attributes: ProductAttributeType[]) => void;
    updateAttribute: ({attribute}: {attribute: ProductAttributeType}) => void;
}

export const useProductToCart = create<ProductToCartState & ProductToCartSetter>((set) => ({
    attributes: [],
    addAttributes: (attributes: ProductAttributeType[]) => {
        set(
            produce((draft: ProductToCartState) => {
                draft.attributes = attributes
            })
        )
    },
    updateAttribute: ({attribute: payload}: {attribute: ProductAttributeType}) => {
        set(
            produce((draft: ProductToCartState) => {
                const variant = draft.attributes.find(
                    (variant: ProductAttributeType) =>
                    variant.variant.id === payload.variant.id,
                );
                if (variant) {
                    variant.sku = payload.sku;
                } else {
                    draft.attributes = [...draft.attributes, payload];
                }
            })
        )
    }
}))