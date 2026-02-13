"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs ,Grid} from "swiper/modules";
import {Banner} from "../../../types/FrontType";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";



type Props = {
    images?: Banner[];
};

export default function ProductGalleryVertical({ images = [] }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    if (!images?.length) {
        return (
            <Image
                src="/placeholder.png"
                alt="No image"
                width={457}
                height={457}
            />
        );
    }

    return (
        <>
            {/* IMAGE PRINCIPALE */}
            <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                className="product-image-slider"
            >
                <div className="detail-gallery">
                    <label className="label">-17%</label>
                    <div className="product-image-slider-2">
                {images.map((img:Banner) => (
                    <SwiperSlide key={img.id}>
                        <div className="image-zoom-wrapper">
                            <Image
                                src={img.image?.thumb || '/images/default.png'}
                                alt={img.image?.alt || 'Product'}
                                width={457}
                                height={457}
                                unoptimized
                            />
                        </div>

                    </SwiperSlide>
                ))}
                    </div></div>
            </Swiper>

            {/* THUMBNAILS */}

            <div className="slider-nav-thumbnails-2">
            <Swiper
                modules={[FreeMode, Thumbs,Navigation]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                className="mt-3"
            >
                {images.map((img) => (
                    <div className="item-thumb">
                        <SwiperSlide key={img.id}>
                        <Image
                            src={img.image?.thumb || '/images/default.png'}
                            alt="thumbnail"
                            width={190}
                            height={90}
                            unoptimized
                        />
                    </SwiperSlide></div>
                ))}
            </Swiper>
                    </div>
        </>
    );
}
