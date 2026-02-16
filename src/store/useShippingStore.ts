import { create } from "zustand";
import { persist } from "zustand/middleware";

type ShippingState = {
    cityId: number | null;
    zoneId: number | null;
    price: number | null;

    setCity: (cityId: number) => void;
    setZone: (zoneId: number) => void;
    setPrice: (price: number) => void;
    reset: () => void;
};

export const useShippingStore = create<ShippingState>()(
    persist(
        (set) => ({
            cityId: null,
            zoneId: null,
            price: null,

            setCity: (cityId) =>
                set(() => ({
                    cityId,
                    zoneId: null,
                    price: null,
                })),

            setZone: (zoneId) =>
                set(() => ({
                    zoneId,
                })),

            setPrice: (price) =>
                set(() => ({
                    price,
                })),

            reset: () =>
                set(() => ({
                    cityId: null,
                    zoneId: null,
                    price: null,
                })),
        }),
        {
            name: "shipping-storage", // localStorage key
        }
    )
);
