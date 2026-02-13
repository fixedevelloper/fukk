"use client"

import {Product, ResponsePaginate} from "../../../../types/FrontType";
import {useEffect, useState} from "react";
import {ProductArticle} from "./ProductArticle";

export function ProductCard() {
    const [products, setProducts] = useState<Product[]>([])


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
            .then((res:Response) => res.json())
            .then((data: ResponsePaginate<Product>) => setProducts(data.data))
            .catch((err) => console.error(err))
    }, [])
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
        </div>
    )
}