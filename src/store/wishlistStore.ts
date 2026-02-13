// src/store/wishlistStore.ts
import { create } from "zustand";
import {Image, Product} from "../types/FrontType";

type WishlistItem = Product;

type WishlistState = {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: number) => void;
    clear: () => void;
};

export const useWishlistStore = create<WishlistState>((set) => ({
    items: [],
    addItem: (item) =>
        set((state) => ({ items: [...state.items, item] })),
    removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
    clear: () => set({ items: [] }),
}));
