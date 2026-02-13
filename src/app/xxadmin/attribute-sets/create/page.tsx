'use client';

import { useState } from "react";
import Link from "next/link";
import axiosServices from "../../../../lib/axios";

export default function CreateAttributeSetPage() {
    const [form, setForm] = useState({
        title: "",
        display_layout: "swatch_dropdown",
        is_searchable: true,
        is_comparable: true,
        is_use_in_product_listing: false,
        status: "published",
    });

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });

        setErrors({ ...errors, [name]: null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: any = {};
        if (!form.title) newErrors.title = "Nom requis";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            await axiosServices.post("/api/attribute-sets", form);
            window.location.href = "/xxadmin/attribute-sets";
        } catch (err: any) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="content-main">
            {/* HEADER */}
            <div className="content-header">
                <div>
                    <h2 className="content-title card-title">
                        Créer un attribute set
                    </h2>
                </div>

                <Link
                    href="/xxadmin/attribute-sets"
                    className="btn btn-light btn-sm"
                >
                    Retour
                </Link>
            </div>

            {/* FORM */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Title */}
                        <div className="mb-3">
                            <label className="form-label">
                                Nom <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                className={`form-control ${
                                    errors.title ? "is-invalid" : ""
                                }`}
                                value={form.title}
                                onChange={handleChange}
                            />
                            {errors.title && (
                                <div className="invalid-feedback">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        {/* Display layout */}
                        <div className="mb-3">
                            <label className="form-label">
                                Type d’affichage
                            </label>
                            <select
                                name="display_layout"
                                className="form-select"
                                value={form.display_layout}
                                onChange={handleChange}
                            >
                                <option value="swatch_dropdown">
                                    Swatch + Dropdown
                                </option>
                                <option value="dropdown">
                                    Dropdown
                                </option>
                                <option value="swatch">
                                    Swatch
                                </option>
                            </select>
                        </div>

                        {/* Options */}
                        <div className="row mb-3">
                            <div className="col-md-4 form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="is_searchable"
                                    checked={form.is_searchable}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">
                                    Recherchable
                                </label>
                            </div>

                            <div className="col-md-4 form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="is_comparable"
                                    checked={form.is_comparable}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">
                                    Comparable
                                </label>
                            </div>

                            <div className="col-md-4 form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="is_use_in_product_listing"
                                    checked={form.is_use_in_product_listing}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">
                                    Visible dans la liste
                                </label>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label className="form-label">Statut</label>
                            <select
                                name="status"
                                className="form-select"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="published">Publié</option>
                                <option value="draft">Brouillon</option>
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Enregistrement..." : "Enregistrer"}
                            </button>

                            <Link
                                href="/xxadmin/attribute-sets"
                                className="btn btn-outline-secondary"
                            >
                                Annuler
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
