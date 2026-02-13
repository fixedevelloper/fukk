'use client'
import Image from "next/image";

import { useEffect, useState } from "react"
import axiosServices from "../../lib/axios";
import Link from "next/link";
import {VendorDashbord} from "../../types/FrontType";


export default function Dashboard() {
  const [data, setData] = useState<VendorDashbord | null>(null);


  useEffect(() => {
    axiosServices.get("api/vendors/dashboard")
        .then(res => setData(res.data))
  }, [])

  if (!data) return <p className="text-center">Loading...</p>

  const { stats, latest_orders } = data

  return (
      <section className="content-main">
        <div className="content-header">
          <div>
            <h2 className="content-title card-title">Vendor Dashboard</h2>
            <p>Overview of your store activity</p>
          </div>
        </div>

        {/* STATS */}
        <div className="row">
          {[
            { title: "Revenue", value: stats.revenue, icon: "md-monetization_on", color: "primary",symbole:'FCFA' },
            { title: "Orders", value: stats.orders, icon: "md-local_shipping", color: "success" ,symbole:''},
            { title: "Products", value: stats.products, icon: "md-qr_code", color: "warning" ,symbole:''},
            { title: "Monthly earning", value: stats.monthly_earning, icon: "md-shopping_basket", color: "info" ,symbole:'FCFA'},
          ].map((item, i) => (
              <div className="col-lg-3 col-md-6" key={i}>
                <div className="card card-body mb-4">
                  <article className="icontext">
                                <span className={`icon icon-sm rounded-circle bg-${item.color}-light`}>
                                    <i className={`text-${item.color} material-icons ${item.icon}`} />
                                </span>
                    <div className="text">
                      <h6 className="mb-1">{item.title}</h6>
                      <span>{item.value.toLocaleString()} {item.symbole}</span>
                    </div>
                  </article>
                </div>
              </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="card mb-4">
          <header className="card-header">
            <h4 className="card-title">Latest orders</h4>
          </header>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {latest_orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order?.customer}</td>
                      <td>{order.date}</td>
                      <td>{order.total.toLocaleString()} F</td>
                      <td>
                                        <span className={`badge bg-${order.status === 'confirmed' ? 'success' : 'warning'}`}>
                                            {order.status}
                                        </span>
                      </td>
                      <td>
                                        <span className={`badge bg-${order.payment_status === 'paid' ? 'success' : 'secondary'}`}>
                                            {order.payment_status}
                                        </span>
                      </td>
                      <td>
                        <Link
                            href={`/xxadmin/orders/detail/${order.id}`}
                            className="btn btn-sm btn-light"
                         >
                          View
                        </Link>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
  )
}


