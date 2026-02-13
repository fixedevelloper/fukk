// app/contact/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contactez-nous | Ecom",
    description:
        "Contactez l’équipe Ecom pour toute question, assistance ou partenariat. Nous sommes à votre écoute.",
    keywords: [
        "contact",
        "support client",
        "ecommerce",
        "ecom",
        "service client",
        "assistance",
    ],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Contactez-nous | Ecom",
        description:
            "Besoin d’aide ? Contactez l’équipe Ecom par formulaire, email ou téléphone.",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
        siteName: "Ecom",
        locale: "fr_FR",
        type: "website",
    },
};
