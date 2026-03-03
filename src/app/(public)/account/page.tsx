"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {Order, ResponsePaginate, Tab} from "../../../types/FrontType";
import Image from "next/image"


export default function AccountPage() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState<"commandes" | "parametres">("commandes");
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // 🔄 Charger les commandes
    useEffect(() => {
        if (!session?.user.token) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/my-orders`, {
            headers: {
                Authorization: `Bearer ${session.user.token}`,
            },
        })
            .then((res: Response) => res.json())
            .then((data: ResponsePaginate<Order>) => {
                setOrders(data.data);
                setLoadingOrders(false);
            })
            .catch(() => setLoadingOrders(false));
    }, [session]);

    if (status === "loading") {
        return <p className="text-center mt-50">Chargement...</p>;
    }

    if (!session) {
        return (
            <div className="container mt-50 text-center">
                <h4>Vous devez être connecté pour accéder à cette page</h4>
            </div>
        );
    }

    return (
        <section className="section-box shop-template mt-30">
            <div className="container box-account-template">
                <h3>Bonjour {session.user?.name}</h3>

                <p className="font-md color-gray-500 mb-40">
                    Depuis votre espace personnel, vous pouvez consulter vos commandes récentes, gérer vos adresses et modifier votre mot de passe.
                </p>

                {/* TABS */}
                <div className="box-tabs mb-100">
                    <ul className="nav nav-tabs nav-tabs-account">
                        <li>
                            <button
                                className={`nav-link ${activeTab === "commandes" ? "active" : ""}`}
                                onClick={() => setActiveTab("commandes")}
                            >
                                Commandes
                            </button>
                        </li>
                        <li>
                            <button
                                className={`nav-link ${activeTab === "parametres" ? "active" : ""}`}
                                onClick={() => setActiveTab("parametres")}
                            >
                                Paramètres
                            </button>
                        </li>
                    </ul>

                    <div className="border-bottom mt-20 mb-40" />

                    {/* TAB CONTENT */}
                    <div className="tab-content mt-30">

                        {/* COMMANDES */}
                        {activeTab === "commandes" && (
                            <div className="box-orders">
                                <div className="head-orders mb-20">
                                    <h5>Vos commandes</h5>
                                </div>

                                {loadingOrders ? (
                                    <p className="font-sm color-gray-500">Chargement des commandes...</p>
                                ) : orders.length === 0 ? (
                                    <p className="font-sm color-gray-500">
                                        Aucune commande trouvée.
                                    </p>
                                ) : (
                                    orders.map(order => (
                                        <div key={order.id} className="box-orders mb-30 p-20 shadow-sm border rounded mr-10 ml-10">

                                            {/* HEADER */}
                                            <div className="head-orders d-flex justify-content-between mb-15">
                                                <div>
                                                    <h5 className="mb-5">Commande #{order.id}</h5>
                                                    <span className="font-md color-brand-3 mr-15">
                            Date : {new Date(order.created_at).toLocaleDateString("fr-FR")}
                          </span>
                                                    <span className={`label-delivery ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                                                </div>
                                                <div>
                                                    <button className="btn btn-buy font-sm-bold w-auto">
                                                        Voir la commande
                                                    </button>
                                                </div>
                                            </div>

                                            {/* BODY */}
                                            <div className="body-orders">
                                                <div className="list-orders">
                                                    {order.store_orders.map(storeOrder =>
                                                        storeOrder.products.map(item => (
                                                            <div key={item.id} className="item-orders d-flex align-items-center p-10 border-bottom">

                                                                {/* IMAGE */}
                                                                <div className="image-orders mr-15">
                                                                    <Image
                                                                        alt={item.product?.name || "Produit"}
                                                                        width={50}
                                                                        height={50}
                                                                        src={item.product?.image?.thumb ?? "/assets/imgs/page/account/img-1.png"}
                                                                        unoptimized
                                                                    />
                                                                </div>

                                                                {/* INFO */}
                                                                <div className="info-orders flex-grow-1">
                                                                    <h5 className="mb-5">{item.product?.name}</h5>
                                                                    <p className="font-xs color-gray-500 mb-0">
                                                                        Boutique : {storeOrder.store.name}
                                                                    </p>
                                                                </div>

                                                                {/* QUANTITY */}
                                                                <div className="quantity-orders mr-20">
                                                                    <h5>Qté : {item?.qty}</h5>
                                                                </div>

                                                                {/* PRICE */}
                                                                <div className="price-orders">
                                                                    <h5>{(item.price * item.qty).toLocaleString()} FCFA</h5>
                                                                </div>

                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* PARAMÈTRES */}
                        {activeTab === "parametres" && (
                            <div className="row">
                                <div className="col-lg-6">
                                    <h5 className="font-md-bold mb-20">
                                        Informations du compte
                                    </h5>

                                    <div className="form-group mb-15">
                                        <label>Nom</label>
                                        <input className="form-control font-sm" value={session.user?.name || ""} disabled />
                                    </div>

                                    <div className="form-group mb-15">
                                        <label>Email</label>
                                        <input className="form-control font-sm" value={session.user?.email || ""} disabled />
                                    </div>

                                    <div className="form-group mb-15">
                                        <label>Téléphone</label>
                                        <input className="form-control font-sm" value={session.user?.phone || ""} disabled />
                                    </div>

                                    <button className="btn btn-buy w-auto" disabled>
                                        Modifier le profil (bientôt)
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}
