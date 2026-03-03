import Link from "next/link"
import Image from "next/image"
import React from "react"
import {Category} from "../../types/FrontType";

interface BannerBoxProps {
    categories?: Category[]
}

export function BannerBox({ categories = [] }: BannerBoxProps) {
    return (
        <div className="section-box py-40">
            <div className="container">
                <div className="row g-4">
                    {categories?.map((cat: Category) => (
                        <div key={cat.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <div className="card-banner hover-card shadow-sm rounded overflow-hidden transition-all">

                                {/* IMAGE */}
                                <div className="image-box position-relative text-center p-20 bg-light">
                                    <Link href={`/shop?category=${cat.slug}`}>
                                        {cat.image?.thumb ? (
                                            <Image
                                                src={cat.image.thumb}
                                                alt={cat.name}
                                                width={100}
                                                height={100}
                                                className="mx-auto transition-all"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="placeholder-svg mx-auto" style={{ width: 100, height: 100 }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#ccc">
                                                    <circle cx="32" cy="32" r="32" />
                                                    <text x="32" y="37" textAnchor="middle" fontSize="16" fill="#fff">Cat</text>
                                                </svg>
                                            </div>
                                        )}
                                    </Link>

                                    <div className="mt-10">
                                        <Link className="btn btn-gray btn-sm" href={`/shop?category=${cat.slug}`}>
                                            Voir tout
                                        </Link>
                                    </div>
                                </div>

                                {/* INFOS */}
                                <div className="info-right p-3 text-center">
                                    <Link className="color-brand-3 font-sm-bold" href={`/shop?category=${cat.slug}`}>
                                        <h6 className="mb-1">{cat.name}</h6>
                                    </Link>
                                    {cat.description && (
                                        <p className="font-xs color-gray-500 mb-0">
                                            {cat.description.length > 60
                                                ? cat.description.substring(0, 60) + "..."
                                                : cat.description}
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
