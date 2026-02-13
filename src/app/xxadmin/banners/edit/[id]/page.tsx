"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { enqueueSnackbar } from "notistack"
import {Image} from "../../../../../types/FrontType";
import axiosServices from "../../../../../lib/axios";
import {CategoryMediaCard} from "../../../components/CategoryMediaCard";


export default function EditBannerPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [href, setHref] = useState("")
    const [placement, setPlacement] = useState("")
    const [image, setImage] = useState<Image | null>(null)
    const [isActive, setIsActive] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(true)

    /**
     * 🔹 Charger le banner
     */
    useEffect(() => {
        if (!id) return

        axiosServices
            .get(`/api/banners/${id}`)
            .then(res => {
                const banner = res.data
                setTitle(banner.title)
                setHref(banner.href || "")
                setPlacement(banner.placement || "")
                setImage(banner.image || null)
                setIsActive(Boolean(banner.is_active))
            })
            .catch(() => {
                enqueueSnackbar("Impossible de charger le banner", {
                    variant: "error",
                })
            })
            .finally(() => setLoadingData(false))
    }, [id])

    /**
     * 🔹 Submit update
     */
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
            await axiosServices.put(`/api/banners/${id}`, {
                title,
                href,
                placement,
                image_id: image.id,
                is_active: isActive,
            })

            enqueueSnackbar("Banner mis à jour avec succès", {
                variant: "success",
            })

            router.push("/xxadmin/banners/list")

        } catch (error) {
            console.error(error)
            enqueueSnackbar("Erreur lors de la mise à jour", {
                variant: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    if (loadingData) {
        return <p className="p-4">Chargement...</p>
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Modifier le Banner</h2>

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

                {/* Placement */}
                <div className="mb-3">
                    <label className="form-label">Placement</label>
                    <input
                        className="form-control"
                        value={placement}
                        onChange={(e) => setPlacement(e.target.value)}
                    />
                </div>

                {/* Image */}
                <div className="mb-4">
                    <label className="form-label">Image *</label>
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
                        {loading ? "Mise à jour..." : "Mettre à jour"}
                    </button>

                    <Link
                        href="/xxadmin/banners/list"
                        className="btn btn-secondary"
                    >
                        Annuler
                    </Link>
                </div>

            </form>
        </div>
    )
}
