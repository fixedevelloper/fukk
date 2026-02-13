'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosServices from "../../../lib/axios";
import { AttributeSet } from "../../../types/FrontType";

export default function AttributeSetsPage() {
    const [attributeSets, setAttributeSets] = useState<AttributeSet[]>([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState<any>(null);

    const fetchAttributeSets = async (pageNumber = 1) => {
        setLoading(true);

        try {
            const res = await axiosServices.get("/api/attribute-sets", {
                params: {
                    page: pageNumber,
                    per_page: 20,
                },
            });

            setAttributeSets(res.data.data);
            setMeta(res.data.meta);
        } catch (error) {
            console.error("Erreur chargement attribute sets", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Voulez-vous vraiment supprimer cet attribute set ?")) return;

        try {
            await axiosServices.delete(`/api/attribute-sets/${id}`);
            setAttributeSets(prev => prev.filter(set => set.id !== id));
        } catch (error) {
            console.error("Erreur suppression", error);
        }
    };

    useEffect(() => {
        fetchAttributeSets(1);
    }, []);

    return (
        <section className="content-main">
            {/* HEADER */}
            <div className="content-header d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="content-title card-title">Attribute Sets</h2>
                    <p>Groupes d’attributs produits</p>
                </div>

                <Link
                    href="/xxadmin/attribute-sets/create"
                    className="btn btn-primary btn-sm"
                >
                    + Nouvel attribute set
                </Link>
            </div>

            {/* TABLE */}
            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="table-light">
                        <tr>
                            <th>Nom</th>
                            <th>Type affichage</th>
                            <th>Recherchable</th>
                            <th>Comparable</th>
                            <th>Liste</th>
                            <th>Statut</th>
                            <th className="text-end">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                    Chargement...
                                </td>
                            </tr>
                        )}

                        {!loading && attributeSets.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center text-muted py-4">
                                    Aucun attribute set trouvé
                                </td>
                            </tr>
                        )}

                        {!loading && attributeSets.map(set => (
                            <tr key={set.id}>
                                <td className="fw-semibold">{set.title}</td>

                                <td>
                                    {set.display_layout === "swatch_dropdown"
                                        ? "Swatch + Dropdown"
                                        : set.display_layout}
                                </td>

                                <td>
                                    {set.is_searchable
                                        ? <span className="badge bg-success">✔</span>
                                        : <span className="badge bg-secondary">✖</span>}
                                </td>

                                <td>
                                    {set.is_comparable
                                        ? <span className="badge bg-success">✔</span>
                                        : <span className="badge bg-secondary">✖</span>}
                                </td>

                                <td>
                                    {set.is_use_in_product_listing
                                        ? <span className="badge bg-success">✔</span>
                                        : <span className="badge bg-secondary">✖</span>}
                                </td>

                                <td>
                    <span className={`badge ${set.status === 'published' ? 'bg-success' : 'bg-secondary'}`}>
                      {set.status}
                    </span>
                                </td>

                                <td className="text-end">
                                    <Link
                                        href={`/xxadmin/attribute-sets/${set.id}/edit`}
                                        className="btn btn-sm btn-outline-primary me-2"
                                    >
                                        ✏️
                                    </Link>

                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(set.id)}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {meta && meta.last_page > 1 && (
                    <div className="card-footer d-flex justify-content-between">
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled={!meta.prev_page_url}
                            onClick={() => fetchAttributeSets(meta.current_page - 1)}
                        >
                            Précédent
                        </button>

                        <span>
              Page {meta.current_page} / {meta.last_page}
            </span>

                        <button
                            className="btn btn-sm btn-outline-secondary"
                            disabled={!meta.next_page_url}
                            onClick={() => fetchAttributeSets(meta.current_page + 1)}
                        >
                            Suivant
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
