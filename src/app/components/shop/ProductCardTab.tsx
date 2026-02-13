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
export default function ProductCardTab({ product }: Props) {
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
                    <a className="font-xs color-gray-500" href="#">Marque</a>
                    <br />
                    <a className="color-brand-3 font-sm-bold" href="#">{product.name}</a>
                    <div className="rating">
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src="/images/template/icons/star.svg" alt="étoile" />
                        ))}
                        <span className="font-xs color-gray-500">(65)</span>
                    </div>
                    <Link href={'/shop/product-show/'+product.slug}>
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

                    <ul className="list-features">
                        <li>Écran Retina 5K de 27 pouces (diagonal)</li>
                        <li>Processeur Intel Core i5 10ᵉ génération 6 cœurs à 3,1 GHz</li>
                        <li>Carte graphique AMD Radeon Pro 5300</li>
                    </ul>
                </div>
            </div>
        </div>

    );
}
