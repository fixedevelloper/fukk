"use client"

import { useState } from "react"

export default function CurrencyDropdown() {
    const [currency, setCurrency] = useState("USD")
    const [open, setOpen] = useState(false)

    const currencies = ["USD", "EUR", "AUD", "SGP"]

    return (
        <div className="dropdown dropdown-language position-relative">
            <button
                className="btn dropdown-toggle"
                type="button"
                onClick={() => setOpen(!open)} // toggle le menu
            >
                <span className="dropdown-right font-xs color-brand-3">{currency}</span>
            </button>

            {open && (
                <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end show position-absolute">
                    {currencies.map((cur) => (
                        <li key={cur}>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    setCurrency(cur)
                                    setOpen(false) // fermer le menu
                                }}
                            >
                                {cur}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
