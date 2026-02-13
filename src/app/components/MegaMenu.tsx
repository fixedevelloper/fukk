"use client";

import Link from "next/link";
import React from "react";
import {Category} from "../../types/FrontType";
import Image from "next/image";

interface MegaMenuProps {
    categories: Category[]
}

export default function MegaMenu({ categories }: MegaMenuProps) {
    return (
        <nav className="mega-menu nav-main-menu d-none d-xl-block">
            <ul className="mega-root">
                {categories.map((cat) => (
                    <li className="mega-item" key={cat.id}>
                        <Link
                            href={`/shop?category=${cat.slug}`}
                            className="mega-link"
                        >
                            {cat.image && (
                                <img
                                    src={cat.image.thumb}
                                    alt={cat.name}
                                    className="mega-icon"
                                />
                            )}

                            <span>{cat.name}</span>
                        </Link>

                        {cat.children?.length > 0 && (
                            <div className="mega-dropdown">
                                <div className="mega-content">

                                    {cat.children?.slice(0, 3).map((sub) => (
                                        <div
                                            className="mega-column"
                                            key={sub.id}
                                        >
                                            <h4>
                                                <Link
                                                    href={`/shop?category=${sub.slug}`}
                                                >
                                                    {sub.name}
                                                </Link>
                                            </h4>

                                            <ul>
                                                {sub.children?.map((child) => (
                                                    <li key={child.id}>
                                                        <Link
                                                            href={`/shop?category=${child.slug}`}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}

                                    <div className="mega-banner">
                                        <Image
                                            src={cat.image?.url ?? "/promo.jpg"}
                                            alt={cat.name}
                                            width={300}
                                            height={250}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                            }}
                                        />
                                    </div>

                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

