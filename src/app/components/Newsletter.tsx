"use client";

import React, { useState } from "react";
import Image from "next/image"
export function Newaletter() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!email) {
            setError("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setMessage("Subscription successful 🎉");
            setEmail("");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Section services */}
            <section className="section-box mt-50 mb-50">
                <div className="container">
                    <ul className="list-col-5">
                        <li>
                            <div className="item-list">
                                <div className="icon-left">
                                    <Image width={40} height={40} src="/images/template/delivery.svg" alt="Ecom"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-100">Livraison gratuite</h5>
                                    <p className="font-sm color-gray-500">Pour toutes les commandes supérieures à 10 $</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left">
                                    <Image width={40} height={40} src="/images/template/support.svg" alt="Ecom"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-100">Support 24/7</h5>
                                    <p className="font-sm color-gray-500">Achetez avec un expert</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left">
                                    <Image width={40} height={40} src="/images/template/voucher.svg" alt="Ecom"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-100">Bon cadeau</h5>
                                    <p className="font-sm color-gray-500">Parrainez un ami</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left">
                                    <Image width={40} height={40} src="/images/template/return.svg" alt="Ecom"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-100">Retour & Remboursement</h5>
                                    <p className="font-sm color-gray-500">Retour gratuit pour les commandes 200 </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="item-list">
                                <div className="icon-left">
                                    <Image width={40} height={40} src="/images/template/secure.svg" alt="Ecom"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-100">Paiement sécurisé</h5>
                                    <p className="font-sm color-gray-500">100% protégé</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Section newsletter */}
            <section className="section-box box-newsletter">
                <div className="container">
                    <div className="row items-center">
                        <div className="col-lg-6 col-md-7 col-sm-12">
                            <h3 className="color-white">
                                Abonnez-vous & obtenez{" "}
                                <span className="color-warning">10%</span> de réduction
                            </h3>
                            <p className="font-lg color-white">
                                Recevez des mises à jour par e-mail sur notre boutique et{" "}
                                <span className="font-lg-bold">nos offres spéciales.</span>
                            </p>
                        </div>

                        <div className="col-lg-4 col-md-5 col-sm-12">
                            <div className="box-form-newsletter mt-15">
                                <form className="form-newsletter" onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        className="input-newsletter font-xs"
                                        placeholder="Votre adresse e-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />

                                    <button
                                        type="submit"
                                        className="btn btn-brand-2"
                                        disabled={loading}
                                    >
                                        {loading ? "Envoi..." : "S'abonner"}
                                    </button>
                                </form>

                                {error && (
                                    <p className="mt-10 font-xs color-danger">
                                        {error}
                                    </p>
                                )}

                                {message && (
                                    <p className="mt-10 font-xs color-success">
                                        {message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
