"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axiosServices from "../../../lib/axios";

type ZoneForm = {
    name: string;
    latitude: string;
    longitude: string;
    city_id: number;
};

export default function ZoneFormPage() {
    const { id, zoneId } = useParams(); // id = city_id, zoneId = optional pour édition
    const router = useRouter();

    const [form, setForm] = useState<ZoneForm>({
        name: "",
        latitude: "",
        longitude: "",
        city_id: Number(id),
    });

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState<boolean>(false);

    // Si zoneId existe, on est en mode édition
    useEffect(() => {
        if (!zoneId) return;

        setEditing(true);
        setLoading(true);

        axiosServices
            .get(`/api/zones/${zoneId}`)
            .then((res) => {
                const data = res.data.data ?? res.data;

                setForm({
                    name: data.name || "",
                    latitude: data.latitude || "",
                    longitude: data.longitude || "",
                    city_id: data.city_id ?? Number(id),
                });
            })
            .catch((err) => {
                console.error(err);
                alert("Erreur lors du chargement de la zone");
            })
            .finally(() => setLoading(false));
    }, [zoneId, id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name) return alert("Nom de la zone requis !");
        if (!form.latitude || !form.longitude) return alert("Latitude et Longitude requises !");

        setLoading(true);
        try {
            if (editing && zoneId) {
                await axiosServices.put(`/api/zones/${zoneId}`, form);
            } else {
                await axiosServices.post("/api/zones", form);
            }
            router.push(`/xxadmin/cities/${id}/zones/list`);
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
                <h2 className="content-title">
                    {editing ? "Éditer une zone" : "Nouvelle zone"}
                </h2>
                <Link href={`/xxadmin/cities/${id}/zones/list`} className="btn btn-outline-primary">
                    Retour aux zones
                </Link>
            </div>

            <div className="card p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom de la zone</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Latitude</label>
                            <input
                                type="text"
                                name="latitude"
                                value={form.latitude}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Longitude</label>
                            <input
                                type="text"
                                name="longitude"
                                value={form.longitude}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading
                            ? "Enregistrement..."
                            : editing
                                ? "Mettre à jour"
                                : "Créer la zone"}
                    </button>
                </form>
            </div>
        </section>
    );
}
