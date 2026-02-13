"use client"

import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"
import {Brand, ResponsePaginate} from "../../../types/FrontType";


export default function BrandSlider() {
    const [brands, setBrands] = useState<Brand[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/app-brands`)
            .then((res) => res.json())
            .then((data:ResponsePaginate<Brand>) => {
                setBrands(data.data || []); // ⚡ ici : on prend data.data
            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <div className="section-box">
            <div className="container">
                <div className="list-brands list-none-border">
                    <div class='box-swiper'>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={5}
                            loop={true}
                            autoplay={{ delay: 2500 }}
                            navigation
                            pagination={{ clickable: true }}
                            className="swiper-container"
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                576: { slidesPerView: 3 },
                                768: { slidesPerView: 4 },
                                992: { slidesPerView: 5 },
                            }}
                        >
                            {brands.map((brand, idx) => (
                                <SwiperSlide key={idx} className="swiper-slide">
                                    <a href={brand.image?.src}>
                                        <div className="relative w-24 h-12">
                                            <Image
                                                src={brand.image?.src || '/images/default.png'}
                                                alt={brand.name}
                                                fill
                                                unoptimized
                                                className="object-contain"
                                            />
                                        </div>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>
            </div>
        </div>
    )
}
