import React, {useState} from "react";
import ProductCardTop from "./ProductCardTop";
import ProductCardStyle2 from "./ProductCardStyle2";
import {Product} from "../../../types/FrontType";


type Props = {
    product: Product;
};
const tabs = [
    { id: "description", label: "Description" },
    { id: "specification", label: "Specification" },
    { id: "additional", label: "Additional information" },
    { id: "reviews", label: "Reviews" },
    { id: "vendor", label: "Vendor" },
];
export function ProductDescription({ product }: Props) {
    const [activeTab, setActiveTab] = useState("description");

    const renderContent = () => {
        switch (activeTab) {
            case "description":
                return <p>{product?.description}</p>;

            case "specification":
                return <p>{product?.short_description}</p>;

            case "additional":
                return <p>{product?.short_description}</p>;

            case "reviews":
                return <p>Aucun avis pour le moment</p>;

            case "vendor":
                return <>

                    <div className="vendor-logo d-flex mb-30">
                        <img src={product.store?.logo?.thumb} alt={product.store?.name || "Logo du vendeur"} />
                        <div className="vendor-name ml-15">
                            <h6>
                                <a href="shop-vendor">{product.store?.name}</a>
                            </h6>
                            <div className="product-rate-cover text-end">
                                <div className="product-rate d-inline-block">
                                    <div className="product-rating" />
                                </div>
                                <span className="font-small ml-5 text-muted"> ({product.store?.reviews || 32} avis)</span>
                            </div>
                        </div>
                    </div>

                    <ul className="contact-infor mb-50">
                        <li>
                            <img src="assets/imgs/page/product/icon-location.svg" alt="Adresse" />
                            <strong>Adresse :</strong>
                            <span> {product.store?.address}</span>
                        </li>
                        <li>
                            <img src="assets/imgs/page/product/icon-contact.svg" alt="Contact" />
                            <strong>Contact vendeur :</strong>
                            <span> {product.store?.phone}</span>
                        </li>
                    </ul>

                    <div className="d-flex mb-25">
                        <div className="mr-30">
                            <p className="color-brand-1 font-xs">Évaluation</p>
                            <h4 className="mb-0">{product.store?.rating || "92"}%</h4>
                        </div>
                        <div className="mr-30">
                            <p className="color-brand-1 font-xs">Livraison à temps</p>
                            <h4 className="mb-0">{product.store?.shipOnTime || "100"}%</h4>
                        </div>
                        <div>
                            <p className="color-brand-1 font-xs">Réponse chat</p>
                            <h4 className="mb-0">{product.store?.chatResponse || "89"}%</h4>
                        </div>
                    </div>

                    <p className="font-sm color-gray-500 mb-15">
                        {product.store?.description}
                    </p>
                    <p className="font-sm color-gray-500">
                        {product.store?.content}
                    </p>

                </>
                    ;

            default:
                return null;
        }
    };
    return (
        <section className="section-box shop-template">
            <div className="container">
                <div className="pt-30 mb-10">

                    {/* ================= TABS HEADER ================= */}
                    <ul className="nav nav-tabs nav-tabs-product">
                        {tabs.map((tab) => (
                            <li key={tab.id} className="nav-item2">
                                <button
                                    type="button"
                                    className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* ================= TABS CONTENT ================= */}
                    <div className="tab-content mt-20">
                        <div className="tab-pane active">
                            {renderContent()}
                        </div>

                        {/* ================= RELATED PRODUCTS ================= */}
                        <div className="border-bottom pt-30 mb-50" />
                        <h4 className="color-brand-3 mb-20">Related Products</h4>
                        {product.related_products?.length ? (
                            <div className="list-products-5">
                                {product.related_products.map((item) => (
                                    <ProductCardTop key={item.id} product={item} />
                                ))}
                            </div>
                        ) : (
                            <p className="font-sm text-muted">No related products</p>
                        )}

                        {/* ================= MOST RATED ================= */}
                        <div className="border-bottom pt-20 mb-40" />
                        <h4 className="color-brand-3 mb-20">You may also like</h4>
                        {product.mostRating?.length ? (
                            <div className="list-products-5">
                                {product.mostRating.map((item) => (
                                    <ProductCardTop key={item.id} product={item} />
                                ))}
                            </div>
                        ) : (
                            <p className="font-sm text-muted">No suggestions</p>
                        )}

                        {/* ================= RECENTLY VIEWED ================= */}
                        <div className="border-bottom pt-20 mb-40" />
                        <h4 className="color-brand-3 mb-20">Recently viewed items</h4>
                        {product.recentViewsproducts?.length ? (
                            <div className="row">
                                {product.recentViewsproducts.map((item) => (
                                    <ProductCardStyle2 key={item.id} product={item} />
                                ))}
                            </div>
                        ) : (
                            <p className="font-sm text-muted">No recently viewed items</p>
                        )}

                        <div className="border-bottom pt-20 mb-40" />
                    </div>
                </div>
            </div>

        </section>
    );
}
