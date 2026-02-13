"use client";

import React, { useState } from "react";
import {CategoryMediaCard} from "./CategoryMediaCard";
import {Image} from "../../../types/FrontType";
import axiosServices from "../../../lib/axios";
import {enqueueSnackbar} from "notistack";

export default function AddSliderForm() {
    const [title, setTitle] = useState("");
    const [href, setHref] = useState("");
    const [description, setDescription] = useState("");
    const [btnText, setBtnText] = useState("")
    const [position, setPosition] = useState(0);
    const [image, setImage] = useState<Image | null>(null);
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !image) {
            enqueueSnackbar("Le titre et l'image sont requis", { variant: "warning" });
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("href", href);
        formData.append("btn_text", btnText);
        formData.append("description", description);
        formData.append("position", String(position));
        formData.append("image_id", String(image.id));
        formData.append("is_active", String(isActive));

        setLoading(true);

        try {
            await axiosServices.post("/api/sliders", formData);

            enqueueSnackbar("Slider ajouté avec succès !", { variant: "success" });

            // Reset
            setTitle("");
            setHref("");
            setDescription("");
            setPosition(0);
            setImage(null);
            setIsActive(true);

        } catch (err) {
            console.error(err);
            enqueueSnackbar("Erreur lors de l'enregistrement", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">Ajouter un slider</h1>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

                <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input
                        type="text"
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
                {/* Texte bouton */}
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
                        type="text"
                        className="form-control"
                        value={href}
                        onChange={e => setHref(e.target.value)}
                        placeholder="https://..."
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
                        selectedImage={image ?? undefined}
                        onChange={(img: Image | null) => setImage(img)}
                    />
                </div>

                <div className="form-check mb-4">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="isActive"
                        checked={isActive}
                        onChange={e => setIsActive(e.target.checked)}
                    />
                    <label htmlFor="isActive" className="form-check-label">
                        Actif
                    </label>
                </div>

                <button className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Enregistrement..." : "Ajouter Slider"}
                </button>
            </form>
        </div>
    );
}

