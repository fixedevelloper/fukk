"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/FrontType";

export function useMegaMenu() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/menus`)
            .then(res => res.json())
            .then(data => setCategories(data.data));
    }, []);

    return categories;
}
