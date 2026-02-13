import Link from "next/link"
import Image from "next/image"
import React from "react"

interface BannerBoxProps {
    categories?: Category[]
}
export type Category = {
    id: number
    name: string
    slug: string
    image?: string
    links?: string[] // sous-catégories si besoin
}



export function BannerBox({ categories = [] }: BannerBoxProps) {
    return (
        <div className="section-box">
            <div className="container">
                <div className="row mt-60">
                    {categories?.map((cat:Category) => (
                        <div key={cat.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                            <div className="card-grid-style-2 card-grid-style-2-small">

                                {/* IMAGE */}
                                <div className="image-box">
                                    <Link href={`/shop?category=${cat.slug}`}>
                                        <Image
                                            src={cat.image || "/images/default.png"} // image par défaut
                                            alt={cat.name}
                                            width={85}
                                            height={85}
                                            unoptimized
                                        />
                                    </Link>

                                    <div className="mt-10 text-center">
                                        <Link className="btn btn-gray" href={`/shop?category=${cat.slug}`}>
                                            View all
                                        </Link>
                                    </div>
                                </div>

                                {/* INFOS */}
                                <div className="info-right">
                                    <Link className="color-brand-3 font-sm-bold" href={`/shop?category=${cat.slug}`}>
                                        <h6>{cat.name}</h6>
                                    </Link>

                                    <ul className="list-links-disc">
                                        {cat.links?.map((linkName:string, idx:number) => (
                                            <li key={idx}>
                                                <Link className="font-sm" href={`/shop?category=${linkName.toLowerCase().replace(/\s+/g, "-")}`}>
                                                    {linkName}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
