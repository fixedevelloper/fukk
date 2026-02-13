"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Product } from "../../../types/FrontType";

export function FrequentlyBoughtTogether() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/frequentlybuys`)
            .then(res => res.json())
            .then((data: Product[]) => {
                setProducts(data);
                setSelected(data.map(p => p.id)); // tous cochés par défaut
            })
            .catch(console.error);
    }, []);

    const toggleProduct = (id: number) => {
        setSelected(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        );
    };

    const totalPrice = useMemo(() => {
        return products
            .filter(p => selected.includes(p.id))
            .reduce((sum, p) => sum + p.price, 0);
    }, [products, selected]);

    if (!products.length) return <p>.</p>
    return (
        <div className="border-bottom pt-30 mb-40">
            <h4 className="color-brand-3 mb-20">Frequently Bought Together</h4>

            <div className="box-bought-together">
                {/* IMAGES */}
                <div className="box-product-bought box-product-bought-2">
                    {products.map(item => (
                        <div key={item.id} className="product-bought">
                            <img src={item.image?.thumb} alt={item.name} />
                        </div>
                    ))}
                </div>

                {/* TOTAL */}
                <div className="price-bought">
                    <h3 className="color-brand-3 mr-10">
                        ${totalPrice.toFixed(2)}
                    </h3>
                    <span className="font-lg color-gray-900">
                        ({selected.length} items)
                    </span>

                    <div className="box-btn-add-cart">
                        <button className="btn btn-cart">
                            Add To Cart
                        </button>
                    </div>
                </div>

                {/* CHECKBOX */}
                {products.map(item => (
                    <label key={item.id} className="cb-container-2">
                        <input
                            type="checkbox"
                            checked={selected.includes(item.id)}
                            onChange={() => toggleProduct(item.id)}
                        />
                        <span className="font-md color-brand-3">
                            {item.name} - ${item.price}
                        </span>
                        <span className="checkmark" />
                    </label>
                ))}
            </div>
        </div>
    );
}
