"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { enqueueSnackbar } from "notistack"
import axiosServices from "../../../../lib/axios";
import {Banner} from "../../../../types/FrontType";

export default function BannerListPage() {
    const [banners, setBanners] = useState<Banner[]>([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    useEffect(() => {
        fetchBanners()
    }, [page, search])

    const fetchBanners = async () => {
        setLoading(true)
        try {
            const res = await axiosServices.get("/api/banners", {
                params: {
                    page,
                    search,
                    per_page: 10,
                },
            })

            setBanners(res.data.data)
            setLastPage(res.data.meta.last_page)
        } catch (err) {
            enqueueSnackbar("Erreur chargement banners", { variant: "error" })
        } finally {
            setLoading(false)
        }
    }

    const toggleActive = async (id: number) => {
        try {
            await axiosServices.patch(`/api/banners/${id}/toggle-active`)
            fetchBanners()
            enqueueSnackbar("Statut mis à jour", { variant: "success" })
        } catch {
            enqueueSnackbar("Erreur mise à jour", { variant: "error" })
        }
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>Banners</h2>
                <Link href="/xxadmin/banners/add" className="btn btn-primary">
                    Ajouter
                </Link>
            </div>

            {/* 🔎 Recherche */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Rechercher par titre..."
                value={search}
                onChange={(e) => {
                    setPage(1)
                    setSearch(e.target.value)
                }}
            />

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Titre</th>
                            <th>Actif</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {banners.map((banner, index) => (
                            <tr key={banner.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={banner.image?.thumb ?? "/images/default-banner.jpg"}
                                        width="80"
                                    />
                                </td>
                                <td>{banner.title}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={banner.is_active}
                                        onChange={() => toggleActive(banner.id)}
                                    />
                                </td>
                                <td>
                                    <Link
                                        href={`/xxadmin/banners/edit/${banner.id}`}
                                        className="btn btn-sm btn-info me-2"
                                    >
                                        Modifier
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* 📄 Pagination */}
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-outline-secondary me-2"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Précédent
                        </button>

                        <span className="align-self-center">
              Page {page} / {lastPage}
            </span>

                        <button
                            className="btn btn-outline-secondary ms-2"
                            disabled={page === lastPage}
                            onClick={() => setPage(page + 1)}
                        >
                            Suivant
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
