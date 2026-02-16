import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import AppProvidersWrapper from "../providers/AppProvidersWrapper";
import QuickViewModal from "./components/shop/QuickViewModal";

export const metadata: Metadata = {
  title: {
    default: "FinduKarko - Marketplace au Cameroun",
    template: "%s | FinduKarko",
  },
  description:
      "FinduKarko est une marketplace au Cameroun pour acheter en ligne des produits de qualité : électronique, mode, maison, et bien plus encore.",

  keywords: [
    "FinduKarko",
    "Marketplace Cameroun",
    "Boutique en ligne Cameroun",
    "E-commerce Cameroun",
    "Acheter en ligne",
    "Produits pas chers Cameroun",
  ],

  authors: [{ name: "FinduKarko" }],
  creator: "FinduKarko",
  publisher: "FinduKarko",

  openGraph: {
    title: "FinduKarko - Marketplace au Cameroun",
    description:
        "Achetez en ligne au Cameroun sur FinduKarko. Livraison rapide, paiement sécurisé et large choix de produits.",
    url: "https://FinduKarko.com",
    siteName: "FinduKarko",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FinduKarko Marketplace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FinduKarko - Marketplace au Cameroun",
    description:
        "Découvrez FinduKarko, votre marketplace au Cameroun.",
    images: ["/images/og-image.jpg"],
  },

  icons: {
    icon: "/images/theme/favicon.svg",
    shortcut: "/images/theme/favicon.svg",
    apple: "/images/theme/favicon.svg",
  },

  metadataBase: new URL("https://findukarko.com"),
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="fr">
      <body id="modal-ts">
      <AppProvidersWrapper>
        {children}
      </AppProvidersWrapper>
      <QuickViewModal />
      </body>
      </html>
  );
}

