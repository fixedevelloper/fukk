'use client'

import React, { useState, useEffect } from "react";
import axiosServices from "../../../lib/axios";
import Modal from "react-modal";
import { Store, Image } from "../../../types/FrontType";
import { CategoryMediaCard } from "../components/CategoryMediaCard";
import Link from "next/link";

export default function StorePage() {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Modal Edit
    const [showModal, setShowModal] = useState(false);
    const [editingStore, setEditingStore] = useState<Store | null>(null);
    const [form, setForm] = useState<{ name: string; email?: string; phone?: string; logo_id?: number | null }>({
        name: "",
        email: "",
        phone: "",
        logo_id: null,
    });

    /** --- Fetch stores --- */
    const fetchStores = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axiosServices.get("/api/admin-stores");
            setStores(res.data.data ?? []);
        } catch (err) {
            console.error(err);
            setError("Erreur lors du chargement des stores");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    /** --- Render logo image --- */
    const renderImage = (image?: Image, alt?: string) => {
        if (!image) return <div style={{ width: 50, height: 50, background: "#eee" }} />;
        return <img src={image.thumb} alt={alt} className="img-fluid" style={{ width: 50, height: 50, objectFit: "cover" }} />;
    };

    /** --- Handle edit store --- */
    const handleEdit = (store: Store) => {
        setEditingStore(store);
        setForm({
            name: store.name,
            email: store.email,
            phone: store.phone,
            logo_id: store.logo?.id ?? null,
        });
        setShowModal(true);
    };

    /** --- Handle delete store --- */
    const handleDelete = async (store: Store) => {
        if (!confirm(`Supprimer le store "${store.name}" ?`)) return;
        try {
            await axiosServices.delete(`/api/stores/${store.id}`);
            alert("Store supprimé !");
            fetchStores();
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la suppression");
        }
    };

    /** --- Handle submit modal --- */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name) {
            alert("Le nom est requis");
            return;
        }
        setLoading(true);
        try {
            if (editingStore) {
                await axiosServices.put(`/api/stores/${editingStore.id}`, {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    logo_id: form.logo_id,
                });
                alert("Store mis à jour !");
            } else {
                await axiosServices.post("/api/stores", {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    logo_id: form.logo_id,
                });
                alert("Store créé !");
            }
            setShowModal(false);
            setEditingStore(null);
            setForm({ name: "", email: "", phone: "", logo_id: null });
            fetchStores();
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    /** --- Voir détails --- */
    const handleView = (store: Store) => {

    };

    if (loading && stores.length === 0) return <p>Chargement des stores...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <section className="content-main">
            <div className="content-header d-flex justify-content-between align-items-center mb-4">
                <h2 className="content-title card-title">Stores</h2>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    Ajouter un store
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Logo</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Ville</th>
                        <th>Status</th>
                        <th>Évaluation</th>
                        <th>Créé le</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stores.map(store => (
                        <tr key={store.id}>
                            <td>{store.id}</td>
                            <td>{renderImage(store.logo, store.name)}</td>
                            <td>{store.name}</td>
                            <td>{store.email || "-"}</td>
                            <td>{store.phone || "-"}</td>
                            <td>{store.city_id || "-"}</td>
                            <td>{store.status || "N/A"}</td>
                            <td>⭐ {store.rating || 0} ({store.reviews || 0})</td>
                            <td>{new Date(store.created_at).toLocaleDateString()}</td>
                            <td className="">
                                <button className="btn btn-sm btn-light" onClick={() => handleEdit(store)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(store)}>Delete</button>
                                <Link className="btn btn-sm btn-info" href={`vendors/${store.id}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Create / Edit Store */}
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Store Modal"
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1050 },
                    content: { position: "relative", inset: "auto", maxWidth: 500, width: "95%", borderRadius: "1rem", border: "none", padding: "2rem" },
                }}
            >
                <h4>{editingStore ? "Modifier Store" : "Ajouter Store"}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom</label>
                        <input type="text" className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Téléphone</label>
                        <input type="text" className="form-control" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Logo</label>
                        <CategoryMediaCard
                            selectedImage={form.logo_id ? stores.find(s => s.logo?.id === form.logo_id)?.logo : undefined}
                            onChange={(image: Image | null) => setForm({ ...form, logo_id: image?.id ?? null })}
                        />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">{editingStore ? "Update" : "Create"}</button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
