"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { enqueueSnackbar } from "notistack"
import Link from "next/link"
import axiosServices from "../../../../lib/axios";
import {CategoryMediaCard} from "../../components/CategoryMediaCard";
import {Image} from "../../../../types/FrontType";

export default function AddBannerPage() {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [href, setHref] = useState("")
    const [placement, setPlacement] = useState("")
    const [image, setImage] = useState<Image | null>(null);
    const [isActive, setIsActive] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title) {
            enqueueSnackbar("Titre requis", { variant: "warning" })
            return
        }

        if (!image) {
            enqueueSnackbar("Image requise", { variant: "warning" })
            return
        }

        setLoading(true)

        try {
            await axiosServices.post("/api/banners", {
                title,
                href,
                placement,
                image_id: image?.id,
                is_active: isActive,
            })

            enqueueSnackbar("Banner ajouté avec succès", {
                variant: "success",
            })

            router.push("/xxadmin/banners/list")

        } catch (error: any) {
            console.error(error)
            enqueueSnackbar("Erreur lors de l'ajout", {
                variant: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Ajouter un Banner</h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

                {/* Titre */}
                <div className="mb-3">
                    <label className="form-label">Titre *</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Lien */}
                <div className="mb-3">
                    <label className="form-label">Lien (href)</label>
                    <input
                        type="text"
                        className="form-control"
                        value={href}
                        onChange={(e) => setHref(e.target.value)}
                    />
                </div>


                {/* Description */}
                <div className="mb-3">
                    <label className="form-label">Placement</label>
                    <input
                        className="form-control"
                        value={placement}
                        onChange={(e) => setPlacement(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Image</label>
                    <CategoryMediaCard
                        selectedImage={image ?? undefined}
                        onChange={(img: Image | null) => setImage(img)}
                    />
                </div>

                {/* Actif */}
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isActive}
                        onChange={() => setIsActive(!isActive)}
                    />
                    <label className="form-check-label">
                        Actif
                    </label>
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
                        href="/xxadmin/banners"
                        className="btn btn-secondary"
                    >
                        Annuler
                    </Link>
                </div>

            </form>
        </div>
    )
}
