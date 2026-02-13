'use client'

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {Store} from "../../../../types/FrontType";
import axiosServices from "../../../../lib/axios";

export default function StoreViewPage() {
    const router = useRouter();
    const { id } = useParams(); // récupération du paramètre /stores/[id]
    const [store, setStore] = useState<Store | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStore = async () => {
        setLoading(true);
        try {
            const res = await axiosServices.get(`/api/stores/${id}`);
            setStore(res.data.data);
        } catch (err) {
            console.error(err);
            setError("Erreur lors du chargement du store");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchStore();
    }, [id]);

    if (loading) return <p>Chargement du store...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!store) return <p>Store non trouvé.</p>;

    return (
        <section className="content-main">
            <div className="content-header d-flex justify-content-between align-items-center mb-4">
                <h2 className="content-title card-title">Détails de la boutique</h2>
                <button className="btn btn-secondary" onClick={() => router.back()}>
                    Retour
                </button>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    {/* Cover Image */}
                    {store.cover_image ? (
                        <img src={store.cover_image.thumb} alt="Cover" className="img-fluid mb-3" />
                    ) : (
                        <div style={{ width: "100%", height: 200, background: "#eee", marginBottom: 16 }} />
                    )}

                    {/* Logo */}
                    <div className="mb-3">
                        <strong>Logo: </strong>
                        {store.logo ? (
                            <img src={store.logo.thumb} alt="Logo" style={{ width: 100, height: 100, objectFit: "cover" }} />
                        ) : (
                            <span>No Logo</span>
                        )}
                    </div>

                    {/* Informations générales */}
                    <div className="mb-3">
                        <h5>Informations générales</h5>
                        <p><strong>Nom:</strong> {store.name}</p>
                        <p><strong>Email:</strong> {store.email || "-"}</p>
                        <p><strong>Téléphone:</strong> {store.phone || "-"}</p>
                        <p><strong>Adresse:</strong> {store.address || "-"}</p>
                        <p><strong>Ville:</strong> {store.city_id || "-"}</p>
                        <p><strong>Status:</strong> {store.status || "N/A"}</p>
                        <p><strong>Entreprise:</strong> {store.company || "-"}</p>
                        <p><strong>Code postal:</strong> {store.zip_code || "-"}</p>
                    </div>

                    {/* Description et contenu */}
                    <div className="mb-3">
                        <h5>Description</h5>
                        <p>{store.description || "-"}</p>
                        <h5>Contenu</h5>
                        <p>{store.content || "-"}</p>
                    </div>

                    {/* Fichiers */}
                    <div className="mb-3">
                        <h5>Fichiers</h5>
                        <p><strong>Certificate File:</strong> {store.certificate_file ? <a href={store.certificate_file} target="_blank">Voir</a> : "N/A"}</p>
                        <p><strong>Government ID:</strong> {store.government_id_file ? <a href={store.government_id_file} target="_blank">Voir</a> : "N/A"}</p>
                    </div>

                    {/* Statistiques */}
                    <div className="mb-3">
                        <h5>Statistiques</h5>
                        <p>Reviews: {store.reviews}</p>
                        <p>Rating: {store.rating}</p>
                        <p>Ship on Time: {store.shipOnTime}%</p>
                        <p>Chat Response: {store.chatResponse}%</p>
                    </div>

                    {/* Actions */}
                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-primary" onClick={() => router.push(`/xxadmin/stores/edit/${store.id}`)}>
                            Modifier
                        </button>
                        <button className="btn btn-danger" onClick={async () => {
                            if (!confirm("Supprimer cette boutique ?")) return;
                            try {
                                await axiosServices.delete(`/api/stores/${store.id}`);
                                alert("Store supprimé !");
                                router.push("/xxadmin/stores");
                            } catch (err) {
                                console.error(err);
                                alert("Erreur lors de la suppression");
                            }
                        }}>
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
