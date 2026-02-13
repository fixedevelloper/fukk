"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import Image from "next/image"
import React, { useRef } from "react"

import "swiper/css"
import "swiper/css/navigation"

type BlogPost = {
    id: number
    title: string
    category: string
    image: string
    date: string
    readTime: string
    link?: string
}

export function HomeBlog({ posts }: { posts: BlogPost[] }) {
    const prevRef = useRef<HTMLDivElement>(null)
    const nextRef = useRef<HTMLDivElement>(null)

    return (
        <section className="section-box mt-50">
            <div className="container">
                <div className="head-main">
                    <h3 className="mb-5">Latest News &amp; Events</h3>
                    <p className="font-base color-gray-500">From our blog, forum</p>
              {/*      <div className="box-button-slider-normal">
                        <div className="swiper-button-prev" ref={prevRef}/>
                        <div className="swiper-button-next" ref={nextRef}/>
                    </div>*/}

                </div>
            </div>

            <div className="container mt-10">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current
                        swiper.navigation.init()
                        swiper.navigation.update()
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }}
                >
                    {posts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <div className="card-grid-style-1">
                                <div className="image-box">
                                    <a href={post.link || "#"}>
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            width={400}
                                            height={250}
                                            className="w-100 h-auto"
                                        />
                                    </a>
                                </div>

                                <a className="tag-dot font-xs" href="#">
                                    {post.category}
                                </a>

                                <a className="color-gray-1100" href={post.link || "#"}>
                                    <h4>{post.title}</h4>
                                </a>

                                <div className="mt-20">
                  <span className="color-gray-500 font-xs mr-30">
                    {post.date}
                  </span>
                                    <span className="color-gray-500 font-xs">
                    {post.readTime} <span>Mins read</span>
                  </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
