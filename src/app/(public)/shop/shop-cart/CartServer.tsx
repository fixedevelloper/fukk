// app/shop/CartServer.tsx
import React from "react";
import Link from "next/link";
import {CartItem} from "../../../../store/cartStore";

type CartServerProps = {
    items: CartItem[];
};

export default function CartServer({ items }: CartServerProps) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="section-box shop-template">
            <div className="container">
                <div className="row">

                    {/* PANIER PRINCIPAL */}
                    <div className="col-lg-9">
                        <div className="box-carts">
                            <div className="head-wishlist">
                                <div className="item-wishlist d-flex align-items-center">
                                    <div className="wishlist-cb me-2"/>
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

                            <div className="content-wishlist mb-20">
                                {items.length === 0 ? (
                                    <p className="text-center py-5">Votre panier est vide.</p>
                                ) : (
                                    items.map((item) => (
                                        <div className="item-wishlist d-flex align-items-center mb-3" key={item.id}>
                                            <div className="wishlist-product flex-grow-1">
                                                <div className="product-wishlist d-flex">
                                                    <div className="product-image me-3">
                                                        <a href={`/shop/product-show/${item.slug}`}>
                                                            <img src={item.image?.thumb} alt={item.name} style={{ width: "80px" }} />
                                                        </a>
                                                    </div>
                                                    <div className="product-info">
                                                        <a href={`/shop/product-show/${item.slug}`}>
                                                            <h6 className="color-brand-3">{item.name}</h6>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="wishlist-price me-3">
                                                <h6 className="color-brand-3">${item.price.toFixed(2)}</h6>
                                            </div>
                                            <div className="wishlist-status me-3">
                                                <span className="font-md color-brand-3">{item.quantity}</span>
                                            </div>
                                            <div className="wishlist-action me-3">
                                                <h6 className="color-brand-3">${(item.price * item.quantity).toFixed(2)}</h6>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

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
    );
}
