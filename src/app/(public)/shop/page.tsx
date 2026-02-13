import React from "react";
import ShopLayout from "../../components/shop/ShopLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Boutique – Tous les produits",
        template: "%s | Boutique en ligne",
    },
    description:
        "Parcourez notre boutique en ligne : tous les produits, accessoires et nouveautés disponibles. Livraison rapide et paiement sécurisé.",
    keywords: [
        "boutique en ligne",
        "produits",
        "accessoires",
        "acheter en ligne",
        "ecommerce",
        "meilleurs prix",
    ],
    alternates: {
        canonical: process.env.NEXT_PUBLIC_SITE_URL + "/shop",
    },
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: process.env.NEXT_PUBLIC_SITE_URL + "/shop",
        siteName: "Boutique en ligne",
        title: "Boutique – Tous les produits",
        description:
            "Découvrez tous les produits et nouveautés de notre boutique en ligne. Paiement sécurisé et livraison rapide.",
        images: [
            {
                url: "/images/seo/shop-og.jpg",
                width: 1200,
                height: 630,
                alt: "Boutique en ligne",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Boutique – Tous les produits",
        description:
            "Découvrez tous les produits et nouveautés de notre boutique en ligne.",
        images: ["/images/seo/shop-og.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ShopPage() {
    return <ShopLayout />;
}
