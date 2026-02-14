"use client"

import {Swiper, SwiperSlide} from "swiper/react"
import {Pagination, Navigation, Autoplay} from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import Link from "next/link";
import {Slider} from "../../../types/FrontType";

export default function HomeSlider({sliders}: { sliders: Slider[] }) {
    return (
        <div className="box-swiper">
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                slidesPerView={1}
                spaceBetween={30}
                pagination={{clickable: true}}
                navigation
                autoplay={{delay: 5000}}
                loop
                className="swiper-group-1"
            >
                {sliders.map((slide: Slider) => {
                    const imageUrl = slide.image?.medium ?? "/images/default-banner.jpg";
                    return (
                        <SwiperSlide key={slide.id}>
                            <div
                                className="banner-big banner-big-3 bg-22"
                                style={{
                                    backgroundImage: `url(${imageUrl})`,
                                    minHeight: "500px", // hauteur du slider
                                    display: "flex",
                                    alignItems: "center", // centre verticalement
                                }}
                            >
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-7 d-flex flex-column justify-content-center">
                                            {/* TITRE */}
                                            <h3 className="color-gray-100 text-uppercase text-start">
                                                {slide.title.split("\n").map((line, i) => (
                                                    <span key={i}>
                {line}
                                                        <br className="d-none d-lg-block" />
              </span>
                                                ))}
                                            </h3>

                                            {/* DESCRIPTION */}
                                            <div className="mt-3">
                                                <ul className="list-disc text-start">
                                                    {slide.description}
                                                </ul>
                                            </div>

                                            {/* BOUTON */}
                                            <div className="mt-4 text-start">
                                                <Link
                                                    className="btn btn-brand-2 btn-gray-1000"
                                                    href={slide.href || "/shop"}
                                                >
                                                    {slide.btn_text}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                    )
                })}
            </Swiper>
        </div>

    )
}

