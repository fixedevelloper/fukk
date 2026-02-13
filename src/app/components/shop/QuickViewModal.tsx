"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import { useQuickViewStore } from "@/store/useQuickViewStore";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import star from "@/styles/front/imgs/template/icons/star.svg";
import Image from "next/image";
import ProductGalleryVertical from "../slider/ProductGalleryVertical";
export default function QuickViewModal() {
    const { open, product, closeModal } = useQuickViewStore();
    const addCart = useCartStore((s) => s.addItem);

    const [sliderNav, setSliderNav] = useState<Slider | null>(null);
    const [sliderMain, setSliderMain] = useState<Slider | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        Modal.setAppElement(document.body);
    }, []);

    if (!product) return null;


    const handleAddCart = () => {
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
        <Modal
            isOpen={open}
            onRequestClose={closeModal}
            contentLabel="Quick View"
            style={{
                overlay: {
                    zIndex: 1050,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
                content: {
                    position: "relative",
                    inset: "auto",
                    maxWidth: "1400px",
                    width: "95%",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "1rem",
                    border: "none",
                    padding: "1.5rem",
                    background: "white",
                },
            }}
        >
            <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-3"
                aria-label="Close"
                onClick={closeModal}
            />

            <div className="row">
                {/* Colonne gauche : Galerie */}
                <div className="col-lg-6">
                    <div className="gallery-image">
                        <div className="galleries-2">
                            <ProductGalleryVertical images={product.images} />
                        </div>
                    </div>

                    {/* Catégorie et tags */}
                    <div className="mt-3">
                        <span className="me-2">Catégorie :</span>
                        <a href="#" className="me-3">{product.categories?.map(cat => cat.name).join(", ")}</a>
                        {product.tags?.map((tag, i) => (
                            <a key={i} href="#" className="me-1">{tag}</a>
                        ))}
                    </div>
                </div>

                {/* Colonne droite : Informations produit */}
                <div className="col-lg-6">
                    <h5 className="mb-15">{product.name}</h5>

                    {/* Vendeur */}
                    <div className="info-by">
                        <span className="bytext color-gray-500 font-xs font-medium">par </span>
                        <Link
                            href={`/stores/${product?.store?.id}`}
                            className="byAUthor color-gray-900 font-xs font-medium"
                        >
                            {product?.store?.name}
                        </Link>

                        {/* Note du produit */}
                        <div className="rating d-inline-block">
                            <Image src={star} alt="Ecom" />
                            <span className="font-xs color-gray-500 font-medium"> (65 avis)</span>
                        </div>
                    </div>

                    <div className="border-bottom pt-10 mb-20" />

                    {/* Prix */}
                    <div className="box-product-price">
                        <h3 className="color-brand-3 price-main d-inline-block mr-10">{product.price}</h3>
                        {product.oldPrice && (
                            <span className="color-gray-500 price-line font-xl line-througt">{product.oldPrice}</span>
                        )}
                    </div>

                    {/* Caractéristiques */}
                    <div className="product-description mt-10 color-gray-900">
                        <ul className="list-dot">
                            {product.categories?.map((f, i) => (
                                <li key={i}>{f.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Couleurs disponibles */}
                    <div className="box-product-color mt-10">
                        <p className="font-sm color-gray-900">
                            Couleur : <span className="color-brand-2 nameColor">Pink Gold</span>
                        </p>
                        <ul className="list-colors">
                            <li className="disabled"><img src="/images/page/product/img-gallery-1.jpg" alt="Rose" title="Pink" /></li>
                            <li><img src="/images/page/product/img-gallery-2.jpg" alt="Or" title="Gold" /></li>
                            <li><img src="/images/page/product/img-gallery-3.jpg" alt="Rose doré" title="Pink Gold" /></li>
                            <li><img src="/images/page/product/img-gallery-4.jpg" alt="Argent" title="Silver" /></li>
                            <li className="active"><img src="/images/page/product/img-gallery-5.jpg" alt="Rose doré" title="Pink Gold" /></li>
                            <li className="disabled"><img src="/images/page/product/img-gallery-6.jpg" alt="Noir" title="Black" /></li>
                            <li className="disabled"><img src="/images/page/product/img-gallery-7.jpg" alt="Rouge" title="Red" /></li>
                        </ul>
                    </div>

                    {/* Styles et tailles */}
                    <div className="box-product-style-size mt-10">
                        <div className="row">
                            <div className="col-lg-12 mb-10">
                                <p className="font-sm color-gray-900">
                                    Style : <span className="color-brand-2 nameStyle">S22</span>
                                </p>
                                <ul className="list-styles">
                                    <li className="disabled" title="S22 Ultra">S22 Ultra</li>
                                    <li className="active" title="S22">S22</li>
                                    <li title="S22 + Coque">S22 + Standing Cover</li>
                                </ul>
                            </div>
                            <div className="col-lg-12 mb-10">
                                <p className="font-sm color-gray-900">
                                    Taille : <span className="color-brand-2 nameSize">512GB</span>
                                </p>
                                <ul className="list-sizes">
                                    <li className="disabled" title="1GB">1GB</li>
                                    <li className="active" title="512GB">512GB</li>
                                    <li title="256GB">256GB</li>
                                    <li title="128GB">128GB</li>
                                    <li className="disabled" title="64GB">64GB</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Quantité et boutons */}
                    <div className="buy-product mt-5">
                        <p className="font-sm mb-10">Quantité</p>
                        <div className="box-quantity">
                            <div className="input-quantity">
                                <input
                                    className="font-xl color-brand-3"
                                    type="text"
                                    value={quantity}
                                    onChange={(e) => {
                                        const val = Number(e.target.value);
                                        if (!isNaN(val) && val > 0) setQuantity(val);
                                    }}
                                />
                                <span className="minus-cart" onClick={() => setQuantity((q) => Math.max(1, q - 1))} />
                                <span className="plus-cart" onClick={() => setQuantity((q) => q + 1)} />
                            </div>
                            <div className="button-buy">
                                <Link className="btn btn-cart" onClick={handleAddCart} href="shop/shop-cart">Ajouter au panier</Link>
                                <Link className="btn btn-buy" href="shop/shop-checkout">Acheter maintenant</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Modal>
    );
}
