"use client"
import CategoryDropdown from "./CategoryDropdown";
import AccountDropdown from "./AccountDropdown";
import CartDropdown from "./CartDropdown";
import React, {useEffect, useMemo, useState} from "react";
import WishlistLink from "./WishlistLink";
import Link from "next/link";
import logo from "@/styles/front/imgs/template/logo.svg";
import Image from "next/image";
import {Category, ResponsePaginate} from "../../types/FrontType";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function Header () {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState<Category[]>([])
    const [mobileOpen, setMobileOpen] = useState(false)
    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/mega-menu-categories`
        )
            .then((res) => res.json())
            .then((data: ResponsePaginate<Category>) => {
                setCategories(data.data || []);
            });
    }, []);
    const rootCategories = useMemo(() => {
        return categories.filter(cat => !cat.parent_id || cat.parent_id === 0)
    }, [categories])

    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY
            if (scroll < 200) {
                setIsSticky(false)
            } else {
                setIsSticky(true)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])
    return (
        <>

            <div className="topbar top-gray-1000">
                <div className="container-topbar">
                    <div className="menu-topbar-left d-none d-xl-block">
                        <ul className="nav-small">
                            <li><Link className="font-xs" href="/about-us">À propos de nous</Link></li>
                            <li><Link className="font-xs" href="/careers">Carrières</Link></li>
                            <li><Link className="font-xs" href="/auth-vendor/create-store">Ouvrir une boutique</Link></li>
                        </ul>
                    </div>
                    <div className="info-topbar text-center d-none d-xl-block">
                        <span className="font-xs color-brand-3">Livraison gratuite pour toutes les commandes supérieures à</span>
                        <span className="font-sm-bold color-success">100000.00 FCFA</span>
                    </div>
                    <div className="menu-topbar-right">
                        <span className="font-xs color-brand-3">Besoin d'aide ? Appelez-nous :</span>
                        <span className="font-sm-bold color-success">237 657 28 50 50</span>
                        {/* <LanguageDropdown />
                    <CurrencyDropdown /> */}
                    </div>
                </div>
            </div>

            <header className={` header header-container sticky-bar ${isSticky ? "stick" : ""}`}>
                <div className="container">
                    <div className="main-header">
                        <div className="header-left">
                            <div className="header-logo">
                                <Link href="/">
                                    <Image src='/images/theme/logo.webp' alt="FindKarko" width={150} height={50} />
                                </Link>
                            </div>
                            <div className="header-search">
                                <div className="box-header-search">
                                    <form className="form-search" method="post" action="#">
                                        <div className="box-keysearch">
                                            <input className="form-control font-xs"
                                                   type="text"
                                                   value={search}
                                                   placeholder="Que cherches-tu aujourd’hui ?"
                                                   onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="header-nav text-start">
                                <nav className="nav-main-menu d-none d-xl-block">
                                    <ul className="main-menu">
                                        <li><Link className="active" href="/shop/type/offre-flash">Offres Flash</Link></li>
                                        <li><Link href="/shop/type/offre-special">Spécial</Link></li>
                                        <li><Link href="/shop/type/best-seller">Meilleures ventes</Link></li>
                                    </ul>
                                </nav>
                                <div className="burger-icon burger-icon-white"  onClick={() => setMobileOpen(true)}>
                                    <span className="burger-icon-top"/>
                                    <span className="burger-icon-mid"/>
                                    <span className="burger-icon-bottom"/>
                                </div>

                            </div>
                            <div className="header-shop">
                                <AccountDropdown />
                                <WishlistLink />
                                <CartDropdown />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="container">
                        <CategoryDropdown categories={rootCategories} />

                        <div className="header-nav d-inline-block  d-none d-xl-block">
                            <MegaMenu categories={rootCategories} />

                        </div>
                        <div className="discount font-16 font-bold d-none d-xl-block">OFFRE SPÉCIALE</div>
                        <div className="header-search-mobile d-block d-xl-none">
                            <div className="box-header-search">
                                <form className="form-search" method="post" action="#">
                                    <div className="box-keysearch">
                                        <input className="form-control font-xl"
                                               type="text"
                                               value={search}
                                               placeholder="Que cherches-tu aujourd’hui ?"
                                               onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* MOBILE MENU */}
            <MobileMenu
                categories={rootCategories}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

        </>

    )
}