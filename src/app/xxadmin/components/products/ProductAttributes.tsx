'use client';

import { useEffect, useState } from "react";
import axiosServices from "../../../../lib/axios";
import {AxiosResponse} from "axios";
import {AttributeSet} from "../../../../types/FrontType";

// Types
type Category = { id: number; name: string; children?: Category[] };
type Attribute = { id: number; title: string; attribute_set: { id: number; title: string } };

export default function ProductAdd() {
    const [product, setProduct] = useState<any>({
        name: "",
        slug: "",
        short_description: "",
        description: "",
        sku: "",
        reference: "",
        price: "",
        sale_price: "",
        quantity: 0,
        length: "",
        wide: "",
        height: "",
        weight: "",
        tax_id: "",
        status: "draft",
        stock_status: "IN_OF_STOCK",
        allow_checkout_when_out_of_stock: false,
        with_storehouse_management: true,
        is_featured: false,
        category_id: "",
        sub_category_id: "",
        attributes: [] as number[],
        image_id: null,
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Category[]>([]);
    const [attributes, setAttributes] = useState<Attribute[]>([]);

    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const res: AxiosResponse<{ data: Category[] }> = await axiosServices.get("/api/categories");
            setCategories(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchAttributes = async () => {
        try {
            const res: AxiosResponse<{ data: Attribute[] }> = await axiosServices.get("/api/attributes");
            setAttributes(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=>{
        fetchAttributes()
        fetchCategories()
    })
    // Fetch categories + attributes
/*    useEffect(() => {
        axiosServices.get("/api/categories").then((res) => setCategories(res.data.data));
        axiosServices.get("/api/attributes").then(res => setAttributes(res.data.data));
    }, []);*/

    const handleCategoryChange = (id: number) => {
        setProduct({ ...product, category_id: id, sub_category_id: "" });
        const parent = categories.find(c => c.id === id);
        setSubCategories(parent?.children || []);
    };

    const toggleAttribute = (id: number) => {
        const attrs = product.attributes.includes(id)
            ? product.attributes.filter((a: number) => a !== id)
            : [...product.attributes, id];
        setProduct({ ...product, attributes: attrs });
    };

    const handleSubmit = async (status: "draft" | "published") => {
        // Validation simple
        if (!product.name) return alert("Le nom du produit est obligatoire");
        if (!product.price) return alert("Le prix est obligatoire");
        if (!product.category_id) return alert("La catégorie est obligatoire");

        setLoading(true);
        try {
            await axiosServices.post("/api/products", { ...product, status });
            alert("Produit enregistré avec succès !");
        } catch (e) {
            console.error(e);
            alert("Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="content-main">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="content-title">Ajouter un produit</h2>
                <div>
                    <button
                        className="btn btn-light me-2"
                        onClick={() => handleSubmit("draft")}
                        disabled={loading}
                    >
                        Enregistrer en brouillon
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleSubmit("published")}
                        disabled={loading}
                    >
                        Publier
                    </button>
                </div>
            </div>

            <div className="row">
                {/* Left column */}
                <div className="col-lg-8">
                    {/* Basic Info */}
                    <div className="card mb-4">
                        <div className="card-header"><h4>Informations de base</h4></div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Nom du produit</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={product.name}
                                    onChange={e => setProduct({ ...product, name: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description courte</label>
                                <textarea
                                    className="form-control"
                                    rows={2}
                                    value={product.short_description}
                                    onChange={e => setProduct({ ...product, short_description: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description complète</label>
                                <textarea
                                    className="form-control"
                                    rows={4}
                                    value={product.description}
                                    onChange={e => setProduct({ ...product, description: e.target.value })}
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Prix régulier</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={product.price}
                                        onChange={e => setProduct({ ...product, price: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Prix soldé</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={product.sale_price}
                                        onChange={e => setProduct({ ...product, sale_price: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">SKU</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={product.sku}
                                        onChange={e => setProduct({ ...product, sku: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping */}
                    <div className="card mb-4">
                        <div className="card-header"><h4>Shipping</h4></div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label>Longueur</label>
                                    <input
                                        className="form-control"
                                        value={product.length}
                                        onChange={e => setProduct({ ...product, length: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label>Largeur</label>
                                    <input
                                        className="form-control"
                                        value={product.wide}
                                        onChange={e => setProduct({ ...product, wide: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label>Hauteur</label>
                                    <input
                                        className="form-control"
                                        value={product.height}
                                        onChange={e => setProduct({ ...product, height: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label>Poids</label>
                                    <input
                                        className="form-control"
                                        value={product.weight}
                                        onChange={e => setProduct({ ...product, weight: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stock / Inventaire */}
                    <div className="card mb-4">
                        <div className="card-header"><h4>Inventaire</h4></div>
                        <div className="card-body">
                            <label className="form-check mb-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={product.is_featured}
                                    onChange={e => setProduct({ ...product, is_featured: e.target.checked })}
                                />
                                <span className="form-check-label">Produit mis en avant</span>
                            </label>

                            <label className="form-check mb-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={product.allow_checkout_when_out_of_stock}
                                    onChange={e =>
                                        setProduct({ ...product, allow_checkout_when_out_of_stock: e.target.checked })
                                    }
                                />
                                <span className="form-check-label">Autoriser la commande hors stock</span>
                            </label>

                            <div className="row mt-3">
                                <div className="col-md-6 mb-3">
                                    <label>Quantité</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={product.quantity}
                                        onChange={e => setProduct({ ...product, quantity: Number(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-header"><h4>Organisation</h4></div>
                        <div className="card-body">
                            {/* Catégorie */}
                            <div className="mb-3">
                                <label>Catégorie</label>
                                <select
                                    className="form-select"
                                    value={product.category_id}
                                    onChange={e => handleCategoryChange(Number(e.target.value))}
                                >
                                    <option value="">-- Sélectionner catégorie --</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sous-catégorie */}
                            {subCategories.length > 0 && (
                                <div className="mb-3">
                                    <label>Sous-catégorie</label>
                                    <select
                                        className="form-select"
                                        value={product.sub_category_id}
                                        onChange={e => setProduct({ ...product, sub_category_id: Number(e.target.value) })}
                                    >
                                        <option value="">-- Sélectionner sous-catégorie --</option>
                                        {subCategories.map(sub => (
                                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Attributes */}
                            <div className="card mb-4">
                                <div className="card-header"><h5>Attributs</h5></div>
                                <div className="card-body">
                                    {attributes.map(attr => (
                                        <label key={attr.id} className="form-check mb-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={product.attributes.includes(attr.id)}
                                                onChange={() => toggleAttribute(attr.id)}
                                            />
                                            <span className="form-check-label">
                        {attr.attribute_set.title} - {attr.title}
                      </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
