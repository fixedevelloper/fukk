"use client";

import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore();
    const { data: session, status } = useSession();

    const isAuthenticated = status === "authenticated";

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        note: "",
    });
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const placeOrder = async () => {
        if (!isAuthenticated || items.length === 0) return;

        setLoading(true);
        console.log(session)
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders/place-order`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session?.user?.token}`,
                    },
                    body: JSON.stringify({
                        items: items.map(item => ({
                            product_id: item.id,
                            store_id: item.store?.id, // ← ajouter ici
                            quantity: item.quantity,
                            price: item.price,
                            //options: item.options || null,
                        })),
                        address: form,
                    }),

                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erreur lors de la commande');
            }

            const data = await response.json();

            clearCart();
            alert("✅ Order placed successfully");
        } catch (error: any) {
            alert(error.response?.data?.message || "Order failed");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") {
        return <p className="text-center mt-50">Loading session...</p>;
    }

    return (
        <>
            {/* Fil d’Ariane */}
            <div className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link href="/">Accueil</Link></li>
                            <li><Link href="/shop">Boutique</Link></li>
                            <li>Validation</li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="section-box shop-template">
                <div className="container">
                    <div className="row">

                        {/* GAUCHE - FORMULAIRE */}
                        <div className="col-lg-6">
                            <div className="box-border">

                                {!isAuthenticated && (
                                    <>
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-6 mb-20 text-sm-start text-center">
                                                <h5 className="font-md-bold color-brand-3 mb-3">Informations de contact</h5>
                                            </div>
                                            <div className="col-lg-6 col-sm-6 mb-20 text-sm-end text-center">
                                                <span className="font-sm color-brand-3">Vous avez déjà un compte ?</span>
                                                <Link className="font-sm color-brand-1" href="/auth/login">Connexion</Link>
                                            </div>
                                        </div>

                                        <div className="form-group mb-2">
                                            <label className="font-sm color-brand-3">
                                                <input type="checkbox" /> Restez informé des actualités et offres exclusives
                                            </label>
                                        </div>
                                    </>
                                )}

                                <h5 className="font-md-bold color-brand-3 mt-15 mb-3">Adresse de livraison</h5>
                                <div className="row">
                                    <div className="col-md-12 mb-2">
                                        <input
                                            name="name"
                                            className="form-control"
                                            placeholder="Prénom"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-2">
                                        <input
                                            name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <input
                                            name="phone"
                                            className="form-control"
                                            placeholder="Téléphone"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <input
                                            name="address"
                                            className="form-control"
                                            placeholder="Adresse"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-lg-6 mb-2">
                                        <select className="form-control font-sm select-style1 color-gray-700" onChange={handleChange}>
                                            <option value="">Sélectionner une ville</option>
                                            <option value="1">Option 1</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <input
                                            name="city"
                                            className="form-control"
                                            placeholder="Ville"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-2">
                <textarea
                    name="note"
                    className="form-control"
                    placeholder="Note additionnelle"
                    rows={4}
                    onChange={handleChange}
                />
                                    </div>
                                </div>

                                <div className="row mt-20">
                                    <div className="col-lg-6 col-5 mb-20">
                                        <Link className="btn font-sm-bold color-brand-1 arrow-back-1" href="shop-cart">Retour au panier</Link>
                                    </div>
                                    <div className="col-lg-6 col-7 mb-20 text-end">
                                        <button
                                            onClick={placeOrder}
                                            disabled={!isAuthenticated || loading}
                                            className={`btn btn-buy w-auto arrow-next ${
                                                !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        >
                                            {loading ? "Traitement..." : "Passer la commande"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DROITE - RÉCAPITULATIF */}
                        <div className="col-lg-6">
                            <div className="box-border">
                                <h5 className="font-md-bold mb-20">Votre commande</h5>

                                <div className="listCheckout">
                                    {items.map((item) => (
                                        <div className="item-wishlist d-flex justify-content-between align-items-center mb-2" key={item.id}>
                                            <div className="d-flex align-items-center">
                                                <div className="product-image me-2">
                                                    <a href={`/shop/product-show/${item.slug}`}><img src={item.image?.thumb|| '/images/default.png'} alt={item.name} style={{ width: '60px' }} /></a>
                                                </div>
                                                <div className="product-info">
                                                    <a href={`/shop/product-show/${item.slug}`}><h6 className="color-brand-3">{item.name}</h6></a>
                                                </div>
                                            </div>
                                            <div className="wishlist-status me-3">x{item.quantity}</div>
                                            <div className="wishlist-price">
                                                <h6 className="color-brand-3 font-lg-bold">{(item.price * item.quantity).toFixed(2)}</h6>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="form-group d-flex mt-3">
                                    <input className="form-control me-2" placeholder="Entrer votre code promo" />
                                    <button className="btn btn-buy w-auto">Appliquer</button>
                                </div>

                                <div className="form-group mb-0 mt-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="font-md-bold color-brand-3">Sous-total</span>
                                        <span className="font-lg-bold color-brand-3">{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="border-bottom mb-1 pb-1 d-flex justify-content-between">
                                        <span className="font-md-bold color-brand-3">Livraison</span>
                                        <span className="font-lg-bold color-brand-3">Gratuite</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-1">
                                        <span className="font-md-bold color-brand-3">Total</span>
                                        <span className="font-lg-bold color-brand-3">{subtotal.toFixed(2)}</span>
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
