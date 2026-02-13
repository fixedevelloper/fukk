"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {Order, ResponsePaginate, Tab} from "../../../types/FrontType";
import Image from "next/image"
export default function AccountPage() {
    const { data: session, status } = useSession();
    const [activeTab, setActiveTab] = useState<"orders" | "settings">("orders");
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
            .then((res:Response) => res.json())
            .then((data: ResponsePaginate<Order>) => {
                setOrders(data.data)
                setLoadingOrders(false);
            })
            .catch(() => setLoadingOrders(false));

    }, [session]);

    console.log(orders)
    if (status === "loading") {
        return <p className="text-center mt-50">Loading...</p>;
    }

    if (!session) {
        return (
            <div className="container mt-50 text-center">
                <h4>You must be logged in to access this page</h4>
            </div>
        );
    }

    return (
        <section className="section-box shop-template mt-30">
            <div className="container box-account-template">
                <h3>Hello {session.user?.name}</h3>

                <p className="font-md color-gray-500">
                    From your account dashboard, you can easily check & view your recent orders,
                    manage your shipping and billing addresses and edit your password.
                </p>

                {/* TABS */}
                <div className="box-tabs mb-100">
                    <ul className="nav nav-tabs nav-tabs-account">
                        <li>
                            <button
                                className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
                                onClick={() => setActiveTab("orders")}
                            >
                                Orders
                            </button>
                        </li>
                        <li>
                            <button
                                className={`nav-link ${activeTab === "settings" ? "active" : ""}`}
                                onClick={() => setActiveTab("settings")}
                            >
                                Settings
                            </button>
                        </li>
                    </ul>

                    <div className="border-bottom mt-20 mb-40"/>

                    {/* TAB CONTENT */}
                    <div className="tab-content mt-30">

                        {/* ORDERS */}
                        {activeTab === "orders" && (
                            <div className="box-orders">
                                <div className="head-orders mb-20">
                                    <h5>Your orders</h5>
                                </div>

                                {loadingOrders ? (
                                    <p className="font-sm color-gray-500">Loading orders...</p>
                                ) : orders.length === 0 ? (
                                    <p className="font-sm color-gray-500">
                                        No orders found.
                                    </p>
                                ) : (
                                    orders.map(order => (
                                            <div key={order.id} className="box-orders mb-30">

                                                {/* HEADER */}
                                                <div className="head-orders">
                                                    <div className="head-left">
                                                        <h5 className="mr-20">
                                                            Order ID: #{order.id}
                                                        </h5>

                                                        <span className="font-md color-brand-3 mr-20">
                    Date: {new Date(order.created_at).toLocaleDateString()}
                </span>

                                                        <span className="label-delivery">
                    {order.status}
                </span>
                                                    </div>

                                                    <div className="head-right">
                                                        <button className="btn btn-buy font-sm-bold w-auto">
                                                            View Order
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* BODY */}
                                                <div className="body-orders">
                                                    <div className="list-orders">

                                                        {order.store_orders.map(storeOrder =>
                                                            storeOrder.products.map(item => (
                                                                <div key={item.id} className="item-orders">

                                                                    {/* IMAGE */}
                                                                    <div className="image-orders">
                                                                        <Image
                                                                            alt={item.product?.name || "Produit"}
                                                                            width={50}
                                                                            height={50}
                                                                            src={
                                                                                item.product?.image?.thumb ??
                                                                                "/assets/imgs/page/account/img-1.png"
                                                                            }
                                                                            unoptimized

                                                                        />
                                                                    </div>

                                                                    {/* INFO */}
                                                                    <div className="info-orders">
                                                                        <h5>{item.product?.name}</h5>
                                                                        <p className="font-xs color-gray-500">
                                                                            Boutique : {storeOrder.store.name}
                                                                        </p>
                                                                    </div>

                                                                    {/* QUANTITY */}
                                                                    <div className="quantity-orders">
                                                                        <h5>Quantity: {item?.qty}</h5>
                                                                    </div>

                                                                    {/* PRICE */}
                                                                    <div className="price-orders">
                                                                        <h5>
                                                                            {(item.price * item.qty).toLocaleString()} FCFA
                                                                        </h5>
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

                        {/* SETTINGS */}
                        {activeTab === "settings" && (
                            <div className="row">
                                <div className="col-lg-6">
                                    <h5 className="font-md-bold mb-20">
                                        Account information
                                    </h5>

                                    <div className="form-group mb-15">
                                        <input
                                            className="form-control font-sm"
                                            value={session.user?.name || ""}
                                        />
                                    </div>

                                    <div className="form-group mb-15">
                                        <input
                                            className="form-control font-sm"
                                            value={session.user?.email || ""}
                                        />
                                    </div>
                                    <div className="form-group mb-15">
                                        <input
                                            className="form-control font-sm"
                                            value={session.user?.phone || ""}
                                        />
                                    </div>
                                    <button className="btn btn-buy w-auto" disabled>
                                        Edit profile (soon)
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
