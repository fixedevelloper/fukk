'use client';

import Link from "next/link";
import axiosServices from "../../../lib/axios";
import { useEffect, useState } from "react";
import {Attribute} from "../../../types/FrontType";

export default function AttributesPage() {
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchAttributes = async (pageNumber = 1) => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const res = await axiosServices.get("/api/attributes", {
                params: {
                    page: pageNumber,
                    per_page: 20,
                },
            });

            const newAttributes = res.data.data;
            const meta = res.data.meta;

            setAttributes(prev =>
                pageNumber === 1
                    ? newAttributes
                    : [...prev, ...newAttributes]
            );

            setHasMore(meta.current_page < meta.last_page);
            setPage(meta.current_page);
        } catch (error) {
            console.error("Erreur chargement attributs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttributes(1);
    }, []);

    return (
        <section className="content-main">
            {/* HEADER */}
            <div className="content-header">
                <div>
                    <h2 className="content-title card-title">
                        Attributs produits
                    </h2>
                    <p>Gestion des attributs e-commerce</p>
                </div>
                <div className="d-flex gap-2">
                <Link
                    href="/xxadmin/attribute-sets"
                    className="btn btn-success btn-sm rounded"
                >
                    attributSets
                </Link>
                <Link
                    href="/xxadmin/attributes/create"
                    className="btn btn-primary btn-sm rounded"
                >
                    + Nouvel attribut
                </Link>
                </div>
            </div>

            {/* TABLE */}
            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="table-light">
                        <tr>
                            <th>Attribute set</th>
                            <th>Attribut</th>
                            <th>Couleur</th>
                            <th>Statut</th>
                            <th className="text-end">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {attributes.map(attr => (
                            <tr key={attr.id}>
                                <td>{attr.attribute_set?.title ?? "-"}</td>

                                <td className="fw-semibold">
                                    {attr.title}
                                </td>

                                <td>
                                    {attr.color ? (
                                        <span
                                            className="d-inline-block rounded-circle border"
                                            style={{
                                                width: 18,
                                                height: 18,
                                                backgroundColor: attr.color,
                                            }}
                                        />
                                    ) : (
                                        <span className="text-muted">—</span>
                                    )}
                                </td>

                                <td>
                    <span className="badge bg-success">
                      {attr.status}
                    </span>
                                </td>

                                <td className="text-end">
                                    <Link
                                        href={`/admin/attributes/${attr.id}/edit`}
                                        className="btn btn-sm btn-outline-primary me-2"
                                    >
                                        ✏️
                                    </Link>

                                    <button className="btn btn-sm btn-outline-danger">
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {!loading && attributes.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center text-muted py-4"
                                >
                                    Aucun attribut trouvé
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* LOAD MORE */}
            {hasMore && (
                <div className="text-center mt-4">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => fetchAttributes(page + 1)}
                        disabled={loading}
                    >
                        {loading ? "Chargement..." : "Charger plus"}
                    </button>
                </div>
            )}
        </section>
    );
}

