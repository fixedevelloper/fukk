'use client';

import Modal from "react-modal";
import { Image } from "../../../types/FrontType";
import { useEffect, useState } from "react";
import axiosServices from "../../../lib/axios";

type Props = {
    selectedImage?: Image;
    onChange?: (image: Image | null) => void;
};

export function CategoryMediaCard({ selectedImage, onChange }: Props) {
    const [images, setImages] = useState<Image[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newImage, setNewImage] = useState<{ name: string; alt: string; file?: File }>({
        name: "",
        alt: "",
    });
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchImages(1);
    }, []);

    const fetchImages = async (pageNumber = 1) => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await axiosServices.get("/api/images", {
                params: { page: pageNumber, per_page: 20 },
            });

            const newImages = res.data.data;
            const meta = res.data.meta;

            setImages(prev =>
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

    const handleSelectImage = (image: Image) => {
        onChange?.(image);
        setShowModal(false);
    };

    const handleRemoveImage = () => {
        onChange?.(null);
    };

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

            const savedImage = res.data.data;
            onChange?.(savedImage);
            setNewImage({ name: "", alt: "" });
            setShowModal(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            alert("Impossible d'ajouter l'image");
        }
    };

    return (
        <div className="mb-4">
            <button type='button'
                className="btn btn-sm btn-primary mb-2"
                onClick={() => setShowModal(true)}
            >
                Select / Add Image
            </button>

            {selectedImage && (
                <div className="position-relative d-inline-block">
                    <img
                        src={selectedImage.thumb}
                        alt={selectedImage.alt}
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <button
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        onClick={handleRemoveImage}
                    >
                        &times;
                    </button>
                </div>
            )}

            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Image Modal"
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
                <div className="d-flex gap-3">
                    <div className="flex-wrap d-flex gap-2 flex-grow-1">
                        {images.map(img => (
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
                                onClick={() => handleSelectImage(img)}
                            />
                        ))}
                    </div>

                    <div style={{ width: 250 }}>
                        <h5>Add New Image</h5>
                        <input
                            className="form-control mb-2"
                            placeholder="Name"
                            value={newImage.name}
                            onChange={e =>
                                setNewImage({ ...newImage, name: e.target.value })
                            }
                        />
                        <input
                            className="form-control mb-2"
                            placeholder="Alt"
                            value={newImage.alt}
                            onChange={e =>
                                setNewImage({ ...newImage, alt: e.target.value })
                            }
                        />
                        <input
                            type="file"
                            className="form-control mb-2"
                            onChange={e =>
                                e.target.files &&
                                setNewImage({
                                    ...newImage,
                                    file: e.target.files[0],
                                })
                            }
                        />
                        <button className="btn btn-success w-100" onClick={handleAddImage}>
                            Add
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
