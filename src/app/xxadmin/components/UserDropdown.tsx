"use client";
import { useState, useRef, useEffect } from "react";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {enqueueSnackbar} from "notistack";

export default function UserDropdown() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLLIElement>(null);
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        enqueueSnackbar("Déconnexion réussie", { variant: "success" });
        window.location.href = "/auth-vendor/signin";

    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <li className="nav-item dropdown" ref={ref}>
            <button
                className="btn btn-icon"
                onClick={() => setOpen(!open)}
            >
                <img
                    className="img-xs rounded-circle"
                    src="/images/people/avatar2.jpg"
                    alt="User"
                />
            </button>

            {open && (
                <ul className="dropdown-menu dropdown-menu-end show">
                    <li>
                        <button className="dropdown-item">
                            <span className="material-symbols-rounded">perm_identity</span>
                            Profile
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item">
                            <span className="material-symbols-rounded">settings</span>
                            Settings
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="dropdown-item text-danger"
                            type="button"
                        >
                            <span className="material-symbols-rounded">exit_to_app</span>
                            Logout
                        </button>
                    </li>

                </ul>
            )}
        </li>
    );
}
