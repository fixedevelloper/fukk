"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axiosServices from "../../../../../../lib/axios";
import {ShippingMethod} from "../../../../../../types/FrontType";
import Pagination from "../../../../components/Pagination";
import {useParams} from "next/navigation";

export default function ShippingMethodPage() {
    const { id } = useParams(); // city id
    const [methods, setMethods] = useState<ShippingMethod[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchMethods = (page = 1) => {
        setLoading(true);
        axiosServices
            .get(`/api/shipping-methods/byCity/${id}?per_page=10&page=${page}`)
            .then((res) => {
                setMethods(res.data.data);
                setCurrentPage(res.data.meta.current_page);
                setLastPage(res.data.meta.last_page);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchMethods();
    }, []);

    const handleDelete = (id: number) => {
        if (!confirm("Voulez-vous vraiment supprimer ce mode de livraison ?")) return;
        axiosServices.delete(`/api/shipping-methods/${id}`).then(() => fetchMethods(currentPage));
    };

    return (
        <section className="content-main">
            <div className="content-header d-flex justify-content-between align-items-center mb-4">
                <h2 className="content-title card-title">Modes de livraison</h2>
                <Link href={`/xxadmin/cities/${id}/shipping-methods/create`} className="btn btn-primary">
                    <i className="material-icons md-post_add" /> Nouveau mode
                </Link>
            </div>

            {loading ? (
                <div>Chargement...</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Titre</th>
                            <th>Prix de base</th>
                            <th>Type</th>
                            <th>Ville</th>
                            <th>Gratuit ?</th>
                            <th>Actif ?</th>
                            <th className="text-end">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {methods.map((method) => (
                            <tr key={method.id}>
                                <td>{method.id}</td>
                                <td>{method.name}</td>
                                <td>{method.title}</td>
                                <td>{method.base_price} FCFA</td>
                                <td>{method.type}</td>
                                <td>{method.city_id ?? "Défaut"}</td>
                                <td>{method.is_free ? "Oui" : "Non"}</td>
                                <td>{method.active ? "Oui" : "Non"}</td>
                                <td className="text-end">
                                    <Link
                                        href={`/xxadmin/cities/${id}/shipping-methods/${method.id}/edit`}
                                        className="btn btn-sm btn-outline-primary me-2"
                                    >
                                        Éditer
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(method.id)}
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        onPageChange={(page) => fetchMethods(page)}
                    />
                </div>
            )}
        </section>
    );
}
