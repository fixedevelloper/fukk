"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axiosServices from "../../../../../../lib/axios";
import Link from "next/link";
import Pagination from "../../../../components/Pagination";
import {Zone} from "../../../../../../types/FrontType";


export default function ZonePage() {
    const { id } = useParams(); // city id
    const [zones, setZones] = useState<Zone[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchZones = (page = 1) => {
        if (!id) return;
        setLoading(true);
        axiosServices
            .get(`/api/cities/zones/${id}?per_page=10&page=${page}`)
            .then((res) => {
                setZones(res.data.data);
              //  setCurrentPage(res.data.meta.current_page);
             //   setLastPage(res.data.meta.last_page);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchZones();
    }, [id]);

    const handleDelete = (zoneId: number) => {
        if (!confirm("Voulez-vous vraiment supprimer cette zone ?")) return;
        axiosServices.delete(`/api/zones/${zoneId}`).then(() => fetchZones(currentPage));
    };

    return (
        <section className="content-main">
            <div className="content-header d-flex justify-content-between align-items-center mb-4">
                <h2 className="content-title card-title">Zones de la ville</h2>
                <Link href={`/xxadmin/cities/${id}/zones/create`} className="btn btn-primary">
                    <i className="material-icons md-post_add" /> Nouvelle zone
                </Link>
            </div>

            {loading ? (
                <div>Chargement...</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                            <th className="text-end">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {zones.map((zone) => (
                            <tr key={zone.id}>
                                <td>{zone.id}</td>
                                <td>{zone.name}</td>
                                <td>{zone.longitude}</td>
                                <td>{zone.latitude}</td>
                                <td className="text-end">
                                    <Link
                                        href={`/xxadmin/cities/${id}/zones/${zone.id}/edit`}
                                        className="btn btn-sm btn-outline-primary me-2"
                                    >
                                        Éditer
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(zone.id)}
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                 {/*   <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        onPageChange={(page) => fetchZones(page)}
                    />*/}
                </div>
            )}
        </section>
    );
}

