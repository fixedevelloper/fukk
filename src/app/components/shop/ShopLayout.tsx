"use client";

import ShopFilters from "./ShopFilters";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import React from "react";
import Link from "next/link";

export default function ShopLayout() {
    return (
        <>
            <div className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link className="font-xs color-gray-1000" href="/">Home</Link></li>
                            <li><Link className="font-xs color-gray-500" href="/shop">Electronics</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        <div className="section-box shop-template mt-30">
            <div className="container">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3 order-last order-lg-first">
                        <ShopFilters />
                    </div>

                    {/* Products */}
                    <div className="col-lg-9 order-first order-lg-last">
                        <ProductGrid />
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
            </>
    );
}
