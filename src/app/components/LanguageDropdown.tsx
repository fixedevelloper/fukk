"use client"

import Image from "next/image"
import { useState } from "react"


export default function LanguageDropdown() {
    const [lang, setLang] = useState({
        code: "en",
        label: "English",
        flag: "/imgs/template/flag-en.svg",
    })
    const [open, setOpen] = useState(false)

    const languages = [
        { code: "en", label: "English", flag: "/imgs/template/flag-en.svg" },
        { code: "fr", label: "Français", flag: "/imgs/template/flag-fr.svg" },
        { code: "es", label: "Español", flag: "/imgs/template/flag-es.svg" },
        { code: "pt", label: "Português", flag: "/imgs/template/flag-pt.svg" },
    ]

    return (
        <div className="dropdown dropdown-language">
            <button
                className="btn dropdown-toggle"
                id="dropdownLanguage"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-display="static"
                onClick={() => setOpen(!open)}
            >
                <Image src={lang.flag} alt={lang.label} width={20} height={14} />
                <span className="dropdown-right font-xs color-brand-3"> {lang.label}</span>

            </button>

            {open && (
                <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end show position-absolute">
                    {languages.map((l) => (
                        <li key={l.code}>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    setLang(l)
                                    setOpen(false)
                                }}
                            >
                                <Image src={l.flag} alt={l.label} width={20} height={14} />
                                {l.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

