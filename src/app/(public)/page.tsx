import React from "react";
import HomeSlider from "../components/slider/HomeSlider";
import VerticalPromotionSlider from "../components/slider/VerticalPromotionSlider";
import BrandSlider from "../components/slider/BrandSlider";
import ProductTabs from "../components/ProductTabs";
import ProductTrending from "../components/ProductTrending";
import {CallToAction} from "../components/CallToAction";
import {CallToAction2} from "../components/CallToAction2";

import ProductTops from "../components/ProductTop";
import Link from "next/link";
import {BannerBox, Category} from "../components/BannerBox";
import { Suspense } from "react";
import {ResponsePaginate, Slider} from "../../types/FrontType";

import type { Metadata } from "next";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Boutique en ligne – Achetez au meilleur prix",
    template: "%s | Boutique en ligne",
  },
  description:
      "Découvrez notre boutique en ligne : produits high-tech, accessoires, nouveautés et meilleures offres. Livraison rapide et paiement sécurisé.",
  keywords: [
    "boutique en ligne",
    "ecommerce",
    "produits high tech",
    "acheter en ligne",
    "meilleurs prix",
    "livraison rapide",
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Boutique en ligne",
    title: "Boutique en ligne – Achetez au meilleur prix",
    description:
        "Achetez en ligne les meilleurs produits high-tech, accessoires et nouveautés. Paiement sécurisé et livraison rapide.",
    images: [
      {
        url: "/images/seo/home-og.jpg",
        width: 1200,
        height: 630,
        alt: "Boutique en ligne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boutique en ligne – Achetez au meilleur prix",
    description:
        "Produits high-tech, accessoires et nouveautés disponibles maintenant.",
    images: ["/images/seo/home-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function getSliders(): Promise<ResponsePaginate<Slider> | null> {
  try {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/app-sliders?type=home_slider`,
        { cache: "no-store" }
    );

    if (!res.ok) return null;

    return await res.json() as ResponsePaginate<Slider>;
  } catch (error) {
    console.error("Failed to fetch sliders:", error);
    return null;
  }
}


async function getBannerCategories(): Promise<Category[]> {
  const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/banners`,
  );

  if (!res.ok) return [];
  return res.json();
}
export default async function Home() {
  const slidersResponse = await getSliders();

  if (!slidersResponse?.data) {
    return null; // ou skeleton loader
  }
  const bannerCategories = await getBannerCategories();
  return (
      <div>
        <section className="section-box">
          <div className="banner-hero banner-1 pt-10">
            <div className="container">
              <div className="row">
                <div className="col-xl-7 col-lg-12 col-md-12 mb-30">
                  <Suspense fallback={<div className="h-[400px] bg-gray-100" />}>
                  <HomeSlider sliders={slidersResponse.data}/>
                  </Suspense>

                </div>
                <div className="col-xl-5 col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-xl-7 col-lg-9 col-md-8 col-sm-12 mb-30">
                      <div className="bg-metaverse bg-22 pt-25 mb-20 pl-20 h-175"   style={{
                        backgroundImage: `url(/images/homepage4/promo/Strategies.gif)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: '100%'
                      }}>

                      </div>
                      <Link className="" href="/shop"> <div className="bg-4 box-bdrd-4 bg-headphone pt-20 mh-307"
                           style={{
                             backgroundImage: `url(/images/homepage4/promo/NOUVEAUTES.gif)`,
                             backgroundRepeat: 'no-repeat',
                             backgroundPosition: 'center',
                             backgroundSize: '100%'
                           }}>

                      </div></Link>
                    </div>
                    <div className="col-xl-5 col-lg-3 col-md-4 col-sm-12">
                      <div className="box-promotions">

                        <VerticalPromotionSlider/>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <BrandSlider/>
        <BannerBox categories={bannerCategories}/>
        <section className="section-box mt-30">
          <div className="container">

            <ProductTabs/>

          </div>
        </section>
        <ProductTrending/>
        <CallToAction/>
        <ProductTops/>
        <CallToAction2/>
      </div>
  );
}
