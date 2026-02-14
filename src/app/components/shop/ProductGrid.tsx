"use client";

import ProductCard from "./ProductCard";
import React, {memo, useEffect, useState} from "react";
import {useFiltersStore} from "../../../store/filters.store";
import {usePaginationStore} from "../../../store/pagination.store";
import {Product, ResponsePaginate, Tab} from "../../../types/FrontType";

function ProductGrid() {
    const filters = useFiltersStore();
    const { page, perPage, setTotalPages } = usePaginationStore();
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${page}&per_page=${perPage}&brands=${filters.brands.join(",")}&price=${filters.priceRanges.join(",")}&category=${filters.category}`
        )
            .then((res) => res.json())
            .then((data:ResponsePaginate<Product>) => {
                setTotalPages(data.meta.last_page);
                setProducts(data.data || []);
            });
    }, [page, filters]);

    return (
        <div className="row mt-20">
            {products.map((product:Product) => (
                <div
                    key={product.id}
                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12"
                >
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
}

export default memo(ProductGrid);
