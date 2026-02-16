"use client";

import React, { useState } from "react";
import Image from "next/image"
import axiosServices from "../../lib/axios";
export function Newsletter() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");
        setError("");

        // Validation email
        if (!email) {
            setError("Veuillez entrer votre adresse e-mail");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Adresse e-mail invalide");
            return;
        }

        try {
            setLoading(true);

            const response = await axiosServices.post("/api/newsletter", {
                email: email,
            });

            setMessage("Inscription réussie 🎉");
            setEmail("");

        } catch (error: any) {

            if (error.response) {
                // Erreur venant du backend
                setError(
                    error.response.data?.message ||
                    "Une erreur est survenue"
                );
            } else if (error.request) {
                // Pas de réponse serveur
                setError("Serveur inaccessible. Veuillez réessayer.");
            } else {
                setError("Impossible de s’abonner pour le moment");
            }

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
                                    <Image width={40} height={40} src="/images/template/delivery.svg" alt="FinduKarko"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-100">Livraison gratuite</h5>
                                    <p className="font-sm color-gray-500">
                                        Pour toute commande supérieure à 100 000 FCFA
                                    </p>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="item-list pb-25">
                                <div className="icon-left">
                                    <Image width={40} height={40} src="/images/template/support.svg" alt="FinduKarko"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-100">Support 24/7</h5>
                                    <p className="font-sm color-gray-500">
                                        Assistance disponible à tout moment
                                    </p>
                                    <br/>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="item-list pb-45">
                                <div className="icon-left">
                                    <Image width={40} height={40} src="/images/template/voucher.svg" alt="FinduKarko"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-100">Bon cadeau</h5>
                                    <p className="font-sm color-gray-500">
                                        Offrez à vos proches
                                    </p>
                                    <br/>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="item-list">
                                <div className="icon-left">
                                    <Image width={40} height={40} src="/images/template/return.svg" alt="FinduKarko"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-100">
                                        Retour & Remboursement
                                    </h5>
                                    <p className="font-sm color-gray-500">
                                        Retours gratuits sous conditions
                                    </p>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="item-list">
                                <div className="icon-left">
                                    <Image width={40} height={40} src="/images/template/secure.svg" alt="FinduKarko"/>
                                </div>
                                <div className="info-right">
                                    <h5 className="font-lg-bold color-gray-100">
                                        Paiement sécurisé
                                    </h5>
                                    <p className="font-sm color-gray-500">
                                        Transactions 100% protégées
                                    </p>
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
                                Recevez nos nouveautés et{" "}
                                <span className="font-lg-bold">
                                    offres exclusives
                                </span>{" "}
                                directement par e-mail.
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

