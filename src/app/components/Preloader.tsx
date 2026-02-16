"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
export default function Preloader() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // On cache le preloader après 2 secondes (ou quand la page est prête)
        const timer = setTimeout(() => setLoading(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    if (!loading) return null

    return (
        <div id="preloader-active">
            <div className="preloader d-flex align-items-center justify-content-center">
                <div className="preloader-inner position-relative">
                    <div className="text-center">
                        <Image
                            className="mb-10"
                            src='/images/theme/favicon.svg'
                            alt="FinduKarko"
                            width={50}
                            height={50}
                        />
                        <div className="preloader-dots"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
