
import { Metadata } from "next";
import React from "react";
import ProductByTypeClient from "../productByTypeClient";

type Props = {
    params: Promise<{ type: string }>;
    searchParams: Promise<{ page?: string; per_page?: string }>;
};

export async function generateMetadata(
    props: Props
): Promise<Metadata> {
    const { params } = props;
    const { type } = await params;

    const decodedType = decodeURIComponent(type);

    return {
        title: `${decodedType} – Produits disponibles | Votre Boutique`,
        description: `Découvrez notre sélection de produits ${decodedType}. Qualité, meilleurs prix et livraison rapide.`,
        keywords: [
            type,
            "boutique en ligne",
            "produits",
            "acheter",
            "e-commerce",
        ],
        openGraph: {
            title: `${type} – Produits disponibles`,
            description: `Achetez les meilleurs produits ${decodedType} au meilleur prix.`,
            type: "website",
        },
    };
}

export default async function Page(props: Props) {
    const { params, searchParams } = props;

    const { type } = await params;
    const sp = await searchParams;

    return (
        <ProductByTypeClient
            type={type}
            page={Number(sp.page ?? 1)}
            perPage={Number(sp.per_page ?? 16)}
        />
    );
}
