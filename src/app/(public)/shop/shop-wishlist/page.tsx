"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import Link from "next/link";

export default function ShopWishlist() {
    const { items, removeItem } = useWishlistStore();

    return (
        <>
            {/* Fil d’Ariane */}
            <div className="section-box">
                <div className="breadcrumbs-div">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li><Link className="font-xs color-gray-1000" href="/">Accueil</Link></li>
                            <li><Link className="font-xs color-gray-500" href="/shop">Boutique</Link></li>
                            <li><Link className="font-xs color-gray-500" href="/shop-wishlist">Liste de souhaits</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="section-box shop-template">
                <div className="container">
                    <div className="box-wishlist">
                        {/* En-tête */}
                        <div className="head-wishlist">
                            <div className="item-wishlist">
                                <div className="wishlist-product"><span>Produit</span></div>
                                <div className="wishlist-price"><span>Prix</span></div>
                                <div className="wishlist-status"><span>Disponibilité</span></div>
                                <div className="wishlist-action"><span>Action</span></div>
                                <div className="wishlist-remove"><span>Supprimer</span></div>
                            </div>
                        </div>

                        {/* Contenu de la wishlist */}
                        <div className="content-wishlist">
                            {items.length === 0 && <p>Votre liste de souhaits est vide</p>}

                            {items.map((product) => (
                                <div key={product.id} className="item-wishlist">
                                    <div className="wishlist-product">
                                        <div className="product-wishlist">
                                            <div className="product-image">
                                                <Link href={`/shop/product-show/${product.id}`}>
                                                    <img src={product?.image?.thumb} alt={product.name} />
                                                </Link>
                                            </div>
                                            <div className="product-info">
                                                <Link href={`/shop/product-show/${product.slug}`}>
                                                    <h6>{product.name}</h6>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="wishlist-price">
                                        <h4>{product.price} FCFA</h4>
                                    </div>

                                    <div className="wishlist-status">
                <span className={product.stock_status ? "btn btn-gray" : "btn btn-red"}>
                  {product.stock_status ? "En stock" : "Rupture de stock"}
                </span>
                                    </div>

                                    <div className="wishlist-action">
                                        <Link href="/shop-cart" className="btn btn-cart">
                                            Ajouter au panier
                                        </Link>
                                    </div>

                                    <div className="wishlist-remove">
                                        <button
    className="btn btn-delete"
    onClick={() => removeItem(product.id)}
    />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
