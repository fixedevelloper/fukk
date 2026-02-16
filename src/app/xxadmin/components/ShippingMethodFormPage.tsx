"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axiosServices from "../../../lib/axios";

type Form = {
    name: string;
    title: string;
    description: string;
    type: "pickup" | "distance";
    base_price: number;
    price_per_km?: number;
    city_id: number | null;
    is_free: boolean;
    active: boolean;
};

export default function ShippingMethodFormPage() {
    const { id, shippingId } = useParams();
    const router = useRouter();
    const [form, setForm] = useState<Form>({
        name: "",
        title: "",
        description: "",
        type: "pickup",
        base_price: 0,
        price_per_km: 0,
        city_id:  Number(id),
        is_free: false,
        active: true,
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);


    // si édition
    useEffect(() => {
        if (shippingId) {
            setEditing(true);

            axiosServices
                .get(`/api/shipping-methods/${shippingId}`)
                .then((res) => {
                    const data = res.data.data ?? res.data;

                    setForm({
                        name: data.name || "",
                        title: data.title || "",
                        description: data.description || "",
                        type: data.type || "pickup",
                        base_price: Number(data.base_price) || 0,
                        price_per_km: Number(data.price_per_km) || 0,
                        city_id: data.city_id ?? Number(id),
                        is_free: Boolean(data.is_free),
                        active: Boolean(data.active),
                    });
                });
        }
    }, [shippingId]);


    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
    ) => {
        const { name, value } = e.target;

        let newValue: string | boolean = value;

        if (
            e.target instanceof HTMLInputElement &&
            e.target.type === "checkbox"
        ) {
            newValue = e.target.checked;
        }

        setForm((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editing) {
                await axiosServices.put(`/api/shipping-methods/${shippingId}`, form);
            } else {
                await axiosServices.post(`/api/shipping-methods`, form);
            }
            router.push(`/xxadmin/cities/${id}/shipping-methods/list`);
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="content-main">
            <div className="content-header mb-4">
                <h2 className="content-title">{editing ? "Éditer un mode de livraison" : "Nouveau mode de livraison"}</h2>
                <Link href={`/xxadmin/cities/${id}/shipping-methods/list`} className="btn btn-outline-primary">
                    Retour aux modes de livraison
                </Link>
            </div>

            <div className="card p-4">
                <form onSubmit={handleSubmit}>
                   <div className="mb-3">
                        <label className="form-label">Titre</label>
                        <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea name="description" className="form-control" value={form.description} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Type</label>
                        <select name="type" value={form.type} className="form-select" onChange={handleChange}>
                            <option value="pickup">Prix fixe</option>
                            <option value="distance">Distance</option>
                        </select>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Prix de base</label>
                            <input type="number" name="base_price" className="form-control" value={form.base_price} onChange={handleChange} required />
                        </div>
                        {form.type === "distance" && (
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Prix par km</label>
                                <input type="number" name="price_per_km" className="form-control" value={form.price_per_km} onChange={handleChange} required />
                            </div>
                        )}
                    </div>


                    <div className="form-check mb-3">
                        <input type="checkbox" name="is_free" checked={form.is_free} onChange={handleChange} className="form-check-input" />
                        <label className="form-check-label">Livraison gratuite</label>
                    </div>

                    <div className="form-check mb-3">
                        <input type="checkbox" name="active" checked={form.active} onChange={handleChange} className="form-check-input" />
                        <label className="form-check-label">Actif</label>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Enregistrement..." : editing ? "Mettre à jour" : "Créer"}
                    </button>
                </form>
            </div>
        </section>
    );
}
