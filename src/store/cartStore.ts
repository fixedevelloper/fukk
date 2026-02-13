import { create } from "zustand";
import {persist} from "zustand/middleware";
import {Image, Store} from "../types/FrontType";

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: Image;
    store?: Store;
    slug?: string;
};

type CartState = {
    items: CartItem[];
    open: boolean;
    addItem: (item: CartItem) => void;
    updateQuantity: (id: number, quantity: number) => void;
    increaseItem: (id:number) => void;
    decreaseItem: (id:number) => void;
    removeItem: (id: number) => void;
    toggleOpen: () => void;
    setOpen: (value: boolean) => void;
    clearCart: () => void; // ✅ ICI
    total: () => number;
};

export const useCartStore = create(
    persist<CartState>(
        (set, get) => ({
            items: [],
            open: false,

            addItem: (item: CartItem) => {
                const items = get().items;
                const existing = items.find(i => i.id === item.id);

                if (existing) {
                    set({
                        items: items.map(i =>
                            i.id === item.id
                                ? { ...i, quantity: (i.quantity ?? 1) + (item.quantity ?? 1) }
                                : i
                        ),
                    });
                } else {
                    set({
                        items: [...items, { ...item, quantity: item.quantity ?? 1 }],
                    });
                }
            },

            increaseItem: (id: number) => {
                set({
                    items: get().items.map(i =>
                        i.id === id
                            ? { ...i, quantity: (i.quantity ?? 1) + 1 }
                            : i
                    ),
                });
            },

            decreaseItem: (id: number) => {
                const items = get().items;

                const updatedItems = items
                    .map(i =>
                        i.id === id
                            ? { ...i, quantity: (i.quantity ?? 1) - 1 }
                            : i
                    )
                    .filter(i => (i.quantity ?? 0) > 0); // 🔥 supprime si 0

                set({ items: updatedItems });
            },

            removeItem: (id: number) => {
                set({ items: get().items.filter(i => i.id !== id) });
            },
            updateQuantity: (id: number, quantity: number) => {
                if (quantity <= 0) {
                    set({ items: get().items.filter(i => i.id !== id) });
                } else {
                    set({
                        items: get().items.map(i => i.id === id ? { ...i, quantity } : i),
                    });
                }
            },
            clearCart: () => set({ items: [] }),

            toggleOpen: () => set({ open: !get().open }),
            setOpen: (value: boolean) => set({ open: value }),

            total: () =>
                get().items.reduce(
                    (sum, i) => sum + i.price * (i.quantity ?? 1),
                    0
                ),
        }),
        {
            name: "cart-storage",
        }
    )
);


