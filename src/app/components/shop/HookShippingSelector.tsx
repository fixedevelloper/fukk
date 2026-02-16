"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useShippingStore } from "@/store/useShippingStore";
import axiosServices from "../../../lib/axios";
import {City, Product, Zone} from "../../../types/FrontType";


type Props = {
    productId: number;
};

export default function HookShippingSelector({ productId }: Props) {
    const {
        cityId,
        zoneId,
        price,
        setCity,
        setZone,
        setPrice,
    } = useShippingStore();

    const [cities, setCities] = useState<City[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(false);

    // Load cities
    useEffect(() => {
        axiosServices.get("/api/cities").then((res) => {
            setCities(res.data.data);
        });
    }, []);

    // Load zones when city changes
    useEffect(() => {
        if (!cityId) return;

        axiosServices.get(`/api/zones?city_id=${cityId}`).then((res) => {
            setZones(res.data.data);
        });
    }, [cityId]);

    // Calculate shipping price
    useEffect(() => {
        if (!cityId || !zoneId) return;

        setLoading(true);

        axiosServices
            .get(`/api/shipping-price`, {
                params: {
                    city_id: cityId,
                    zone_id: zoneId,
                    product_id: productId,
                },
            })
            .then((res) => {
                setPrice(res.data.price);
            })
            .finally(() => setLoading(false));
    }, [zoneId]);

    return (
        <div className="card p-3 mt-4">
            <h6>Ou allez-vous?</h6>

            <select
                className="form-select mb-3"
                value={cityId || ""}
                onChange={(e) => setCity(Number(e.target.value))}
            >
                <option value="">Sélectionner une ville</option>
                {cities.map((city:City) => (
                    <option key={city.id} value={city.id}>
                        {city.name}
                    </option>
                ))}
            </select>

            {cityId && (
                <select
                    className="form-select mb-3"
                    value={zoneId || ""}
                    onChange={(e) => setZone(Number(e.target.value))}
                >
                    <option value="">Sélectionner une zone</option>
                    {zones.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                            {zone.name}
                        </option>
                    ))}
                </select>
            )}

            {loading && <p>Calcul en cours...</p>}

            {price !== null && !loading && (
                <div className="alert alert-success">
                    Frais de livraison : <strong>{price.toLocaleString()} FCFA</strong>
                </div>
            )}
        </div>
    );
}
