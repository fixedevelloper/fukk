import { create } from "zustand";

type FiltersState = {
    category: string | null;
    setCategory: (category: string | null) => void;

    brands: string[];
    priceRanges: string[];

    toggleBrand: (brand: string) => void;
    togglePrice: (price: string) => void;
    reset: () => void;
};

export const useFiltersStore = create<FiltersState>((set) => ({
    category: null,

    brands: [],
    priceRanges: [],

    setCategory: (category) => set({ category }),

    toggleBrand: (brand) =>
        set((state) => ({
            brands: state.brands.includes(brand)
                ? state.brands.filter((b) => b !== brand)
                : [...state.brands, brand],
        })),

    togglePrice: (price) =>
        set((state) => ({
            priceRanges: state.priceRanges.includes(price)
                ? state.priceRanges.filter((p) => p !== price)
                : [...state.priceRanges, price],
        })),

    reset: () =>
        set({
            category: null,
            brands: [],
            priceRanges: [],
        }),
}));
