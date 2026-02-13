"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CartDropdown() {
    const { items, open, toggleOpen, setOpen, total, removeItem } = useCartStore();

    return (
        <div
            className="d-inline-block box-dropdown-cart position-relative"
            onClick={() => setOpen(!open)}
        >
    <span
        className="font-lg icon-list icon-cart cursor-pointer"
        onClick={toggleOpen} // clic pour mobile
    >
        <span>Panier</span>
        <span className="number-item font-xs">{items.length}</span>
    </span>

            {open && (
                <div className="dropdown-cart position-absolute shadow-md mt-2 bg-white p-3 rounded w-72 z-50 dropdown-open">
                    {items.length === 0 && (
                        <p className="text-center text-gray-500">Votre panier est vide</p>
                    )}

                    {items.map((item) => (
                        <div key={item.id} className="item-cart mb-20">
                            <div className="cart-image w-16 h-16 relative">
                                <Image
                                    src={item.image?.thumb|| '/images/default.png'}
                                    alt={item.name|| "Produit"}
                                    unoptimized
                                    width={80}
                                    height={57}
                                />
                            </div>
                            <div className="cart-info flex-1">
                                <Link
                                    href={'shop/product-show/' + item.slug}
                                    className="font-sm-bold color-brand-3 block"
                                >
                                    {item.name}
                                </Link>
                                <p>
                            <span className="color-brand-2 font-sm-bold">
                                {item.quantity} x {item.price.toFixed(2)} FCFA
                            </span>
                                </p>
                                {/* Décommenter si tu veux un bouton supprimer
                        <button
                            className="text-red-500 text-xs mt-1"
                            onClick={() => removeItem(item.id)}
                        >
                            Supprimer
                        </button>
                        */}
                            </div>
                        </div>
                    ))}

                    {items.length > 0 && (
                        <>
                            <div className="border-bottom pt-0 mb-15" />
                            <div className="cart-total">
                                <div className="row">
                                    <div className="col-6 text-start">
                                        <span className="font-md-bold color-brand-3">Total</span>
                                    </div>
                                    <div className="col-6">
                                        <span className="font-md-bold color-brand-1">{total().toFixed(2)} FCFA</span>
                                    </div>
                                </div>
                                <div className="row mt-15">
                                    <div className="col-6 text-start">
                                        <Link className="btn btn-cart w-auto" href="/shop/shop-cart">
                                            Voir le panier
                                        </Link>
                                    </div>
                                    <div className="col-6">
                                        <Link className="btn btn-buy w-auto" href="/shop/shop-checkout">
                                            Passer à la caisse
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>


    );
}
