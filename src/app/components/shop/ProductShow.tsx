"use client";
import React, {useState} from "react";
import {useCartStore} from "../../../store/cartStore";
import Link from "next/link";
import {Product} from "../../../types/FrontType";
import ProductGallery from "../slider/ProductGallery";
import {ProductDescription} from "./ProductDescription";
import {FrequentlyBoughtTogether} from "./FrequentlyBoughtTogether";


type ProductShowProps = {
    product: Product;
};

export function ProductShow({product}: ProductShowProps) {
    // State pour la quantité
    const [quantity, setQuantity] = useState(1);
    const addCart = useCartStore((s) => s.addItem);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const increment = () => {
        setQuantity(q => q + 1)
        updateQuantity(product.id, quantity + 1)
    };
    const decrement = () => {
        setQuantity(q => (q > 1 ? q - 1 : 1))
        updateQuantity(product.id, Math.max(1, quantity - 1))
    };

    // Config du slider
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const handleAddCart = (product:Product) => {
        addCart({
            id: product.id,
            name: product.name,
            price: product.sale_price ?? product.price,
            quantity: quantity,
            image: product.image,
            store: product.store,
            slug: product.slug,
        });
    };
    return (
        <>
            <div className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link className="font-xs color-gray-1000" href="/">Accueil</Link></li>
                            <li><Link className="font-xs color-gray-500" href="/shop">
                                {product.categories?.map(cat => cat.name).join(", ")}
                            </Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="section-box shop-template">
                <div className="container">
                    <div className="row">
                        {/* Galerie d'images */}
                        <div className="col-lg-5">
                            <div className="gallery-image">
                                <div className="galleries">
                                    <ProductGallery images={product.images} />
                                </div>
                            </div>
                        </div>

                        {/* Informations produit */}
                        <div className="col-lg-7">
                            <h3 className="color-brand-3 mb-25">{product.name}</h3>

                            <div className="row align-items-center mb-20">
                                <div className="col-lg-4">
                                    <span className="bytext color-gray-500 font-xs font-medium">par </span>
                                    <Link
                                        href={`/stores/${product.store?.id}`}
                                        className="byAUthor color-gray-900 font-xs font-medium"
                                    >
                                        {product.store?.name}
                                    </Link>

                                    <div className="rating mt-5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <img key={i} src="/images/template/icons/star.svg" alt="étoile" />
                                        ))}
                                        <span className="font-xs color-gray-500 font-medium">
                  ({product.reviews} avis)
                </span>
                                    </div>
                                </div>
                                <div className="col-lg-8 text-start text-sm-end">
                                    <a href="#" className="mr-20">
                                        <span className="btn btn-wishlist mr-5" />
                                        <span className="font-md color-gray-900">Ajouter à la liste de souhaits</span>
                                    </a>
                                    <a href="#">
                                        <span className="btn btn-compare mr-5" />
                                        <span className="font-md color-gray-900">Ajouter à comparer</span>
                                    </a>
                                </div>
                            </div>

                            <div className="border-bottom pt-10 mb-20" />

                            {/* Prix et description */}
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="box-product-price mb-20">
                                        <h3 className="color-brand-3 price-main d-inline-block mr-10">{product.price} FCFA</h3>
                                        {product.oldPrice && (
                                            <span className="color-gray-500 price-line font-xl line-througt">${product.oldPrice} FCFA</span>
                                        )}
                                    </div>

                                    <ul className="list-dot color-gray-900">
                                        {/* Ici tu peux lister les caractéristiques du produit */}
                                    </ul>

                                    <div className="border-bottom mt-20 mb-20" />

                                    <div className="info-product">
                                        <div className="row align-items-end">
                                            <div className="col-lg-6 col-md-6 mb-20">
                    <span className="font-sm font-medium color-gray-900">
                      SKU: <span className="color-gray-500">{product.sku}</span><br/>
                      Catégorie: <span className="color-gray-500">{product.categories?.map(cat => cat.name).join(", ")}</span><br/>
                      Tags: <span className="color-gray-500">{product.categories?.map(cat => cat.name).join(", ")}</span>
                    </span>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-20">
                    <span className="font-sm font-medium color-gray-900">
                      Livraison gratuite<br/>
                      <span className="color-gray-500">Disponible pour toutes les zones.</span><br/>
                      <span className="color-gray-500">Options & informations de livraison</span>
                    </span>
                                            </div>
                                            <div className="col-lg-12 mb-20">
                                                <div className="d-inline-block">
                                                    <div className="share-link">
                                                        <span className="font-md-bold color-brand-3 mr-15">Partager</span>
                                                        <a className="facebook hover-up" href="#"/>
                                                        <a className="printest hover-up" href="#"/>
                                                        <a className="twitter hover-up" href="#"/>
                                                        <a className="instagram hover-up" href="#"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-5">
                                    <div className="box-border-product">
                                        <div className="box-product-color">
                                            <p className="font-sm color-gray-900">
                                                Couleur: <span className="color-brand-2 nameColor">Rose doré</span>
                                            </p>
                                            <ul className="list-colors">
                                                <li className="disabled"><img src="/images/page/product/img-thumb.png" alt="Ecom" title="Rose"/></li>
                                                <li><img src="/images/page/product/img-thumb.png" alt="Ecom" title="Or"/></li>
                                                <li><img src="/images/page/product/img-thumb.png" alt="Ecom" title="Rose doré"/></li>
                                                <li><img src="/images/page/product/img-thumb.png" alt="Ecom" title="Argent"/></li>
                                                <li className="active"><img src="/images/page/product/img-thumb.png" alt="Ecom" title="Rose doré"/></li>
                                            </ul>
                                        </div>

                                        <div className="buy-product mt-10 d-flex">
                                            <div className="font-sm text-quantity">Quantité</div>
                                            <div className="box-quantity">
                                                <div className="input-quantity">
                                                    <input
                                                        onChange={(e) => {
                                                            const val = Number(e.target.value);
                                                            if (!isNaN(val) && val > 0) setQuantity(val);
                                                        }}
                                                        value={quantity}
                                                        className="font-xl color-brand-3"
                                                        type="text"
                                                    />
                                                    <span className="minus-cart" onClick={decrement} />
                                                    <span className="plus-cart" onClick={increment} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="button-buy mt-15">
                                            <a className="btn btn-cart mb-15" onClick={() => handleAddCart(product)}>Ajouter au panier</a>
                                            <Link className="btn btn-buy" onClick={() => handleAddCart(product)} href="/shop/shop-checkout">Acheter maintenant</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FrequentlyBoughtTogether />
                </div>
            </section>

            <ProductDescription product={product} />

            <div className="container mt-20">
                <div className="text-center">
                    <a href="#"><img src="/images/page/product/banner-ads.png" alt="Ecom"/></a>
                </div>
            </div>
        </>

    );
}
