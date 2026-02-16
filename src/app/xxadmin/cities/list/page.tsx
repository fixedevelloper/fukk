"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "../../components/Pagination";
import axiosServices from "../../../../lib/axios";
import {City} from "../../../../types/FrontType";



export default function CityPage() {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const perPage = 10;

    // Fetch cities with zones
    const fetchCities = async (page = 1) => {
        setLoading(true);
        try {
            const res = await axiosServices.get("/api/cities", {
                params: { page, per_page: perPage, includeZones: true },
            });
            setCities(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    // Delete city
    const handleDeleteCity = async (cityId: number) => {
        if (!confirm("Voulez-vous supprimer cette ville ?")) return;
        try {
            await axiosServices.delete(`/api/cities/${cityId}`);
            fetchCities(currentPage);
        } catch (err) {
            console.error(err);
        }
    };

    // Delete zone
    const handleDeleteZone = async (cityId: number, zoneId: number) => {
        if (!confirm("Voulez-vous supprimer cette zone ?")) return;
        try {
            await axiosServices.delete(`/api/zones/${zoneId}`);
            fetchCities(currentPage); // reload city with updated zones
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="content-main">
            <div className="content-header d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="content-title card-title">Villes</h2>
                </div>
                <div>
                    <Link href="/xxadmin/cities/create" className="btn btn-primary">
                        <i className="material-icons md-post_add" /> Nouvelle ville
                    </Link>
                </div>
            </div>

            <div className="col-md-12">
                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Longitude</th>
                                <th>Latitude</th>
                                <th className="text-end">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cities.map((city) => (
                                <tr key={city.id}>
                                    <td>{city.id}</td>
                                    <td>{city.name}</td>
                                    <td>{city.longitude}</td>
                                    <td>{city.latitude}</td>
                                    <td className="text-end">
                                        <Link
                                            href={`/xxadmin/cities/${city.id}/zones/list`}
                                            className="btn btn-sm btn-outline-dark me-2"
                                        >
                                            Zones
                                        </Link>
                                        <Link
                                            href={`/xxadmin/cities/${city.id}/shipping-methods/list`}
                                            className="btn btn-sm btn-outline-success me-2"
                                        >
                                            Shipping-methods
                                        </Link>
                                        <Link
                                            href={`/xxadmin/cities/${city.id}/edit`}
                                            className="btn btn-sm btn-outline-primary me-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDeleteCity(city.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={(page) => fetchCities(page)}
                />
            </div>
        </section>
    );
}
