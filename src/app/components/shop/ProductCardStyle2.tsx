"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import {useQuickViewStore} from "../../../store/useQuickViewStore";
import Link from "next/link";
import Image from "next/image";
import {Product} from "../../../types/FrontType";


type Props = {
    product: Product;
};

export default function ProductCardStyle2({ product }: Props) {
    const addWishlist = useWishlistStore((s) => s.addItem);
    const addCart = useCartStore((s) => s.addItem);
    const openModal = useQuickViewStore((s) => s.openModal);


    return (
        <div
            className="card-grid-style-2 card-grid-none-border border-bottom mb-10">
            <div className="image-box"><span
                className="label bg-brand-2">-17%</span>
                <Link  href={'/shop/product-show/'+product.slug}>
                    <Image
                        src={product.image?.thumb || "/front/imgs/page/homepage1/imgsp5.png"}
                        alt={product.image?.alt || 'product'}
                        width={100}
                        height={100}
                        unoptimized
                    />
                </Link>
            </div>
            <div className="info-right">
                <Link className="color-brand-3 font-xs-bold"
                      href={'shop/product-show/'+product.slug} >{product.name}</Link>
                <div className="rating">
                    {[...Array(5)].map((_, i) => (
                        <img key={i} src="/images/template/icons/star.svg"
                             alt="star"/>
                    ))}
                </div>
                <div className="price-info">
                    <strong
                        className="color-brand-3 price-main">{product.price}</strong>
                </div>
            </div>
        </div>
    );
}
