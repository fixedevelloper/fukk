"use client";

import React, { useEffect, useState } from "react"

export function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) { // apparait après 300px de scroll
                setVisible(true)
            } else {
                setVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // équivalent à scrollSpeed + easingType
        })
    }

    return (
        <>
            {visible && (

                <button
                    onClick={scrollToTop}
                    className="scroll-up-btn"
                    style={{
                        position: "fixed",
                        bottom: "40px",
                        right: "40px",
                        zIndex: 999,
                        background: "#000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        opacity: 0.7,
                    }}
                    aria-label="Scroll to top"
                >
                    <i className="fi-rr-arrow-small-up"/>
                </button>
            )}
        </>
    )
}
