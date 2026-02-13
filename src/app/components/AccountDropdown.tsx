"use client";

import React, {useState} from "react";
import {useSession, signOut} from "next-auth/react";
import Link from "next/link";

export default function AccountDropdown() {
    const {data: session} = useSession();
    const [open, setOpen] = useState(false);

    return (
        <div className="d-inline-block box-dropdown-cart position-relative mr-5">
    <span
        className="font-lg icon-list icon-account cursor-pointer"
        onClick={() => {
            setOpen(!open)
            console.log(open)
        }}
    >
        <span>{session?.user?.name || "Compte"}</span>
    </span>

            {open && (
                <div className="dropdown-account block shadow-md mt-2 p-2 rounded dropdown-open">
                    <ul className="list-none p-0 m-0 show">
                        {session ? (
                            <>
                                <li>
                                    <Link href="/account" className="dropdown-item block px-2 py-1">
                                        Mon compte
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account/orders" className="dropdown-item block px-2 py-1">
                                        Suivi des commandes
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account/orders" className="dropdown-item block px-2 py-1">
                                        Mes commandes
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account/wishlist" className="dropdown-item block px-2 py-1">
                                        Ma liste de souhaits
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account/settings" className="dropdown-item block px-2 py-1">
                                        Paramètres
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item w-full text-left px-2 py-1"
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                    >
                                        Déconnexion
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href="/auth/login" className="dropdown-item block px-2 py-1">
                                    Se connecter
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>

    );
}
