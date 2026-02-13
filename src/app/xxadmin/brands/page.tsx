'use client'

import React, { useState, useEffect } from "react";
import { Brand, Image } from "../../../types/FrontType";
import axiosServices from "../../../lib/axios";
import Modal from "react-modal";
import { CategoryMediaCard } from "../components/CategoryMediaCard";

export default function BrandPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
    const [form, setForm] = useState<{ name: string; image_id?: number }>({ name: "" });

    /** --- API Calls --- */
    const fetchBrands = async () => {
        setLoading(true);
        try {
            const res = await axiosServices.get("/api/brands");
            setBrands(res.data.data ?? []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const saveBrand = async () => {
        setLoading(true);
        try {
            if (editingBrand) {
                await axiosServices.put(`/api/brands/${editingBrand.id}`, form);
                setBrands(brands.map(b => b.id === editingBrand.id ? { ...b, ...form } : b));
            } else {
                const res = await axiosServices.post("/api/brands", form);
                setBrands([...brands, res.data.data]);
            }
            closeModal();
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    const removeBrand = async (brand: Brand) => {
        if (!confirm(`Supprimer la marque "${brand.name}" ?`)) return;
        setLoading(true);
        try {
            await axiosServices.delete(`/api/brands/${brand.id}`);
            setBrands(brands.filter(b => b.id !== brand.id));
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la suppression");
        } finally {
            setLoading(false);
        }
    };

    /** --- Modal & Form --- */
    const openModal = (brand?: Brand) => {
        if (brand) {
            setEditingBrand(brand);
            setForm({ name: brand.name, image_id: brand.image?.id });
        } else {
            setEditingBrand(null);
            setForm({ name: "" });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingBrand(null);
        setForm({ name: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.image_id) return alert("Nom et image requis !");
        saveBrand();
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    /** --- JSX --- */
    return (
        <section className="content-main">
            <div className="content-header d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="content-title card-title">Brands</h2>
                    <p>Brand and vendor management</p>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={() => openModal()}>
                        <i className="material-icons md-post_add" /> Add New Brand
                    </button>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row gx-3">
                        {brands.map(brand => (
                            <div key={brand.id} className="col-xl-2 col-lg-3 col-md-4 col-6">
                                <figure className="card border-1">
                                    <div className="card-header bg-white text-center">
                                        {brand.image ? (
                                            <img className="img-fluid" height={76} src={brand.image.thumb} alt={brand.name} />
                                        ) : (
                                            <div style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "center", background: "#eee" }}>
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <figcaption className="card-body text-center">
                                        <h6 className="card-title m-0">{brand.name}</h6>
                                        <div className="d-flex justify-content-center gap-1 mt-2">
                                            <button className="btn btn-sm btn-light" onClick={() => openModal(brand)}>Edit</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => removeBrand(brand)}>Delete</button>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                contentLabel="Brand Modal"
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1050 },
                    content: { position: "relative", inset: "auto", maxWidth: 500, width: "95%", borderRadius: "1rem", border: "none", padding: "2rem" },
                }}
            >
                <h4>{editingBrand ? "Edit Brand" : "Add Brand"}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Logo</label>
                        <CategoryMediaCard
                            selectedImage={form.image_id ? brands.find(b => b.image?.id === form.image_id)?.image : undefined}
                            onChange={(image: Image | null) => setForm({ ...form, image_id: image?.id })}
                        />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                        <button type="submit" className="btn btn-primary">{editingBrand ? "Update" : "Create"}</button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
