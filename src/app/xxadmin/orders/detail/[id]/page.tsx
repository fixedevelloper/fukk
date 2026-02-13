'use client'
import { useEffect, useState } from "react"
import {useParams} from "next/navigation";
import axiosServices from "../../../../../lib/axios";
import {StoreAdminOrder} from "../../../../../types/FrontType";
import Link from "next/link";



export default function OrderDetail() {
    const { id } = useParams()
    const [order, setOrder] = useState<StoreAdminOrder| null>(null)
    const [status, setStatus] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        axiosServices.get(`api/vendors/orders/${id}`)
            .then(res => {
                setOrder(res.data.data)
                setStatus(res.data.data.status)
            })
    }, [id])


    if (!order) return <p className="text-center">Loading...</p>

    const subtotal = order.products.reduce(
        (sum, p) => sum + p.price * p.qty,
        0
    )
    const updateStatus = async () => {
        setSaving(true)
        try {
            const res = await axiosServices.put(
                `api/vendors/orders/${order.id}/status`,
                { status }
            )
            setOrder(res.data.data)
        } finally {
            setSaving(false)
        }
    }

    return (
        <section className="content-main">
            <div className="content-header">
                <div>
                    <h2 className="content-title card-title">Order detail</h2>
                    <p>Details de la commande ID: {order.id}</p>
                </div>
            </div>

            <div className="card">
                <header className="card-header">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-2">
                            <i className="material-icons md-calendar_today me-1"/>
                            <b>{order.created_at}</b>
                            <br/>
                            <small className="text-muted">Commande ID: {order.id}</small>
                        </div>


                        <div className="col-lg-6 col-md-6 ms-auto text-md-end">
                                              <span className={`badge bg-${{
                                                  pending: "secondary",
                                                  confirmed: "info",
                                                  shipped: "primary",
                                                  delivered: "success",
                                                  cancelled: "danger"
                                              }[order.status]}`}>
    {order.status}
</span>
                            <a className="btn btn-secondary print ms-2" href="#"><i className="icon material-icons md-print"></i></a>
                        </div>
                    </div>
                </header>

                <div className="card-body">
                    {/* INFO */}
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <h6>Customer</h6>
                            <p>
                                {order.order?.customer?.name}<br/>
                                {order.order?.customer?.email}
                            </p>
                        </div>

                        <div className="col-md-4">
                            <h6>Status</h6>
                            <p>{order.status}</p>
                        </div>

                        <div className="col-md-4">
                            <h6>Delivery</h6>
                            <p>
                                {order.order?.address?.city}<br/>
                                {order.order?.address?.address}
                            </p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-7'>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th className="text-end">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {order.products.map(p => (
                                        <tr key={p.id}>
                                            <td>
                                                <Link href='#' className='itemside'>
                                                    <div className="left">
                                                        <img className="img-xs" src={p.product?.image?.thumb} alt="Item" width="40" height="40"/>
                                                    </div>
                                                    <div className="info"> {p.product?.name}</div>
                                                </Link>

                                                </td>
                                            <td>{p.price.toLocaleString()} F</td>
                                            <td>{p.qty}</td>
                                            <td className="text-end">
                                                {(p.price * p.qty).toLocaleString()} F
                                            </td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td colSpan={4}>
                                            <article className="float-end">
                                                <dl className="dlist">
                                                    <dt>Subtotal:</dt>
                                                    <dd>{subtotal.toLocaleString()} F</dd>
                                                </dl>
                                                <dl className="dlist">
                                                    <dt>Shipping cost:</dt>
                                                    <dd>00.00</dd>
                                                </dl>
                                                <dl className="dlist">
                                                    <dt>Total boutique:</dt>
                                                    <dd><b>{order.total_amount.toLocaleString()} F</b></dd>
                                                </dl>
                                                <dl className="dlist">
                                                    <dt className="text-muted">Payment Status:</dt>
                                                    <dd><span className="badge rounded-pill alert-success text-success">{order.payment_status}</span></dd>
                                                </dl>
                                            </article>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-lg-1'>

                        </div>
                        <div className="col-lg-4">
                            <div className="col-md-6 text-md-end d-flex justify-content-end gap-2 mb-4">
                                <select
                                    className="form-select mw-200"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>

                                <button
                                    className="btn btn-primary"
                                    onClick={updateStatus}
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>

                            <div className="box shadow-sm bg-light">
                                <h6 className="mb-15">Payment info</h6>
                                <p><img className="border" src="assets/imgs/card-brands/2.png" height="20"/> Master Card **** **** 476 8 <br/>
                                Business name: Grand Market LLC<br/>                                    Phone: +1 (800) 555-154-52</p>
                            </div>
                            <div className="h-25 pt-4">
                                <div className="mb-3">
                                    <label>Notes</label>
                                    <textarea className="form-control" id="notes" name="notes" placeholder="Type some note"/>
                                </div>
                                <button className="btn btn-primary">Save note</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
