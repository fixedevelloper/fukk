"use client"

import React, {useState, useRef, useEffect} from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import Image from "next/image"
import {Product, Tab} from "../../types/FrontType";
import ProductCardTab from "./shop/ProductCardTab";



export default function ProductTabs() {
    const [activeIndex, setActiveIndex] = useState(0)
    const prevRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)
    const [tabs, setTabs] = useState<Tab[]>([])


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tabs`)
            .then((res:Response) => res.json())
            .then((data: Tab[]) => setTabs(data))
            .catch((err) => console.error(err))
    }, [])

    if (!tabs.length) return <p>Loading...</p>

    return (
        <section className="section-box mt-30">
            <div className="container">
                {/* --- En-tête des onglets --- */}
                <div className="head-main bd-gray-200">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <ul className="nav nav-tabs text-start" role="tablist">
                                {tabs.map((tab, idx) => (
                                    <li key={idx} className="pl-0">
                                        <a
                                            className={activeIndex === idx ? "active pl-0" : "pl-0"}
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setActiveIndex(idx)
                                            }}
                                        >
                                            <h4>{tab.title}</h4> {/* Les titres des onglets peuvent déjà être en français */}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* --- Boutons de navigation --- */}
                            <div className="box-button-slider">
                                <div className="button-slider-nav" id="tab-1-featured-nav">
                                    <div className="swiper-button-prev" ref={prevRef}/>
                                    <div className="swiper-button-next" ref={nextRef}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Contenu des onglets --- */}
                <div className="tab-content mt-30">
                    <Swiper
                        key={activeIndex} // 🔑 force re-render propre
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={4}
                        onBeforeInit={(swiper) => {
                            if (typeof swiper.params.navigation !== "boolean") {
                                if (swiper.params.navigation) {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                }

                            }
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1.2,
                            },
                            576: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 4,
                            },
                        }}
                        className="pt-5"
                    >
                        {tabs[activeIndex].products.map((product: Product) => (
                            <SwiperSlide key={product.id}>
                                <ProductCardTab product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>

    )
}
