import { create } from "zustand";

type PaginationState = {
    page: number;
    perPage: number;
    totalPages: number;
    setPage: (page: number) => void;
    setTotalPages: (total: number) => void;
    reset: () => void;
};

export const usePaginationStore = create<PaginationState>((set) => ({
    page: 1,
    perPage: 12,
    totalPages: 1,

    setPage: (page) => set({ page }),
    setTotalPages: (total) => set({ totalPages: total }),
    reset: () => set({ page: 1 }),
}));
