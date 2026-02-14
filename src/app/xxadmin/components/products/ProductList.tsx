"use client"

import {Product, ResponsePaginate} from "../../../../types/FrontType";
import React, {useEffect, useState} from "react";
import {ProductArticle} from "./ProductArticle";
import axiosServices from "../../../../lib/axios";
import Pagination from "../Pagination";

export function ProductCard() {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [products, setProducts] = useState<Product[]>([])
    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const res = await axiosServices.get(`api/admin-products?page=${page}`, {
                params: { search, limit },
            });
            setProducts(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
     fetchProducts()
    }, [search, limit])
    return(
        <div className="card mb-4">
            <header className="card-header">
                <div className="row align-items-center">
                    <div className="col col-check">
                        <input type="checkbox" className="form-check-input ms-2" />
                    </div>

                    <div className="col-md-3 col-12 me-auto">
                        <select className="form-select">
                            <option>All category</option>
                            <option>Electronics</option>
                            <option>Clothes</option>
                        </select>
                    </div>

                    <div className="col-md-2 col-6">
                        <input type="date" className="form-control" />
                    </div>

                    <div className="col-md-2 col-6">
                        <select className="form-select">
                            <option>Status</option>
                            <option>Active</option>
                            <option>Disabled</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* LIST */}
            <div className="card-body">
                {products.map((product:Product) => (
                  <ProductArticle product={product} />
                ))}
            </div>
            <div className="card-footer">
                <Pagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={(page) => fetchProducts(page)}
                />
            </div>

        </div>
    )
}