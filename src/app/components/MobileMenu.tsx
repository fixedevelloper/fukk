"use client"

import React, {useEffect, useState} from "react"
import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import logo from "@/styles/front/imgs/template/logo.svg";
import {Category, ResponsePaginate} from "../../types/FrontType";

interface MobileMenuProps {
    categories: Category[]
    mobileOpen: boolean
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileMenu({
                                       categories,
                                       mobileOpen,
                                       setMobileOpen,
                                   }: MobileMenuProps) {

    const { data: session } = useSession()
    const [openSub, setOpenSub] = useState<string | null>(null)

    const toggleSub = (key: string) => {
        setOpenSub(openSub === key ? null : key)
    }

    return (
        <div className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>

            <div className="mobile-header-wrapper-inner">
                <div className="mobile-header-content-area">
                <div className="mobile-logo">
                    <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                    >
                        <Image src='/images/theme/logo.webp' alt="FindKarko" width={150} height={50} />
                    </Link>
                </div>

                <div className="burger-icon burger-icon-white burger-close"  onClick={() => setMobileOpen(false)}>
                    <span className="burger-icon-top">
                    </span><span className="burger-icon-mid"/>
                    <span className="burger-icon-bottom"/>
                </div>
            </div>
                <div className="mobile-menu-wrap mobile-header-border">
            <nav className="mobile-nav mt-15" >
                <ul className='mobile-menu font-heading'>
                    {categories.map((cat) => (
                        <li
                            key={cat.id}
                            className={`has-children ${
                                openSub === cat.slug ? "open" : ""
                            }`}
                        >
                            <button
                                className="accordion-toggle"
                                onClick={() => toggleSub(cat.slug)}
                            >
                                {cat.name}
                                <span className="arrow" />
                            </button>

                            {cat.children && cat.children.length > 0 && (

                                <ul
                                    className={`sub-menu ${
                                        openSub === cat.slug ? "active" : ""
                                    }`}
                                >
                                    {cat.children?.map((sub) => (
                                        <li key={sub.id}>
                                            <Link
                                                href={`/shop?category=${sub.slug}`}
                                                onClick={() => {
                                                    setMobileOpen(false)
                                                    setOpenSub(null)
                                                }}
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
            </nav>
                </div>
                {/* ACCOUNT */}
                <div className="mobile-account">
                    {session ? (
                        <>
                            <div className="mobile-header-top">
                                <div className="user-account">
                                    <Image
                                        src="/images/template/ava_1.png"
                                        alt="Utilisateur"
                                        width={40}
                                        height={40}
                                    />
                                    <div className="content">
                                        <h6 className="user-name">
                                            Bonjour <span className="text-brand">{session.user?.name}</span>
                                        </h6>
                                        <p className="font-xs text-muted">
                                            {session.user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <ul className="mobile-menu">
                                <li><Link href="/account">Mon compte</Link></li>
                                <li><Link href="/account?tab=orders">Mes commandes</Link></li>
                                <li><Link href="/shop/shop-wishlist">Ma liste de souhaits</Link></li>
                                <li><Link href="/account?tab=settings">Paramètres</Link></li>
                                <li>
                                    <button
                                        className="btn btn-link p-0"
                                        onClick={() => signOut()}
                                    >
                                        Déconnexion
                                    </button>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <ul className="mobile-menu">
                            <li><Link href="/login">Se connecter</Link></li>
                            <li><Link href="/register">S’inscrire</Link></li>
                        </ul>
                    )}
                </div>

                {/* BANNER */}
                <div className="mobile-banner">
                    <div className="bg-5 block-iphone">
                            <span className="color-brand-3 font-sm-lh32">
                                À partir de 899 $
                            </span>
                        <h3 className="font-xl mb-10">
                            iPhone 12 Pro 128Gb
                        </h3>
                        <p className="font-base color-brand-3 mb-10">
                            Vente spéciale
                        </p>
                        <Link className="btn btn-arrow" href="/shop">
                            En savoir plus
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}


