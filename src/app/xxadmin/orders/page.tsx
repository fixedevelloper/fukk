'use client'
import { useEffect, useState } from "react";
import axiosServices from "../../../lib/axios";
import {Order, StoreAdminOrder} from "../../../types/FrontType";
import Pagination from "../components/Pagination";
import Link from "next/link";


export default function OrderVendorPage() {
    const [orders, setOrders] = useState<StoreAdminOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [limit, setLimit] = useState(20);
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    /** Fetch orders depuis l'API */
    const fetchOrders = async (page = 1) => {
        setLoading(true);
        try {
            const res = await axiosServices.get(`api/vendors/orders?page=${page}`, {
                params: { search, status: statusFilter, limit },
            });
            setOrders(res.data.data);
            setCurrentPage(res.data.meta.current_page)
            setLastPage(res.data.meta.last_page)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [search, statusFilter, limit]);

    /** Badge couleur selon le status */
    const getBadgeClass = (status: Order["status"]) => {
        switch (status) {
            case "pending":
                return "alert-warning";
            case "received":
                return "alert-success";
            case "canceled":
                return "alert-danger";
            default:
                return "alert-secondary";
        }
    };

    return (
        <section className="content-main">
            <div className="content-header d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="content-title card-title">Commandes</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div>
                    <input
                        className="form-control bg-white"
                        type="text"
                        placeholder="Search order ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="card mb-4">
                <header className="card-header">
                    <div className="row gx-3">
                        <div className="col-lg-4 col-md-6 me-auto">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Received">Received</option>
                                <option value="Canceled">Canceled</option>
                            </select>
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select
                                className="form-select"
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                            >
                                <option value={20}>Show 20</option>
                                <option value={30}>Show 30</option>
                                <option value={40}>Show 40</option>
                            </select>
                        </div>
                    </div>
                </header>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th className="text-end">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ) : orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>
                                            <b>{order.order.customer?.name}</b>
                                        </td>
                                        <td>{order.order.customer?.email}</td>
                                        <td>{order.total_amount?.toFixed(2)}</td>
                                        <td>
                        <span className={`badge rounded-pill ${getBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                                        </td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="text-end">
                                            <Link className="btn btn-md rounded font-sm me-2" href={`orders/detail/${order.id}`}>
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={(page) => fetchOrders(page)}
            />
        </section>
    );
}
