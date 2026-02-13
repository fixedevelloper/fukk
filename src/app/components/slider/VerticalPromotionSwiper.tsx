"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import Link from "next/link"
import {Banner} from "../../../types/FrontType";
import React from "react";

export default function VerticalPromotionSwiper({
                                                    promotions,
                                                }: {
    promotions: Banner[]
}) {
    return (
        <Swiper
            direction="vertical"
            modules={[Autoplay]}
            slidesPerView={3}
            spaceBetween={10}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            loop
            className="swiper-vertical-1"
            style={{ height: "400px" }}
        >
            {promotions.map((promo) => (
                <SwiperSlide key={promo.id}>
                    <Link href={promo.href || "#"} className='mt-4'>
                        <img
                            src={
                                promo.image?.thumb ||
                                "/images/default-banner.jpg"
                            }
                            alt={promo.image?.alt || ""}
                            className="img-fluid"
                        />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
