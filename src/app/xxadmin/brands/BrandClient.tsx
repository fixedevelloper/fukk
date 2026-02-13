"use client"

import { createBrand, updateBrand, deleteBrand } from "./actions"
import { useTransition } from "react"

export default function BrandClient({ brands }) {
    const [isPending, startTransition] = useTransition()

    return (
        <section className="content-main">
            <div className="content-header d-flex justify-content-between mb-4">
                <h2>Brands</h2>
            </div>

            <div className="row">
                {brands.map((brand) => (
                    <div key={brand.id} className="col-xl-2 col-lg-3 col-md-4 col-6">
                        <div className="card text-center p-3">

                            {brand.image ? (
                                <img
                                    src={brand.image.thumb}
                                    alt={brand.name}
                                    className="img-fluid mb-2"
                                />
                            ) : (
                                <div className="bg-light p-4 mb-2">
                                    No Image
                                </div>
                            )}

                            <h6>{brand.name}</h6>

                            <div className="d-flex gap-2 justify-content-center">
                                <form action={(formData) => {
                                    startTransition(() => {
                                        updateBrand(brand.id, formData)
                                    })
                                }}>
                                    <input type="hidden" name="name" value={brand.name} />
                                    <button className="btn btn-sm btn-light">
                                        Edit
                                    </button>
                                </form>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                        startTransition(() =>
                                            deleteBrand(brand.id)
                                        )
                                    }
                                    disabled={isPending}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="my-4" />

            {/* Create Brand */}
            <form
                action={(formData) =>
                    startTransition(() => createBrand(formData))
                }
                className="mt-4"
            >
                <div className="row g-2">
                    <div className="col">
                        <input
                            type="text"
                            name="name"
                            placeholder="Brand name"
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="col">
                        <input
                            type="number"
                            name="image_id"
                            placeholder="Image ID"
                            className="form-control"
                        />
                    </div>

                    <div className="col-auto">
                        <button
                            className="btn btn-primary"
                            disabled={isPending}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}
