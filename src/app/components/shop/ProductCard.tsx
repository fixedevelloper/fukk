"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import {useQuickViewStore} from "../../../store/useQuickViewStore";
import Link from "next/link";
import {Product} from "../../../types/FrontType";


type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    const addWishlist = useWishlistStore((s) => s.addItem);
    const addCart = useCartStore((s) => s.addItem);
    const openModal = useQuickViewStore((s) => s.openModal);


    return (
        <div className="card-grid-style-3">
            <div className="card-grid-inner">
                <div className="tools">
                    <button
                        className="btn btn-wishlist"
                        onClick={() => addWishlist(product)}
                        aria-label="Ajouter aux favoris"
                    />
                    <button
                        className="btn btn-quickview btn-tooltip"
                        aria-label="Aperçu rapide"
                        onClick={() => openModal(product)}
                    />
                </div>

                <div className="image-box">
                    <img src={product.image?.thumb} alt={product.name} />
                </div>

                <div className="info-right">
                    <Link href={'/shop/product-show/' + product.slug}>
                        <h6 className="color-brand-3">{product.name}</h6>
                    </Link>
                    <strong className="price-main">{product.price} €</strong>

                    <div className="mt-20">
                        <button
                            className="btn btn-cart"
                            onClick={() => addCart({
                                id: product.id,
                                name: product.name,
                                price: product.sale_price ?? product.price,
                                quantity: 1,
                                image: product.image,
                                store: product.store,
                                slug: product.slug,
                            })}
                        >
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}
