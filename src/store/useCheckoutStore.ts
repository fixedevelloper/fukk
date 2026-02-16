import { create } from "zustand";

interface CheckoutState {
    itemCheckouts: any[];
    selectedShipping: any | null;

    setShipping: (shipping: any) => void;
    clearShipping: () => void;

    clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
    itemCheckouts: [],
    selectedShipping: null,

    setShipping: (shipping) => set({ selectedShipping: shipping }),
    clearShipping: () => set({ selectedShipping: null }),

    clearCheckout: () =>
        set({
            selectedShipping: null, // 🔥 reset shipping quand panier vidé
        }),
}));
