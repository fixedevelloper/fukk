'use client';

import React from "react";
import { useCartStore } from "../../../../store/cartStore";
import Link from "next/link";

export default function ShopCart() {
    const { items, addItem, removeItem,decreaseItem,increaseItem } = useCartStore();

    // Calculer le sous-total
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>

            {/* Fil d’Ariane */}
            <div className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li>
                                <Link className="font-xs color-gray-1000" href="/">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link className="font-xs color-gray-500" href="/shop">
                                    Boutique
                                </Link>
                            </li>
                            <li>
                                <Link className="font-xs color-gray-500" href="/shop/shop-cart">
                                    Panier
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="section-box shop-template">
                <div className="container">
                    <div className="row">
                        {/* PANIER PRINCIPAL */}
                        <div className="col-lg-9">
                            <div className="box-carts">
                                <div className="head-wishlist">
                                    <div className="item-wishlist d-flex align-items-center">
                                        <div className="wishlist-cb me-2">
                                            <input type="checkbox" className="cb-layout cb-all" />
                                        </div>
                                        <div className="wishlist-product flex-grow-1">
                                            <span className="font-md-bold color-brand-3">Produit</span>
                                        </div>
                                        <div className="wishlist-price me-3">
                                            <span className="font-md-bold color-brand-3">Prix Unitaire</span>
                                        </div>
                                        <div className="wishlist-status me-3">
                                            <span className="font-md-bold color-brand-3">Quantité</span>
                                        </div>
                                        <div className="wishlist-action me-3">
                                            <span className="font-md-bold color-brand-3">Sous-total</span>
                                        </div>
                                        <div className="wishlist-remove">
                                            <span className="font-md-bold color-brand-3">Supprimer</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Items du panier */}
                                <div className="content-wishlist mb-20">
                                    {items.length === 0 ? (
                                        <p className="text-center py-5">Votre panier est vide.</p>
                                    ) : (
                                        items.map((item) => (
                                            <div className="item-wishlist" key={item.id}>
                                                <div className="wishlist-cb">
                                                    <input type="checkbox" className="cb-layout cb-select" />
                                                </div>

                                                <div className="wishlist-product">
                                                    <div className="product-wishlist">
                                                        <div className="product-image">
                                                            <a href={`/shop/product-show/${item.slug}`}>
                                                                <img src={item.image?.thumb || '/images/default.png'} alt={item.name} style={{ width: "80px" }} />
                                                            </a>
                                                        </div>
                                                        <div className="product-info">
                                                            <a href={`/shop/product-show/${item.slug}`}>
                                                                <h6 className="color-brand-3">{item.name}</h6>
                                                            </a>
                                                       {/*     <div class="rating">
                                                                {item.reviews === 0 ? (
                                                                    <p className="text-center py-5">Pas de reviews</p>
                                                                ) : (

                                                                <img src="/images/template/icons/star.svg" alt="Ecom"/>
                                                                    )}
                                                                    <span class="font-xs color-gray-500"> ({item.reviews})</span>

                                                            </div>*/}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="wishlist-price">
                                                    <h6 className="color-brand-3">{item.price.toFixed(2)} FCFA</h6>
                                                </div>

                                                <div className="wishlist-status">
                                                    <div className="box-quantity">
                                                        <div className="input-quantity">
                                                            <input
                                                                type="text"
                                                                className="font-xl color-brand-3"
                                                                value={item.quantity}
                                                                readOnly
                                                            />
                                                            <span
                                                                className="minus-cart"
                                                                onClick={() => decreaseItem(item.id)}
                                                            ></span>
                                                            <span
                                                                className="plus-cart"
                                                                onClick={() => increaseItem(item.id)}
                                                            ></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="wishlist-action me-3">
                                                    <h6 className="color-brand-3">{(item.price * item.quantity).toFixed(2)} FCFA</h6>
                                                </div>

                                                <div className="wishlist-remove">
                                                    <button className="btn btn-delete" onClick={() => removeItem(item.id)} />
                                                </div>
                                            </div>
                                        ))
                                    )}

                                </div>

                                {/* Actions panier */}
                                <div className="row mb-40">
                                    <div className="col-lg-6">
                                        <Link className="btn btn-buy w-auto arrow-back mb-10" href="/shop">
                                            Continuer vos achats
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RÉSUMÉ DU PANIER */}
                        <div className="col-lg-3">
                            <div className="summary-cart border p-3">
                                <div className="mb-3 d-flex justify-content-between">
                                    <span>Sous-total</span>
                                    <strong>${subtotal.toFixed(2)}</strong>
                                </div>
                                <div className="mb-3 d-flex justify-content-between">
                                    <span>Livraison</span>
                                    <strong>Gratuite</strong>
                                </div>
                                <div className="mb-3 d-flex justify-content-between">
                                    <span>Total</span>
                                    <strong>${subtotal.toFixed(2)}</strong>
                                </div>
                                <Link className="btn btn-buy w-100" href="/shop/shop-checkout">
                                    Passer à la validation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
