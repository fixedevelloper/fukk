import React, {useEffect, useState} from "react";
import {Category, Product, ResponsePaginate} from "../../types/FrontType";
import Link from "next/link";

export function MenuHeader() {
    const [categories, setCategories] = useState<Category[]>([])
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/categories/menus`
        )
            .then((res) => res.json())
            .then((data: ResponsePaginate<Category>) => {
                setCategories(data.data || []);
            });
    }, []);
    return (
        <nav className="nav-main-menu d-none d-xl-block">
            <ul className="main-menu">
                {categories.map((cat, idx) => (
                <li className="has-children"><a className="active" href="index.html">{cat.name}</a>
                    {cat.children && activeIndex === idx && (
                    <ul className="sub-menu two-col">
                        {cat.children.map((sub, subIdx) => (
                        <li><Link href="/">{sub.name}</Link></li>
                        ))}
                    </ul>
                    )}
                </li>
                ))}
                <li><Link href="page-contact">Contactez Nous</Link></li>
            </ul>
        </nav>
    )

}