// app/contact/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contactez-nous | FinduKarko",
    description:
        "Contactez l’équipe FinduKarko pour toute question, assistance ou partenariat. Nous sommes à votre écoute.",
    keywords: [
        "contact",
        "support client",
        "ecommerce",
        "FinduKarko",
        "service client",
        "assistance",
    ],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Contactez-nous | FinduKarko",
        description:
            "Besoin d’aide ? Contactez l’équipe FinduKarko par formulaire, email ou téléphone.",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
        siteName: "FinduKarko",
        locale: "fr_FR",
        type: "website",
    },
};
