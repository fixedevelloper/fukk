"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {useFiltersStore} from "../../../store/filters.store";
import {Category} from "../../../types/FrontType";


export default function ShopProductCategories() {
    const [showMore, setShowMore] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const { category, setCategory } = useFiltersStore();

    const fetchCategories = async (pageNumber = 1) => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/categories?page=${pageNumber}`
            );
            const json = await res.json();

            setCategories(prev =>
                pageNumber === 1 ? json.data : [...prev, ...json.data]
            );

            setHasMore(json.meta.current_page < json.meta.last_page);
            setPage(json.meta.current_page);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    /* Initial load */
    useEffect(() => {
        fetchCategories(1);
    }, []);

    /* 🔄 Sync URL -> Store */

    useEffect(() => {
        const urlCategory = searchParams.get("category");
        setCategory(urlCategory);
    }, [searchParams]);

    const handleSelect = (slug: string) => {
        setCategory(slug);
        router.replace(`/shop?category=${slug}`, { scroll: false });

    };

    const renderCategory = (cat: Category) => (
        <li key={cat.id}>
            <Link
                href={`/shop?category=${cat.slug}`}
               // onClick={() => handleSelect(cat.slug)}
                className="block"
            >
                {cat.name}
                <span className="number">{cat.products_count}</span>
            </Link>
        </li>
    );

    return (
        <div className="sidebar-border mb-0">
            <div className="sidebar-head">
                <h6 className="color-gray-900">Product Categories</h6>
            </div>

            <div className="sidebar-content">
                <ul className="list-nav-arrow">
                    {categories.map(renderCategory)}
                </ul>

                {hasMore && (
                    <button
                        type="button"
                        onClick={() => {
                            setShowMore(true);
                            fetchCategories(page + 1);
                        }}
                        className="link-see-more mt-10"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "See More"}
                    </button>
                )}
            </div>
        </div>
    );
}


