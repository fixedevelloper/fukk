'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosServices from "../../../../lib/axios";
import {AttributeSet} from "../../../../types/FrontType";


export default function CreateAttributePage() {
    const [attributeSets, setAttributeSets] = useState<AttributeSet[]>([]);
    const [form, setForm] = useState({
        attribute_set_id: "",
        title: "",
        color: "",
        status: "published",
    });

    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    // Charger les attribute sets
    useEffect(() => {
        axiosServices.get("/api/attribute-sets")
            .then(res => setAttributeSets(res.data.data))
            .catch(() => {});
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: any = {};
        if (!form.attribute_set_id)
            newErrors.attribute_set_id = "Attribute set requis";
        if (!form.title)
            newErrors.title = "Nom requis";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            await axiosServices.post("/api/attributes", form);

            window.location.href = "/xxadmin/attributes";
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
                        Créer un attribut
                    </h2>
                </div>

                <Link
                    href="/xxadmin/attributes"
                    className="btn btn-light btn-sm"
                >
                    Retour
                </Link>
            </div>

            {/* FORM */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Attribute Set */}
                        <div className="mb-3">
                            <label className="form-label">
                                Attribute Set <span className="text-danger">*</span>
                            </label>
                            <select
                                name="attribute_set_id"
                                className={`form-select ${
                                    errors.attribute_set_id ? "is-invalid" : ""
                                }`}
                                value={form.attribute_set_id}
                                onChange={handleChange}
                            >
                                <option value="">-- Sélectionner --</option>
                                {attributeSets.map(set => (
                                    <option key={set.id} value={set.id}>
                                        {set.title}
                                    </option>
                                ))}
                            </select>
                            {errors.attribute_set_id && (
                                <div className="invalid-feedback">
                                    {errors.attribute_set_id}
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div className="mb-3">
                            <label className="form-label">
                                Nom de l’attribut <span className="text-danger">*</span>
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

                        {/* Color */}
                        <div className="mb-3">
                            <label className="form-label">
                                Couleur (optionnel)
                            </label>
                            <input
                                type="color"
                                name="color"
                                className="form-control form-control-color"
                                value={form.color}
                                onChange={handleChange}
                            />
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
                                href="/xxadmin/attributes"
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
