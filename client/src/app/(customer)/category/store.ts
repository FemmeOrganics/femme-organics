import { toast } from 'sonner';
import {create} from 'zustand'
import type { GetCategoryQuery } from '@/__gql__/graphql';

export interface StateProps {
    category: GetCategoryQuery["category"];
}

export interface SettersProps {
    setCategory: (category: GetCategoryQuery["category"]) => void;
}

export const useCategoryStore = create<StateProps & SettersProps>((set, get) => ({
    category: undefined,
    setCategory: (category: GetCategoryQuery["category"]) => {
        set({category})
    },
}))