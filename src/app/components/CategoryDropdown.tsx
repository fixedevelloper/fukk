"use client"

import React, { useState } from "react"
import Image from "next/dist/client/legacy/image";
import Link from "next/link";
import {Category} from "../../types/FrontType";



export default function CategoryDropdown({ categories }: { categories: Category[] }) {
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const toggleDropdown = () => setOpen(prev => !prev)
    const toggleSubMenu = (index: number) =>
        setActiveIndex(prev => (prev === index ? null : index))
    const DEFAULT_CATEGORY_ICON = "/images/template/monitor.svg"

    return (
        <div className="dropdown d-inline-block">
            {/* Bouton principal */}
            <button
                className="btn dropdown-toggle btn-category"
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={toggleDropdown}
            >
        <span className="dropdown-right font-sm-bold color-white">
            Shop By Categories
        </span>
            </button>

            {/* Menu déroulant */}
            {open && (
                <div className="sidebar-left dropdown-menu dropdown-menu-light show">
                    <ul className="menu-texts menu-close">
                        {categories.map((cat:Category, idx:number) => (
                            <li key={idx} className={(cat.children?.length ?? 0) > 0 ? "has-children" : ""}>
                                <Link
                                    href={cat.slug ? `/shop?category=${cat.slug}` : "#"}
                                    onClick={e => {
                                        // Si la catégorie a des enfants, on ouvre le sous-menu
                                        if ((cat.children?.length ?? 0) > 0) {
                                            e.preventDefault();
                                            toggleSubMenu(idx);
                                        }
                                    }}
                                    className={activeIndex === idx ? "active" : ""}
                                >
                            <span className="img-link">
                                <Image
                                    src={cat.image?.thumb || DEFAULT_CATEGORY_ICON}
                                    alt={cat.name|| "Produit"}
                                    width={24}
                                    height={24}
                                />
                            </span>
                                    <span className="text-link">{cat.name}</span>
                                </Link>

                                {/* Sous-menu */}
                                {(cat.children?.length ?? 0) > 0 && activeIndex === idx && (
                                    <ul className="sub-menu">
                                        {cat.children?.map((sub:Category, subIdx:number) => (
                                            <li key={subIdx}>
                                                <Link
                                                    href={sub.slug ? `/shop?category=${sub.slug}` : "#"}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    )
}
