import VerticalPromotionSwiper from "./VerticalPromotionSwiper"
import {Banner} from "../../../types/FrontType";
import React from "react";


async function getPromotions(): Promise<Banner[]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/app-banners?placement=home_promotion&is_active=1`,
        {
            next: { revalidate: 60 }, // ISR 60s
        }
    )

    if (!res.ok) {
        return []
    }

    const data = await res.json()

    return data.data ?? []
}

export default async function VerticalPromotionSlider() {
    const promotions = await getPromotions()

    if (!promotions.length) return null

    return <VerticalPromotionSwiper promotions={promotions} />
}
