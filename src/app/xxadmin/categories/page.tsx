'use client';

import React, { useState, useEffect } from "react";
import {Category, Image} from "../../../types/FrontType";
import axiosServices from "../../../lib/axios";
import CategoryRow from "../components/CategoryRow";
import {CategoryMediaCard} from "../components/CategoryMediaCard";
import Pagination from "../components/Pagination";



interface CategoryForm {
    name: string;
    slug: string;
    parent_id: number | "";
    description: string;
    image_id: number | null;
}

export default function CategoriePage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categorieParents, setCategoryParents] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

    const [form, setForm] = useState<CategoryForm>({
        name: "",
        slug: "",
        parent_id: "",
        description: "",
        image_id: null,
    });

    /** Fetch categories */
    const fetchCategorieParents = async () => {
        try {
            const resParents = await axiosServices.get("/api/admin-categories-parents");
            console.log(resParents.data)
            setCategoryParents(resParents.data.data)
        } catch (err) {
            console.error(err);
        }
    };
    const fetchCategories = async (page = 1) => {
        setLoading(true);
        try {
            const res = await axiosServices.get(`api/admin-categories?page=${page}`, {
                params: { search, limit },
            });
            setCategories(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCategories();
        fetchCategorieParents();
    }, [search, limit]);

    /** Submit create / update */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                name: form.name,
                slug: form.slug,
                parent_id: form.parent_id || null,
                description: form.description,
                image_id: form.image_id,
            };

            if (editingCategory) {
                await axiosServices.put(`/api/admin-categories/${editingCategory.id}`, payload);
                alert("Catégorie mise à jour !");
            } else {
                await axiosServices.post("/api/admin-categories", payload);
                alert("Catégorie créée !");
            }

            resetForm();
            fetchCategories();
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    /** Reset form */
    const resetForm = () => {
        setForm({
            name: "",
            slug: "",
            parent_id: "",
            description: "",
            image_id: null,
        });
        setEditingCategory(null);
    };

    /** Edit category */
    const handleEditClick = async (cat: Category) => {
        setEditingCategory(cat);
        setForm({
            name: cat.name,
            slug: cat.slug,
            parent_id: cat.parent_id || "",
            description: cat.description || "",
            image_id: cat.image?.id ?? null,
        });
        if (cat.image) {
            setSelectedImage(cat.image);
        } else {
            setSelectedImage(null);
        }
    };

    /** Delete category */
    const handleDelete = async (cat: Category) => {
        if (!confirm(`Supprimer la catégorie "${cat.name}" ?`)) return;
        try {
            await axiosServices.delete(`/api/categories/${cat.id}`);
            alert("Catégorie supprimée !");
            fetchCategories();
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la suppression");
        }
    };

    return (
        <section className="content-main">
            <div className="content-header d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="content-title card-title">Categories</h2>
                    <p>Ajouter ou modifier une catégorie</p>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {/* Formulaire gauche */}
                        <div className="col-md-3">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nom</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Slug</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={form.slug}
                                        onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Parent</label>
                                    <select
                                        className="form-select"
                                        value={form.parent_id}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                parent_id: e.target.value
                                                    ? Number(e.target.value)
                                                    : "",
                                            })
                                        }
                                    >
                                        <option value="">-- Aucun --</option>
                                        {categorieParents
                                            .filter((c) => !editingCategory || c.id !== editingCategory.id)
                                            .map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm({ ...form, description: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Image */}
                                <CategoryMediaCard
                                    selectedImage={selectedImage??undefined}
                                    onChange={(image) => {
                                        setSelectedImage(image);
                                        setForm(prev => ({
                                            ...prev,
                                            image_id: image?.id ?? null
                                        }));
                                    }}
                                />


                                <div className="d-grid mt-2">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {editingCategory ? "Mettre à jour" : "Créer catégorie"}
                                    </button>
                                </div>

                                {editingCategory && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary mt-2 w-100"
                                        onClick={resetForm}
                                    >
                                        Annuler
                                    </button>
                                )}
                            </form>
                        </div>

                        {/* Tableau droite */}
                        <div className="col-md-9">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Slug</th>
                                        <th className="text-end">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {categories.map((cat) => (
                                        <CategoryRow
                                            key={cat.id}
                                            cat={cat}
                                            onEdit={handleEditClick}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                lastPage={lastPage}
                                onPageChange={(page) => fetchCategories(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

