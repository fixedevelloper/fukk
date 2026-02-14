"use client";
import React, { useCallback } from "react";
import ShopProductCategories from "./ProductCategory";
import {useFiltersStore} from "../../../store/filters.store";
import { Suspense } from "react";

/* =======================
   Constants
======================= */

const BRANDS = [
    "Apple",
    "Samsung",
    "Sony",
    "LG",
    "Asus",
    "HP",
];

const PRICES = [
    "$0 - $100",
    "$100 - $300",
    "$300 - $500",
    "$500 - $1000",
    "$1000+",
];

/* =======================
   Component
======================= */

export default function ShopFilters() {
    const {
        brands,
        priceRanges,
        toggleBrand,
        togglePrice,
        reset,
    } = useFiltersStore();

    const handleToggleBrand = useCallback(
        (brand: string) => toggleBrand(brand),
        [toggleBrand]
    );

    const handleTogglePrice = useCallback(
        (price: string) => togglePrice(price),
        [togglePrice]
    );

    return (
        <>
            {/* Categories */}
            <Suspense fallback={<div>Loading...</div>}>
            <ShopProductCategories />
            </Suspense>
            {/* Filters */}
            <div className="sidebar-border mb-40">
                <div className="sidebar-head">
                    <h6 className="color-gray-900">Filters</h6>
                </div>

                <div className="sidebar-content">
                    {/* Brands */}
                    <FilterBlock title="Brands">
                        {BRANDS.map((brand) => (
                            <Checkbox
                                key={brand}
                                label={brand}
                                checked={brands.includes(brand)}
                                onChange={() => handleToggleBrand(brand)}
                            />
                        ))}
                    </FilterBlock>

                    {/* Price */}
                    <FilterBlock title="Price">
                        {PRICES.map((price) => (
                            <Checkbox
                                key={price}
                                label={price}
                                checked={priceRanges.includes(price)}
                                onChange={() => handleTogglePrice(price)}
                            />
                        ))}
                    </FilterBlock>

                    {/* Reset */}
                    {(brands.length > 0 || priceRanges.length > 0) && (
                        <button
                            type="button"
                            className="btn btn-filter font-sm mt-15 w-full"
                            onClick={reset}
                        >
                            Reset filters
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}


/* ----------------- */
/* Sub components    */
/* ----------------- */

function FilterBlock({
                         title,
                         children,
                     }: {
    title: string;
    children: React.ReactNode;
}) {
    return (

        <>
            <h6 className="color-gray-900 mt-20 mb-10">{title}</h6>
            <ul className="list-checkbox">{children}</ul>
        </>
    );
}

function Checkbox({
                      label,
                      checked,
                      onChange,
                  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
}) {
    return (

        <li>
            <label className="cb-container">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <span className="text-small">{label}</span>
                <span className="checkmark" />
            </label>
        </li>
    );
}
