"use client";
import Pagination from "./shop/Pagination";
import React, {useEffect, useState} from "react";
import {usePaginationStore} from "../../store/pagination.store";
import {Product, ResponsePaginate, Store} from "../../types/FrontType";
import ProductCard from "./shop/ProductCard";
import star from "@/styles/front/imgs/template/icons/star.svg";
import delivery from "@/styles/front/imgs/page/product/delivery.svg";
import returnIcon from "@/styles/front/imgs/page/product/return.svg";
import support from "@/styles/front/imgs/page/product/support.svg";
import payment from "@/styles/front/imgs/page/product/payment.svg";
import Image from "next/image";
import Link from "next/link";
type Props = {
    store: Store;
};
export function VendorLayout({ store }: Props) {

    const { page, perPage, setTotalPages } = usePaginationStore();
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/stores/products/${store.id}?page=${page}`
        )
            .then((res) => res.json())
            .then((data: ResponsePaginate<Product>) => {
                setProducts(data.data || []);
                setTotalPages(data.meta.last_page); // OK maintenant
            });
    }, [page, store.id]);

    return (
        <>
            <div className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><a className="font-xs color-gray-1000" href="/l">Accueil</a></li>
                            <li><Link className="font-xs color-gray-500" href="/stores">{store.name}</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="section-box shop-template mt-30">
                <div className="container">
                    <div className="d-flex box-banner-vendor">
                        <div className="vendor-left">
                            <div className="banner-vendor">
                                {store.cover_image && (
                                    <Image
                                        src={store?.cover_image.thumb|| '/images/default.png'}
                                        alt="Ecom"
                                        fill
                            /*            width={1290}
                                        height={260}*/
                                        className="object-cover"
                                    />
                                )}

                                <div className="d-flex box-info-vendor">
                                    <div className="avarta">
                                        {store.logo && (
                                            <Image
                                                src={store?.logo.thumb || '/images/default.png'}
                                                alt={store.name}
                                                width={80}
                                                height={80}
                                                className="mb-5"
                                            />
                                        )}

                                        <Link
                                            className="btn btn-buy font-xs"
                                            href="shop"
                                        >
                                            {products.length} produits
                                        </Link>
                                    </div>

                                    <div className="info-vendor">
                                        <h4 className="mb-5">{store.name}</h4>
                                        <span className="font-xs color-gray-500 mr-20">
                                    Membre depuis {store.created_at}
                                </span>
                                        <div className="rating d-inline-block">
                                            <Image src={star} alt="Ecom" />
                                            <span className="font-xs color-gray-500"> (65)</span>
                                        </div>
                                    </div>

                                    <div className="vendor-contact">
                                        <div className="row">
                                            <div className="col-xl-7 col-lg-12">
                                                <div className="d-inline-block font-md color-gray-500 location mb-10">
                                                    {store.address}
                                                </div>
                                            </div>
                                            <div className="col-xl-5 col-lg-12">
                                                <div className="d-inline-block font-md color-gray-500 phone">
                                                    (+91) - 540-025-124553<br />
                                                    (+91) - 540-025-235688
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="vendor-right">
                            <div className="box-featured-product">
                                <div className="item-featured">
                                    <div className="featured-icon">
                                        <img src={delivery} alt="Ecom" />
                                    </div>
                                    <div className="featured-info">
                                        <span className="font-sm-bold color-gray-1000">Livraison gratuite</span>
                                        <p className="font-sm color-gray-500 font-medium">Pour toutes commandes  superieur 50000</p>
                                    </div>
                                </div>

                                <div className="item-featured">
                                    <div className="featured-icon">
                                        <Image src={support} alt="Ecom" width={100} height={100} />
                                    </div>
                                    <div className="featured-info">
                                        <span className="font-sm-bold color-gray-1000">Support 24/7</span>
                                        <p className="font-sm color-gray-500 font-medium">Achetez avec un expert</p>
                                    </div>
                                </div>

                                <div className="item-featured">
                                    <div className="featured-icon">
                                        <Image src={returnIcon} alt="Ecom" />
                                    </div>
                                    <div className="featured-info">
                                        <span className="font-sm-bold color-gray-1000">Retour & remboursement</span>
                                        <p className="font-sm color-gray-500 font-medium">Retour gratuit partir 40000</p>
                                    </div>
                                </div>

                                <div className="item-featured">
                                    <div className="featured-icon">
                                        <Image src={payment} alt="Ecom" />
                                    </div>
                                    <div className="featured-info">
                                        <span className="font-sm-bold color-gray-1000">Paiement sécurisé</span>
                                        <p className="font-sm color-gray-500 font-medium">100% Protégé</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-bottom mb-20 border-vendor" />

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="box-filters mt-0 pb-5 border-bottom">
                                <div className="row">
                                    <div className="col-xl-2 col-lg-3 mb-10 text-lg-start text-center">
                                        <a className="btn btn-filter font-sm color-brand-3 font-medium" href="#ModalFiltersForm" data-bs-toggle="modal">
                                            Tous les filtres
                                        </a>
                                    </div>

                                    <div className="col-xl-10 col-lg-9 mb-10 text-lg-end text-center">
                                <span className="font-sm color-gray-900 font-medium border-1-right span">
                                    Affichage 1–16 sur 17 résultats
                                </span>

                                        <div className="d-inline-block">
                                            <span className="font-sm color-gray-500 font-medium">Trier par :</span>
                                            <div className="dropdown dropdown-sort border-1-right">
                                                <button className="btn dropdown-toggle font-sm color-gray-900 font-medium" id="dropdownSort"
                                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Derniers produits
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownSort">
                                                    <li><a className="dropdown-item active" href="#">Derniers produits</a></li>
                                                    <li><a className="dropdown-item" href="#">Plus anciens</a></li>
                                                    <li><a className="dropdown-item" href="#">Commentaires</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="d-inline-block">
                                            <span className="font-sm color-gray-500 font-medium">Afficher :</span>
                                            <div className="dropdown dropdown-sort border-1-right">
                                                <button className="btn dropdown-toggle font-sm color-gray-900 font-medium" id="dropdownSort2" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                                                    <span>30 articles</span>
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownSort2">
                                                    <li><a className="dropdown-item active" href="#">30 articles</a></li>
                                                    <li><a className="dropdown-item" href="#">50 articles</a></li>
                                                    <li><a className="dropdown-item" href="#">100 articles</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="d-inline-block">
                                            <Link className="view-type-grid mr-5 active" href="shop" />
                                            <Link className="view-type-list" href="/stores" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-products-5 mt-20">
                                {products.map((product: Product) => (
                                    <ProductCard product={product} key={product.id} />
                                ))}
                            </div>

                            <Pagination />
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}