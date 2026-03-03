"use client";

import { useEffect, useState } from "react";
import { useShippingStore } from "@/store/useShippingStore";
import { City, Zone } from "../../../types/FrontType";

type Props = {
    productId: number;
};

export default function HookShippingSelector({ productId }: Props) {
    const { cityId, zoneId, price, setCity, setZone, setPrice } =
        useShippingStore();

    const [cities, setCities] = useState<City[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(false);

    // Load cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/app-cities`
                );

                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des villes");
                }

                const data = await response.json();
                setCities(data.data);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        fetchCities();
    }, []);
    useEffect(() => {
        if (!cityId) return;

        const controller = new AbortController();

        const fetchZones = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/zones/by-city?city_id=${cityId}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des zones");
                }

                const data = await response.json();
                setZones(data.data);
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error(error);
                }
            }
        };

        fetchZones();

        return () => controller.abort();

    }, [cityId]);
    // Calculate shipping price
    useEffect(() => {
        if (!cityId || !zoneId) return;

        const fetchShippingPrice = async () => {
            try {
                setLoading(true);

                const queryParams = new URLSearchParams({
                    city_id: String(cityId),
                    zone_id: String(zoneId),
                    product_id: String(productId),
                });

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/shipping-price?${queryParams.toString()}`
                );

                if (!response.ok) {
                    throw new Error("Erreur lors du chargement du prix");
                }

                const data = await response.json();
                setPrice(data.price);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchShippingPrice();
    }, [zoneId, cityId, productId]);

    return (
        <div className="bg-white shadow-sm rounded-4 p-4 mt-1 border">
            <h5 className="fw-bold mb-4 text-dark">
                📦 Où souhaitez-vous être livré ?
            </h5>

            {/* City Select */}
            <div className="mb-3">
                <label className="form-label fw-semibold">Ville</label>
                <select
                    className="form-select form-select-sm rounded-3"
                    value={cityId || ""}
                    onChange={(e) => setCity(Number(e.target.value))}
                >
                    <option value="">Sélectionner une ville</option>
                    {cities.map((city: City) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Zone Select */}
            {cityId && (
                <div className="mb-3">
                    <label className="form-label fw-semibold">Zone</label>
                    <select
                        className="form-select form-select-sm rounded-3"
                        value={zoneId || ""}
                        onChange={(e) => setZone(Number(e.target.value))}
                    >
                        <option value="">Sélectionner une zone</option>
                        {zones.map((zone: Zone) => (
                            <option key={zone.id} value={zone.id}>
                                {zone.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="text-center py-3">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-2 small text-muted mb-0">
                        Calcul des frais de livraison...
                    </p>
                </div>
            )}

            {/* Price */}
            {price !== null && !loading && (
                <div className="alert alert-success rounded-3 mt-3 mb-0 d-flex justify-content-between align-items-center">
                    <span className="fw-medium">Frais de livraison</span>
                    <span className="fw-bold fs-5">
            {price.toLocaleString()} FCFA
          </span>
                </div>
            )}
        </div>
    );
}

