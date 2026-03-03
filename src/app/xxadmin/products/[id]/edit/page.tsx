'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MediaCard } from "../../../components/MediaCard";
import axiosServices from "../../../../../lib/axios";
import {Image} from "../../../../../types/FrontType";
import RichTextEditor from "../../../components/RichTextEditor";
import ImageMediaCard from "../../../components/ImageModal";

// Types
type Category = { id: number; name: string; children?: Category[] };
type Attribute = { id: number; title: string; attribute_set: { id: number; title: string } };


interface Product {
    id?: number;
    name: string;
    slug: string;
    short_description: string;
    description: string;
    sku: string;
    reference: string;
    price: string;
    sale_price: string;
    quantity: number;
    length: string;
    wide: string;
    height: string;
    weight: string;
    tax_id: string;
    status: "draft" | "published";
    stock_status: string;
    allow_checkout_when_out_of_stock: boolean;
    with_storehouse_management: boolean;
    is_featured: boolean;
    category_id: number | "";
    sub_category_id: number | "";
    attributes: number[];
    image_id: number | null;
    gallery:number[];
    images:number[];
}


export default function ProductForm() {
    const { id } = useParams();
    const router = useRouter();

    const [product, setProduct] = useState<Product>({
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
        attributes: [],
        image_id: null,
        gallery: [] as number[],
        images: []
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<Category[]>([]);
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories, attributes, and product
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, attrRes] = await Promise.all([
                    axiosServices.get("/api/admin-categories-parents"),
                    axiosServices.get("/api/attributes"),
                ]);

                setCategories(catRes.data.data);
                setAttributes(attrRes.data.data);

                if (id) {
                    const prodRes = await axiosServices.get(`/api/admin-products/${id}`);
                    const prod = prodRes.data.data;

                    // Convert gallery for ImageMediaCard
                    const galleryImages: Image[] = prod.gallery?.map((img: any) => ({
                        id: img.id,
                        thumb: img.thumb || img.url,
                        alt: img.alt || img.name,
                    })) || [];

                    setProduct({
                        name: prod.name || "",
                        slug: prod.slug || "",
                        short_description: prod.short_description || "",
                        description: prod.description || "",
                        sku: prod.sku || "",
                        reference: prod.reference || "",
                        price: prod.price || "",
                        sale_price: prod.sale_price || "",
                        quantity: prod.quantity || 0,
                        length: prod.length || "",
                        wide: prod.wide || "",
                        height: prod.height || "",
                        weight: prod.weight || "",
                        tax_id: prod.tax_id || "",
                        status: prod.status || "draft",
                        stock_status: prod.stock_status || "IN_OF_STOCK",
                        allow_checkout_when_out_of_stock: prod.allow_checkout_when_out_of_stock || false,
                        with_storehouse_management: prod.with_storehouse_management || true,
                        is_featured: prod.is_featured || false,
                        category_id: prod.categories?.map((a: any) => a.id) || "",
                        sub_category_id: prod.categories?.map((a: any) => a.id) || "",
                        attributes: prod.attributes?.map((a: any) => a.id) || [],
                        image_id: prod.image_id || null,
                        gallery: [] as number[],
                        images:prod.images
                    });

                    const parent = catRes.data.data.find((c: any) => c.id === prod.category_id);
                    setSubCategories(parent?.children || []);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleCategoryChange = (categoryId: number) => {
        setProduct({ ...product, category_id: categoryId, sub_category_id: "" });
        const parent = categories.find(c => c.id === categoryId);
        setSubCategories(parent?.children || []);
    };

    const toggleAttribute = (attrId: number) => {
        const updatedAttrs = product.attributes.includes(attrId)
            ? product.attributes.filter((a) => a !== attrId)
            : [...product.attributes, attrId];
        setProduct({ ...product, attributes: updatedAttrs });
    };

    const handleSubmit = async (status: "draft" | "published") => {
        if (!product.name) return alert("Le nom est obligatoire");
        if (!product.price) return alert("Le prix est obligatoire");
        if (!product.category_id) return alert("La catégorie est obligatoire");

        try {
            if (id) {
                await axiosServices.put(`/api/admin-products/${id}`, { ...product, status });
                alert("Produit mis à jour !");
            } else {
                await axiosServices.post("/api/admin-products", { ...product, status });
                alert("Produit ajouté !");
            }
            router.push("/xxadmin/products/list");
        } catch (e) {
            console.error(e);
            alert("Erreur lors de l'enregistrement");
        }
    };

    if (loading) return <div className="text-center py-4">Chargement...</div>;

    return (
        <section className="content-main">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="content-title">{id ? "Modifier produit" : "Ajouter produit"}</h2>
                <div>
                    <button className="btn btn-light me-2" onClick={() => handleSubmit("draft")}>Enregistrer en brouillon</button>
                    <button className="btn btn-primary" onClick={() => handleSubmit("published")}>Publier</button>
                </div>
            </div>

            <div className="row">
                {/* Left column */}
                <div className="col-lg-8">
                    {/* Basic info */}
                    <div className="card mb-4">
                        <div className="card-header"><h4>Informations de base</h4></div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Nom du produit</label>
                                <input type="text" className="form-control" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description courte</label>
                                <textarea className="form-control" rows={2} value={product.short_description} onChange={e => setProduct({ ...product, short_description: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description complète</label>
                                <RichTextEditor
                                    value={product.description}
                                    onChange={(value: string) => setProduct({ ...product, description: value })}
                                    placeholder="Write your product description..."
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Prix régulier</label>
                                    <input type="text" className="form-control" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Prix soldé</label>
                                    <input type="text" className="form-control" value={product.sale_price} onChange={e => setProduct({ ...product, sale_price: e.target.value })} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">SKU</label>
                                    <input type="text" className="form-control" value={product.sku} onChange={e => setProduct({ ...product, sku: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping */}
                    <div className="card mb-4">
                        <div className="card-header"><h4>Shipping</h4></div>
                        <div className="card-body">
                            <div className="row">
                                {["length", "wide", "height", "weight"].map((key, i) => (
                                    <div className="col-md-3 mb-3" key={i}>
                                        <label className="form-label">
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={
                                                product[key as keyof Product] !== null && product[key as keyof Product] !== undefined
                                                    ? String(product[key as keyof Product])
                                                    : ""
                                            }
                                            onChange={e =>
                                                setProduct({
                                                    ...product,
                                                    [key]: e.target.value === "" ? null : Number(e.target.value),
                                                })
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="col-lg-4">
                    {/* Category & Sub-category */}
                    <div className="card mb-4">
                        <div className="card-header"><h4>Organisation</h4></div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Catégorie</label>
                                <select className="form-select" value={product.category_id} onChange={e => handleCategoryChange(Number(e.target.value))}>
                                    <option value="">-- Sélectionner catégorie --</option>
                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                            </div>

                            {subCategories.length > 0 && (
                                <div className="mb-3">
                                    <label>Sous-catégorie</label>
                                    <select className="form-select" value={product.sub_category_id} onChange={e => setProduct({ ...product, sub_category_id: Number(e.target.value) })}>
                                        <option value="">-- Sélectionner sous-catégorie --</option>
                                        {subCategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Attributes */}
                    <div className="card mb-4">
                        <div className="card-header"><h4>Attributs</h4></div>
                        <div className="card-body">
                            {attributes.map(attr => (
                                <label key={attr.id} className="form-check mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={product.attributes.includes(attr.id)}
                                        onChange={() => toggleAttribute(attr.id)}
                                    />
                                    <span className="form-check-label">{attr.attribute_set.title} - {attr.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div className="card mb-4">
                        <div className="card-header"><h4>Images</h4></div>
                        <div className="card-body">
                            <ImageMediaCard
                                multiple={true}
                                value={[]}
                                onChange={(images: Image | Image[] | null) => {
                                    const imagesArray = Array.isArray(images)
                                        ? images
                                        : images
                                            ? [images] // si c’est un seul objet, on le met dans un tableau
                                            : [];      // si null ou undefined, tableau vide

                                    setProduct({
                                        ...product,
                                        gallery: imagesArray.map(img => img.id),
                                        image_id: imagesArray[0]?.id || null,
                                    });
                                }}
                            />
                    {/*        <ImageMediaCard
                                multiple={true}
                                value={product.images}
                                onChange={(images: Image[] | null) => {
                                    if (images) {
                                        setProduct({
                                            ...product,
                                            gallery: images?.map(img => img.id),
                                            image_id: images[0]?.id || null,
                                        });
                                    } else {
                                        setProduct({
                                            ...product,
                                            gallery: [],
                                            image_id: null,
                                        });
                                    }
                                }}
                            />*/}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

