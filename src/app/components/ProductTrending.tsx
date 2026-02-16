"use client"

import React, {useEffect, useRef, useState} from "react"
import {Swiper, SwiperSlide} from "swiper/react"
import { Navigation, Grid } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/grid"
import {Product, ResponsePaginate} from "../../types/FrontType";
import ProductCardTab from "./shop/ProductCardTab";
import ProductCardStyle2 from "./shop/ProductCardStyle2";

export default function ProductTrending() {
    const mainPrevRef = useRef<HTMLDivElement>(null)
    const mainNextRef = useRef<HTMLDivElement>(null)
    const sidePrevRef = useRef<HTMLDivElement>(null)
    const sideNextRef = useRef<HTMLDivElement>(null)
    const prevRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [bestSellers, setBestSellers] = useState<Product[]>([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/best-products`)
            .then((res) => res.json())
            .then((data:ResponsePaginate<Product>) => {
                setBestSellers(data.data || []); // ⚡ ici : on prend data.data
            })
            .catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trending-products`)
            .then((res:Response) => res.json())
            .then((data:ResponsePaginate<Product>) => {
                setProducts(data.data || []); // ⚡ ici : on prend data.data
            })
            .catch((err) => console.error(err))
    }, [])

    if (!products.length) return <p>Loading...</p>
    return (
        <div className="section-box pt-60 pb-60 bg-gray-50 mt-50">
            <div className="container">
                <div className="row">
                    {/* --- Slider principal --- */}
                    <div className="col-xl-9 col-lg-8">
                        <div className="head-main bd-gray-200">
                            <div className="row">
                                <div className="col-xl-7 col-lg-6">
                                    <h4 className="mb-5">Produits tendance</h4>
                                </div>
                                <div className="col-xl-5 col-lg-6">
                                    <div className="box-button-slider-normal">
                                        <div className="button-slider-nav">
                                            <div className="swiper-button-prev" ref={prevRef}/>
                                            <div className="swiper-button-next" ref={nextRef}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Swiper
                            modules={[Navigation, Grid]}
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
                            grid={{
                                rows: 2,
                                fill: "row",
                            }}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            breakpoints={{
                                0: { slidesPerView: 1, grid: { rows: 2 } },
                                576: { slidesPerView: 2, grid: { rows: 2 } },
                                992: { slidesPerView: 3, grid: { rows: 2 } },
                            }}
                            className="pt-5"
                        >
                            {products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <ProductCardTab product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="mt-20"><a href="shop-single-product.html"><img src="images/homepage4/banner-ads.png" alt="FinduKarko"/></a></div>
                        <div className="box-content mt-45">
                            <div className="head-main bd-gray-200">
                                <div className="row">
                                    <div className="col-xl-7 col-lg-6">
                                        <h4 className="mb-5">Produits les mieux notés</h4>
                                    </div>
                                    <div className="col-xl-5 col-lg-6">
                                        <div className="box-button-slider-normal">
                                            <div className="button-slider-nav" id="tab-2-all-nav">
                                                <div className="swiper-button-prev" ref={mainPrevRef}/>
                                                <div className="swiper-button-next" ref={mainNextRef}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-swiper">
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={20}
                                    slidesPerView={3}
                                    onBeforeInit={(swiper) => {
                                        if (typeof swiper.params.navigation !== "boolean") {
                                            if (swiper.params.navigation) {
                                                swiper.params.navigation.prevEl = mainPrevRef.current;
                                                swiper.params.navigation.nextEl = mainNextRef.current;
                                            }
                                        }
                                    }}
                                    navigation={{
                                        prevEl: mainPrevRef.current,
                                        nextEl: mainNextRef.current,
                                    }}
                                    className="pt-5"
                                >
                                    {products.map((product) => (
                                        <SwiperSlide key={product.id}>
                                            <ProductCardTab product={product} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>

                    {/* --- Sidebar Meilleures ventes --- */}
                    <div className="col-xl-3 col-lg-4">
                        <div className="box-slider-item box-sidebar">
                            <div className="head d-flex justify-between items-center">
                                <h4>Meilleures ventes</h4>
                                <div className="box-button-slider-normal">
                                    <div className="swiper-button-prev" ref={sidePrevRef}/>
                                    <div className="swiper-button-next" ref={sideNextRef}/>
                                </div>
                            </div>
                            <div className="content-slider pl-10 pr-10">
                                <Swiper
                                    modules={[Navigation, Grid]}
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    grid={{ rows: 4, fill: "row" }}
                                    navigation={{
                                        prevEl: sidePrevRef.current,
                                        nextEl: sideNextRef.current,
                                    }}
                                    onBeforeInit={(swiper) => {
                                        if (typeof swiper.params.navigation !== "boolean") {
                                            if (swiper.params.navigation) {
                                                swiper.params.navigation.prevEl = prevRef.current;
                                                swiper.params.navigation.nextEl = nextRef.current;
                                            }

                                        }
                                    }}
                                    breakpoints={{
                                        0: { slidesPerView: 1, grid: { rows: 2 } },
                                        576: { slidesPerView: 1, grid: { rows: 3 } },
                                        992: { slidesPerView: 1, grid: { rows: 4 } },
                                    }}
                                    className="pt-5"
                                >
                                    {bestSellers.map((product) => (
                                        <SwiperSlide key={product.id}>
                                            <ProductCardStyle2 product={product} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        <div className="banner-right h-500 text-center mb-30"
                             style={{
                                 backgroundImage: `url(/images/homepage4/bg-topsell.png)`,
                                 backgroundRepeat: 'no-repeat',
                                 backgroundSize: 'cover',
                                 padding: '50px 10px',
                                 width: '100%'
                             }}>
                            <h5 className="font-23 mt-20">
                                Toucher sensible<br className="d-none d-lg-block"/>Sans empreinte digitale
                            </h5>
                            <p className="text-desc font-16 mt-15">Poignée lisse et clic précis</p>
                        </div>

                        <div className="box-slider-item box-sidebar">
                            <div className="head">
                                <h4 className="d-inline-block">Nouveaux produits</h4>
                                <div className="box-button-slider-normal">
                                    <div className="swiper-button-prev" ref={sidePrevRef}/>
                                    <div className="swiper-button-next" ref={sideNextRef}/>
                                </div>
                            </div>
                            <div className="content-slider pl-10 pr-10">
                                <Swiper
                                    modules={[Navigation, Grid]}
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    grid={{ rows: 4, fill: "row" }}
                                    navigation={{
                                        prevEl: sidePrevRef.current,
                                        nextEl: sideNextRef.current,
                                    }}
                                    onBeforeInit={(swiper) => {
                                        if (typeof swiper.params.navigation !== "boolean") {
                                            if (swiper.params.navigation) {
                                                swiper.params.navigation.prevEl = prevRef.current;
                                                swiper.params.navigation.nextEl = nextRef.current;
                                            }

                                        }
                                    }}
                                    breakpoints={{
                                        0: { slidesPerView: 1, grid: { rows: 2 } },
                                        576: { slidesPerView: 1, grid: { rows: 3 } },
                                        992: { slidesPerView: 1, grid: { rows: 4 } },
                                    }}
                                    className="pt-5"
                                >
                                    {bestSellers.map((product) => (
                                        <SwiperSlide key={product.id}>
                                            <ProductCardStyle2 product={product} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
