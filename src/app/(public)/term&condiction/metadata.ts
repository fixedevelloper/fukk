// app/terms-and-conditions/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conditions Générales d’Utilisation | FinKarko",
    description:
        "Consultez les conditions générales d’utilisation et la politique de confidentialité de la plateforme Ecom.",
    keywords: [
        "conditions générales",
        "politique de confidentialité",
        "ecommerce",
        "FinduKarko",
        "données personnelles",
        "cookies",
    ],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Conditions Générales d’Utilisation | FinKarko",
        description:
            "Découvrez les règles, droits et obligations liés à l’utilisation de la plateforme FinKarko.",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms-and-conditions`,
        siteName: "FinduKarko",
        locale: "fr_FR",
        type: "article",
    },
};
