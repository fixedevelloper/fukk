"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCheckoutStore } from "../../../../store/useCheckoutStore";
import {useCartStore} from "../../../../store/cartStore";
import {CheckoutAccordion} from "./CheckoutAccordion";

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore();
    const { selectedShipping, clearCheckout } = useCheckoutStore();

    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated";

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zone_id: "",
        note: "",
        shipping_method: "",
        shipping_price: 0,
        payment_method: "cod",
        mobile_number: ''
    });

    // Calculs de prix
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shippingPrice = form.shipping_price || 0;
    const total = subtotal + shippingPrice;

    // Placer la commande
    const placeOrder = async () => {
        if (!isAuthenticated || items.length === 0) return;

        setLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders/place-order`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session?.user?.token}`,
                    },
                    body: JSON.stringify({
                        items: items.map((item) => ({
                            product_id: item.id,
                            store_id: item.store?.id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                        shipping_method_id: form.shipping_method,
                        shipping_price: shippingPrice,
                        total: total,
                        address: {
                            name: form.name,
                            email: form.email,
                            phone: form.phone,
                            address: form.address,
                            city: form.city,
                            zone_id: form.zone_id,
                            note: form.note,
                        },
                        payment_method: form.payment_method,
                        mobile_number:form.mobile_number
                    }),
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Erreur lors de la commande");
            }

            clearCart();
            clearCheckout();
            alert("✅ Commande passée avec succès !");
        } catch (error: any) {
            alert(error.message || "Impossible de passer la commande");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") {
        return <p className="text-center mt-50">Chargement de la session...</p>;
    }

    return (
        <>
            {/* Fil d’Ariane */}
            <div className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li>
                                <Link href="/">Accueil</Link>
                            </li>
                            <li>
                                <Link href="/shop">Boutique</Link>
                            </li>
                            <li>Validation</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Section principale */}
            <section className="section-box shop-template">
                <div className="container">
                    <div className="row">
                        {/* Formulaire gauche */}
                        <CheckoutAccordion
                            isAuthenticated={isAuthenticated}
                            form={form}
                            setForm={setForm}
                            placeOrder={placeOrder}
                            loading={loading}
                        />

                        {/* Récapitulatif droite */}
                        <div className="col-lg-6">
                            <div className="box-border">
                                <h5 className="font-md-bold mb-20">Votre commande</h5>

                                <div className="listCheckout">
                                    {items.map((item) => (
                                        <div
                                            className="item-wishlist d-flex justify-content-between align-items-center mb-2"
                                            key={item.id}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="product-image me-2">
                                                    <a href={`/shop/product-show/${item.slug}`}>
                                                        <img
                                                            src={item.image?.thumb || "/images/default.png"}
                                                            alt={item.name}
                                                            style={{ width: "60px" }}
                                                        />
                                                    </a>
                                                </div>
                                                <div className="product-info">
                                                    <a href={`/shop/product-show/${item.slug}`}>
                                                        <h6 className="color-brand-3">{item.name}</h6>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="wishlist-status me-3">x{item.quantity}</div>
                                            <div className="wishlist-price">
                                                <h6 className="color-brand-3 font-lg-bold">
                                                    {(item.price * item.quantity).toFixed(2)}
                                                </h6>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Codes promo */}
                                <div className="form-group d-flex mt-3">
                                    <input
                                        className="form-control me-2"
                                        placeholder="Entrer votre code promo"
                                    />
                                    <button className="btn btn-buy w-auto">Appliquer</button>
                                </div>

                                {/* Totaux */}
                                <div className="form-group mb-0 mt-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="font-md-bold color-brand-3">Sous-total</span>
                                        <span className="font-lg-bold color-brand-3">
                      {subtotal.toFixed(2)} FCFA
                    </span>
                                    </div>
                                    <div className="border-bottom mb-1 pb-1 d-flex justify-content-between">
                                        <span className="font-md-bold color-brand-3">Livraison</span>
                                        <span className="font-lg-bold color-brand-3">
                      {shippingPrice === 0
                          ? "Gratuit"
                          : `${shippingPrice} FCFA`}
                    </span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-1">
                                        <span className="font-md-bold color-brand-3">Total</span>
                                        <span className="font-lg-bold color-brand-3">
                      {total.toFixed(2)} FCFA
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
