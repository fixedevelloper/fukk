'use client';

import { useState, useEffect } from "react";
import Modal from "react-modal";
import {Image} from "../../../types/FrontType";
import axiosServices from "../../../lib/axios";




interface MediaCardProps {
    selectedImages?: Image[] | null;
    onChange?: (images: Image[] | null) => void;
}

export function MediaCard({ selectedImages, onChange }: MediaCardProps) {
    const [images, setImages] = useState<Image[]>([]);
    const [localSelectedImages, setLocalSelectedImages] = useState<Image[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const [newImage, setNewImage] = useState<{
        name: string;
        alt: string;
        file?: File;
    }>({
        name: "",
        alt: "",
    });

    /* 🔄 Sync prop → state */
    useEffect(() => {
        if (selectedImages) {
            setLocalSelectedImages(selectedImages);
        } else {
            setLocalSelectedImages([]);
        }
    }, [selectedImages]);

    /* 🔁 Helper pour notifier le parent */
    const updateSelectedImages = (imgs: Image[]) => {
        setLocalSelectedImages(imgs);
        onChange?.(imgs);
    };

    /* 📥 Charger les images */
    const fetchImages = async (pageNumber = 1) => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await axiosServices.get("/api/images", {
                params: { page: pageNumber, per_page: 20 },
            });

            const newImages: Image[] = res.data.data;
            const meta = res.data.meta;

            setImages((prev) =>
                pageNumber === 1 ? newImages : [...prev, ...newImages]
            );

            setHasMore(meta.current_page < meta.last_page);
            setPage(meta.current_page);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages(1);
    }, []);

    /* ➕ Ajouter une image */
    const handleAddImage = async () => {
        if (!newImage.name || !newImage.file) return;

        const formData = new FormData();
        formData.append("file", newImage.file);
        formData.append("name", newImage.name);
        formData.append("alt", newImage.alt || newImage.name);

        try {
            const res = await axiosServices.post("/api/images", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const savedImage: Image = res.data.data;

            setImages((prev) => [...prev, savedImage]);
            updateSelectedImages([...localSelectedImages, savedImage]);

            setNewImage({ name: "", alt: "" });
        } catch (e) {
            console.error(e);
            alert("Erreur lors de l'ajout de l'image");
        }
    };

    /* ❌ Supprimer une image sélectionnée */
    const removeSelectedImage = (id?: number) => {
        updateSelectedImages(
            localSelectedImages.filter((img) => img.id !== id)
        );
    };

    /* ➕ Sélectionner une image existante */
    const selectImage = (img: Image) => {
        if (!localSelectedImages.find((i) => i.id === img.id)) {
            updateSelectedImages([...localSelectedImages, img]);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-header d-flex justify-content-between">
                <h4>Media</h4>
                <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>
                    Select / Add Image
                </button>
            </div>

            <div className="card-body d-flex flex-wrap gap-2">
                {localSelectedImages.map((img) => (
                    <div key={img.id} className="position-relative">
                        <img
                            src={img.thumb}
                            alt={img.alt}
                            style={{ width: 100, height: 100, objectFit: "cover" }}
                        />
                        <button
                            className="btn btn-sm btn-danger position-absolute top-0 end-0"
                            onClick={() => removeSelectedImage(img.id)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* MODAL */}
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Media Modal"
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 },
                    content: {
                        maxWidth: "1000px",
                        margin: "auto",
                        height: "80%",
                        borderRadius: "1rem",
                    },
                }}
            >
                <div className="d-flex gap-3 h-100">
                    {/* Images */}
                    <div className="col-9 overflow-auto d-flex flex-wrap gap-2">
                        {images.map((img) => (
                            <img
                                key={img.id}
                                src={img.thumb}
                                alt={img.alt}
                                style={{
                                    width: 100,
                                    height: 100,
                                    objectFit: "cover",
                                    cursor: "pointer",
                                }}
                                onClick={() => selectImage(img)}
                            />
                        ))}

                  {/*      {hasMore && (
                            <button
                                className="btn btn-outline-primary w-100"
                                disabled={loading}
                                onClick={() => fetchImages(page + 1)}
                            >
                                {loading ? "Loading..." : "Load more"}
                            </button>
                        )}*/}
                        {hasMore && ( <div className="w-100 text-center mt-3">
                            <button className="btn btn-outline-primary" disabled={loading}
                                    onClick={() => fetchImages(page + 1)} >
                                {loading ? "Loading..." : "Load more"} </button>
                        </div> )}
                    </div>

                    {/* Upload */}
                    <div className="col-3">
                        <h5>Add Image</h5>
                        <input
                            className="form-control mb-2"
                            placeholder="Name"
                            value={newImage.name}
                            onChange={(e) =>
                                setNewImage({ ...newImage, name: e.target.value })
                            }
                        />
                        <input
                            className="form-control mb-2"
                            placeholder="Alt"
                            value={newImage.alt}
                            onChange={(e) =>
                                setNewImage({ ...newImage, alt: e.target.value })
                            }
                        />
                        <input
                            type="file"
                            className="form-control mb-2"
                            onChange={(e) =>
                                e.target.files &&
                                setNewImage({ ...newImage, file: e.target.files[0] })
                            }
                        />
                        <button className="btn btn-success w-100" onClick={handleAddImage}>
                            Add
                        </button>
                    </div>
                </div>

                <div className="text-end mt-3">
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}

