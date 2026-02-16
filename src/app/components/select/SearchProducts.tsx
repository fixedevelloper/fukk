"use client";

import React, { useState, useEffect, useRef } from "react";
import axiosServices from "../../../lib/axios";
import {useRouter} from "next/navigation";
import {Product} from "../../../types/FrontType";


export default function SearchProducts() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const popupRef = useRef<HTMLDivElement>(null);

    // Fermer popup si clic en dehors
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setShowPopup(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Recherche avec debounce
    useEffect(() => {
        if (!search) {
            setResults([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await axiosServices.get("/api/products", {
                    params: { search, limit: 10 },
                });
                setResults(res.data.data);
                setShowPopup(true);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(delayDebounce);
    }, [search]);

    return (
        <div className="header-search position-relative" ref={popupRef}>
            <div className="box-header-search">
                <form
                    className="form-search"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="box-keysearch">
                        <input
                            className="form-control font-xs"
                            type="text"
                            value={search}
                            placeholder="Que cherches-tu aujourd’hui ?"
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => search && setShowPopup(true)}
                        />
                    </div>
                </form>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="search-popup position-absolute bg-white shadow border mt-1 w-100" style={{ zIndex: 1000 }}>
                    {loading ? (
                        <div className="p-3 text-center">Chargement...</div>
                    ) : results.length === 0 ? (
                        <div className="p-3 text-center">Aucun résultat</div>
                    ) : (
                        <ul className="list-unstyled mb-0">
                            {results.map((product) => (
                                <li key={product.id} className="p-2 border-bottom hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        router.push(`/shop/product-show/${product.slug}`); // ✅ SPA navigation
                                        setShowPopup(false);
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        {product.image && (
                                            <img src={product.image.thumb} alt={product.name} style={{ width: 40, height: 40, objectFit: "cover" }} />
                                        )}
                                        <span>{product.name}</span>
                                        {product.price && <span className="ms-auto">{product.price} FCFA</span>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
