"use client";

import Image from "next/image"
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import {useQuickViewStore} from "../../../store/useQuickViewStore";
import Link from "next/link";
import {Product} from "../../../types/FrontType";


type Props = {
    product: Product;
};

export default function ProductCardTop({ product }: Props) {
    const addWishlist = useWishlistStore((s) => s.addItem);
    const addCart = useCartStore((s) => s.addItem);
    const openModal = useQuickViewStore((s) => s.openModal);

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-30">
            <div className="card-grid-style-2">
                <div className="image-box">
                    <Link href={'/shop/product-show/' + product.id}>
                        <Image
                            src={product.image?.src || "/front/imgs/page/homepage1/imgsp1.png"}
                            alt={product.name}
                            width={300}
                            height={300}
                            unoptimized
                            className="w-100 h-auto"
                        />
                    </Link>
                </div>

                <div className="info-right">
                    <span className="font-xs color-gray-500">
                        {typeof product.brand === "object" ? product.brand?.name : "BRAND"}
                    </span>
                    <br />

                    <Link href={'shop/product-show/' + product.slug}>
                        <h6 className="color-brand-3 font-sm-bold">{product.name}</h6>
                    </Link>

                    <div className="rating">
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src="/images/template/icons/star.svg" alt="star" />
                        ))}
                        <span className="font-xs color-gray-500">(65)</span>
                    </div>

                    <div className="price-info">
                        <strong className="font-lg-bold color-brand-3 price-main">
                            ${product.price ?? 0}
                        </strong>
                        {product.sale_price && (
                            <span className="color-gray-500 price-line">
                                ${product.sale_price}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

