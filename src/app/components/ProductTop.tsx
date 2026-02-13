"use client"

import React, {useEffect, useState} from "react";
import {Product, ResponsePaginate} from "../../types/FrontType";
import ProductCardTop from "./shop/ProductCardTop";

export default function ProductTops() {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/top-products`)
            .then((res) => res.json())
            .then((data:ResponsePaginate<Product>) => {
                setProducts(data.data || []); // ⚡ ici : on prend data.data
            })
            .catch((err) => console.error(err))
    }, [])
    return (
        <section className="section-box mt-50">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="head-main">
                            <h3 className="mb-5">Produits les plus vendus</h3>
                            <p className="font-base color-gray-500">
                                Produits spéciaux de ce mois.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {products.map((product) => (
                        <ProductCardTop product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </section>

    )
}
