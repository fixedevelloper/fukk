import { Product } from "../../../../../types/FrontType";
import { ProductShow } from "../../../../components/shop/ProductShow";
import React from "react";
import {notFound} from "next/navigation";

async function getProductBySlug(slug: string): Promise<Product | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
}

// Fonction pour générer le metadata dynamique
export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    console.log(product)
    if (!product) {
        return {
            title: "Produit introuvable",
            description: "Le produit que vous recherchez n'existe pas.",
            robots: { noindex: true },
        };
    }

    return {
        title: product?.name,
        description: product?.short_description || product?.description || "Découvrez ce produit dans notre boutique en ligne.",
        keywords: [
            product?.name,
            product?.brand?.name || "",
            ...(product?.categories?.map((c) => c.name) || []),
            "acheter en ligne",
            "boutique",
        ],
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/product-show/${product?.slug}`,
        },
        openGraph: {
            title: product?.name,
            description: product?.short_description || product?.description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/product-show/${product?.slug}`,
            siteName: "Boutique en ligne",
            type: "website",
            images: product?.image ? [{ url: product.image.thumb, width: 1200, height: 630, alt: product.name }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: product?.name,
            description: product?.short_description || product?.description,
            images: product?.image ? [product.image.thumb] : [],
        },
        robots: { index: true, follow: true },
    };
}

export default async function ProductShowPage({
                                                  params,
                                              }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);


     if (!product) {
      //  notFound(); // 👉 déclenche la page 404
    }

    return <ProductShow product={product} />;
}

