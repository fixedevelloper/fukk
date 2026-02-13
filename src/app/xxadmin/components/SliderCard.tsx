"use client";

import { useEffect, useState } from "react";
import { Slider, ResponsePaginate } from "../../../types/FrontType";
import { useRouter } from "next/navigation";
import axiosServices from "../../../lib/axios";

type Filter = {
    category?: string;
    status?: string;
    date?: string;
};

export function SliderCard() {
    const router = useRouter();
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<Filter>({});
    const [page, setPage] = useState(1);
    const perPage = 5;

    const [meta, setMeta] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
    });

    const fetchSliders = async () => {
        setLoading(true);
        try {
            const response = await axiosServices.get<ResponsePaginate<Slider>>(
                `${process.env.NEXT_PUBLIC_API_URL}/api/sliders`,
                {
                    params: {
                        ...(filter.category && { type: filter.category }),
                        ...(filter.status && { status: filter.status }),
                        ...(filter.date && { date: filter.date }),
                        page,
                        per_page: perPage,
                    },
                }
            );

            const data = response.data;

            setSliders(data.data || []);
            setMeta({
                current_page: data.meta.current_page,
                last_page: data.meta.last_page,
                total: data.meta.total,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Voulez-vous vraiment supprimer ce slider ?")) return;

        try {
            await axiosServices.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/sliders/${id}`);
            fetchSliders(); // recharge les sliders après suppression
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSliders();
    }, [filter, page]);

    return (
        <div className="card mb-4">
            {/* Filtre */}
            <header className="card-header">
                <div className="row align-items-center">
                    <div className="col-md-3 col-12 me-auto">
                        <select
                            className="form-select"
                            value={filter.category || ""}
                            onChange={(e) => setFilter((prev) => ({ ...prev, category: e.target.value }))}
                        >
                            <option value="">Toutes les catégories</option>
                            <option value="home_slider">Slider d'accueil</option>
                            <option value="banner">Bannières</option>
                        </select>
                    </div>

                    <div className="col-md-2 col-6">
                        <input
                            type="date"
                            className="form-control"
                            value={filter.date || ""}
                            onChange={(e) => setFilter((prev) => ({ ...prev, date: e.target.value }))}
                        />
                    </div>

                    <div className="col-md-2 col-6">
                        <select
                            className="form-select"
                            value={filter.status || ""}
                            onChange={(e) => setFilter((prev) => ({ ...prev, status: e.target.value }))}
                        >
                            <option value="">Statut</option>
                            <option value="active">Actif</option>
                            <option value="disabled">Désactivé</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* Liste */}
            <div className="card-body">
                {loading && <p className="text-center">Chargement...</p>}

                {!loading && sliders.length === 0 && (
                    <p className="text-center text-muted">Aucun slider trouvé</p>
                )}

                {!loading &&
                sliders.map((slider) => (
                    <article
                        key={slider.id}
                        className="itemlist d-flex align-items-center justify-content-between border-bottom py-2"
                    >
                        <div className="col-md-1 col-img">
                            <img
                                src={slider.image?.thumb}
                                alt={slider.title}
                                className="img-xs rounded"
                                style={{ width: 60, height: 60, objectFit: "cover" }}
                            />
                        </div>

                        <div className="col-md-3 col-name">
                            <strong>{slider.title}</strong>
                            <div className="text-muted small">{slider.position}</div>
                            {slider.href && (
                                <a href={slider.href} target="_blank" rel="noreferrer" className="small">
                                                                     {slider.href}
                                </a>
                            )}
                            {slider.is_active && (
                                <div
                                    className={`badge ${
                                        slider.is_active == 0 ? "bg-success" : "bg-secondary"
                                    } mt-1`}
                                >
                                    {slider.is_active ==0 ? "Actif" : "Désactivé"}
                                </div>
                            )}
                        </div>
                        <div className="col-md-4 col-info">
                            {slider.description}
                        </div>
                        <div className="col-md-2 col-price">
                            {slider.btn_text}
                        </div>

                        <div className="col col-action text-end d-flex gap-2">
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => router.push(`/xxadmin/sliders/${slider.id}/edit`)}
                            >
                                Modifier
                            </button>

                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(slider.id)}>
                                Supprimer
                            </button>
                        </div>
                    </article>
                ))}

                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-3">
          <span>
            Page {meta.current_page} / {meta.last_page} - Total {meta.total} sliders
          </span>
                    <div className="btn-group">
                        <button
                            className="btn btn-sm btn-outline-primary"
                            disabled={page <= 1}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Précédent
                        </button>
                        <button
                            className="btn btn-sm btn-outline-primary"
                            disabled={page >= meta.last_page}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
