"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {CategoryMediaCard} from "../../../components/CategoryMediaCard";
import {Image} from "../../../../../types/FrontType";
import axiosServices from "../../../../../lib/axios";
import {enqueueSnackbar} from "notistack";

export default function EditSliderPage() {
    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [href, setHref] = useState("");
    const [description, setDescription] = useState("");
    const [btnText, setBtnText] = useState("")
    const [position, setPosition] = useState(0);
    const [image, setImage] = useState<Image | null>(null);
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [initialized, setInitialized] = useState(false);

    // 🔹 Load slider
    useEffect(() => {
        if (!id) return;

        const fetchSlider = async () => {
            try {
                const res = await axiosServices.get(`/api/sliders/${id}`);
                const slider = res.data.data;
                setBtnText(slider.btn_text ?? "");
                setTitle(slider.title ?? "");
                setHref(slider.href ?? "");
                setDescription(slider.description ?? "");
                setPosition(slider.position ?? 0);
                setImage(slider.image ?? null);
                setIsActive(slider.is_active ?? true);

                setInitialized(true);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger le slider");
            }
        };

        fetchSlider();
    }, [id]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) {
            enqueueSnackbar("Image requise", { variant: "warning" });
            return;
        }

        setLoading(true);
        setError("");

        try {
            await axiosServices.put(`/api/sliders/${id}`, {
                title,
                href,
                description,
                position,
                image_id: image.id,
                is_active: isActive,
                btnText
            });

            enqueueSnackbar("Slider mis à jour avec succès", {
                variant: "success",
            });

            router.push("/xxadmin/sliders");

        } catch (err) {
            console.error(err);
            enqueueSnackbar("Erreur lors de la mise à jour", {
                variant: "error",
            });
        } finally {
            setLoading(false);
        }
    };


    if (error) return <p className="text-danger">{error}</p>;
    if (!initialized) return <p>Chargement...</p>;

    return (
        <div className="container py-4">
            <h1 className="mb-4">Modifier le slider</h1>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

                <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Texte bouton</label>
                    <input
                        type="text"
                        className="form-control"
                        value={btnText}
                        onChange={(e) => setBtnText(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Lien (href)</label>
                    <input
                        className="form-control"
                        value={href}
                        onChange={e => setHref(e.target.value)}
                        placeholder="/shop/category"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Position</label>
                    <input
                        type="number"
                        className="form-control"
                        value={position}
                        onChange={e => setPosition(Number(e.target.value))}
                        min={0}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Image</label>
                    <CategoryMediaCard
                        selectedImage={image}
                        onChange={setImage}
                    />
                </div>

                <div className="form-check mb-4">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isActive}
                        onChange={e => setIsActive(e.target.checked)}
                    />
                    <label className="form-check-label">
                        Actif
                    </label>
                </div>

                <button className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Sauvegarde..." : "Mettre à jour"}
                </button>
            </form>
        </div>
    );
}

