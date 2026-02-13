"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {Product, ResponsePaginate} from "../../../../types/FrontType";
import ProductCardTab from "../../../components/shop/ProductCardTab";

type Props = {
    type: string;
    page: number;
    perPage: number;
};

export default function ProductByTypeClient({ type, page, perPage }: Props) {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/productbytype/${type}?page=${page}&per_page=${perPage}`
        )
            .then((res) => res.json())
            .then((data: ResponsePaginate<Product>) => {
                setProducts(data.data || []);
                setTotalPages(data.meta.last_page);
            });
    }, [type, page, perPage]);

    return (
        <div className="section-box shop-template mt-30">
            <div className="container">

                {/* HEADER */}
                <div className="row">
                    <div className="col-lg-3">
                        <div className="sidebar-ads">
                            <div className="bg-electronic">
                                <span className="big-deal mb-5">Offre spéciale</span>
                                <h4 className="font-25">{type}</h4>
                                <p className="font-16 color-brand-3">
                                    Produits tendance et de qualité
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="banner-top-gray-100">
                            <div className="banner-ads-top mb-30">
                                <img
                                    src="/images/page/shop/grid-2/banner.png"
                                    alt={`Produits ${type}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FILTRES */}
                <div className="box-filters mt-0 pb-5 border-bottom">
                    <div className="row">
                        <div className="col-lg-6">
              <span className="font-sm color-gray-900 font-medium">
                Page {page} sur {totalPages}
              </span>
                        </div>
                    </div>
                </div>

                {/* PRODUITS */}
                <div className="list-products-5 mt-20">
                    {products.map((product) => (
                        <ProductCardTab key={product.id} product={product} />
                    ))}
                </div>

                {/* PAGINATION */}
                <nav className="mt-30">
                    <ul className="pagination">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <li key={i} className={`page-item ${page === i + 1 ? "active" : ""}`}>
                                <Link
                                    className="page-link"
                                    href={`/shop/type/${type}?page=${i + 1}`}
                                >
                                    {i + 1}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
