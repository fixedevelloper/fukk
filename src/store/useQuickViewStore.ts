import { create } from "zustand";
import {Product} from "../types/FrontType";



type QuickViewState = {
    open: boolean;
    product: Product | null;
    openModal: (product: Product) => void;
    closeModal: () => void;
};

export const useQuickViewStore = create<QuickViewState>((set) => ({
    open: false,
    product: null,
    openModal: (product:Product) => set({ open: true, product }),
    closeModal: () => set({ open: false, product: null }),
}));
