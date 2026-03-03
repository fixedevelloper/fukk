'use client';

import Modal from "react-modal";
import { Image } from "../../../types/FrontType";
import React, { useEffect, useState } from "react";
import axiosServices from "../../../lib/axios";


type Props = {
    multiple?: boolean;
    value?: Image | Image[] | null;
    onChange?: (images: Image | Image[] | null) => void;
};


export default function ImageMediaCard({
                                           multiple = false,
                                           value = null,
                                           onChange,
                                       }: Props) {

    const [images, setImages] = useState<Image[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
    const [activeImage, setActiveImage] = useState<Image | null>(null);
    const [selected, setSelected] = useState<Image[]>(() => {
        if (Array.isArray(value)) return value;
        if (value) return [value];
        return [];
    });


    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const [newImage, setNewImage] = useState<{
        name: string;
        alt: string;
        file?: File;
    }>({ name: "", alt: "" });


    useEffect(() => {
        if (showModal) fetchImages(1);
    }, [showModal]);

    const fetchImages = async (pageNumber = 1, searchValue = search) => {
        if (loading) return;

        setLoading(true);
        try {
            const res = await axiosServices.get("/api/images", {
                params: {
                    page: pageNumber,
                    per_page: 20,
                    search: searchValue,
                },
            });

            const newImages = res.data.data;
            const meta = res.data.meta;

            setImages(prev =>
                pageNumber === 1 ? newImages : [...prev, ...newImages]
            );

            setHasMore(meta.current_page < meta.last_page);
            setPage(meta.current_page);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async () => {
        if (!newImage.file) return;

        const formData = new FormData();
        formData.append("file", newImage.file);
        formData.append("name", newImage.name || newImage.file.name);
        formData.append("alt", newImage.alt || newImage.name);

        await axiosServices.post("/api/images", formData);
        setNewImage({ name: "", alt: "" });
        setActiveTab("library");
        fetchImages(1);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this image?")) return;

        await axiosServices.delete(`/api/images/${id}`);
        setImages(prev => prev.filter(i => i.id !== id));
        setActiveImage(null);
    };

    const toggleSelect = (img: Image) => {
        if (!multiple) {
            setSelected([img]);
            setActiveImage(img);
            return;
        }

        const exists = selected.some(i => i.id === img.id);

        if (exists) {
            setSelected(prev => prev.filter(i => i.id !== img.id));
        } else {
            setSelected(prev => [...prev, img]);
        }

        setActiveImage(img);
    };


    return (
        <>

            <div className="row g-3 align-items-start mb-4">

                {/* CARD + POUR OUVRIR LE MODAL */}
                <div className="col-6 col-md-3">
                    <div
                        className="d-flex flex-column align-items-center justify-content-center border border-2 border-dashed rounded p-4 text-center bg-light"
                        style={{ cursor: "pointer", minHeight: 120 }}
                        onClick={() => setShowModal(true)}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center mb-2"
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                                backgroundColor: "#0d6efd",
                                color: "white",
                                fontSize: 28,
                            }}
                        >
                            +
                        </div>
                       {/* <p className="mb-0 small">Add Image{multiple ? "s" : ""}</p>*/}
                    </div>
                </div>

                {/* PREVIEW DES IMAGES SELECTIONNEES */}
                {selected.length > 0 &&
                selected.map((img) => (
                    <div key={img.id} className="col-6 col-md-3">
                        <div
                            className="position-relative border rounded overflow-hidden"
                            style={{ width: "100%", paddingTop: "100%" }} // carré responsive
                        >
                            <img
                                src={img.thumb}
                                alt={img.alt}
                                className="position-absolute top-0 start-0 w-100 h-100"
                                style={{ objectFit: "cover" }}
                            />
                            {/* Remove button */}
                            <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                onClick={() => {
                                    const updated = selected.filter((i) => i.id !== img.id);
                                    setSelected(updated);
                                    onChange?.(multiple ? updated : null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 },
                    content: {
                        maxWidth: "90%",
                        margin: "auto",
                        height: "90%",
                        padding: 0,
                        borderRadius: "1rem",
                    },
                }}
            >
                <div className="d-flex flex-column h-100">

                    {/* HEADER */}
                    <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Media Library</h5>
                        <div>
                            <button
                                className="btn btn-primary"
                                disabled={selected.length === 0}
                                onClick={() => {
                                    if (multiple) {
                                        onChange?.(selected);
                                    } else {
                                        onChange?.(selected[0] || null);
                                    }
                                    setShowModal(false);
                                }}
                            >
                                {multiple
                                    ? `Choose (${selected.length})`
                                    : "Choose"}
                            </button>
                            <button
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                            />
                        </div>
                    </div>

                    {/* TABS */}
                    <ul className="nav nav-tabs px-3 pt-2">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "library" ? "active" : ""}`}
                                onClick={() => setActiveTab("library")}
                            >
                                Library
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "upload" ? "active" : ""}`}
                                onClick={() => setActiveTab("upload")}
                            >
                                Upload
                            </button>
                        </li>
                    </ul>

                    {/* BODY */}
                    <div
                        className="flex-grow-1 overflow-auto p-3"
                        onScroll={(e) => {
                            const bottom =
                                e.currentTarget.scrollHeight -
                                e.currentTarget.scrollTop <=
                                e.currentTarget.clientHeight + 50;

                            if (bottom && hasMore && !loading) {
                                fetchImages(page + 1);
                            }
                        }}
                    >
                        {activeTab === "library" && (
                            <div className="row">
                                {/* LEFT */}
                                <div className="col-md-9">
                                    <input
                                        className="form-control mb-3"
                                        placeholder="Search images..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            fetchImages(1, e.target.value);
                                        }}
                                    />

                                    <div className="row g-3">
                                        {images.map(img => {
                                            const isSelected = selected.some(
                                                i => i.id === img.id
                                            );

                                            return (
                                                <div key={img.id} className="col-6 col-md-4 col-lg-3">
                                                    <div
                                                        className={`border rounded position-relative ${
                                                            isSelected ? "border-primary border-3" : ""
                                                        }`}
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => toggleSelect(img)}
                                                    >
                                                        <img
                                                            src={img.thumb}
                                                            alt={img.alt}
                                                            className="img-fluid"
                                                            style={{
                                                                height: 130,
                                                                objectFit: "cover",
                                                                width: "100%",
                                                            }}
                                                        />

                                                        {isSelected && (
                                                            <span className="position-absolute top-0 end-0 badge bg-primary m-2">
                                                                ✓
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {loading && (
                                        <div className="text-center mt-3">
                                            <div className="spinner-border text-primary" />
                                        </div>
                                    )}
                                </div>

                                {/* RIGHT PREVIEW */}
                                <div className="col-md-3 border-start">
                                    {activeImage && (
                                        <>
                                            <img
                                                src={activeImage.thumb}
                                                className="img-fluid rounded mb-3"
                                            />

                                            <input
                                                className="form-control mb-2"
                                                value={activeImage.name}
                                                onChange={(e) =>
                                                    setActiveImage({
                                                        ...activeImage,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />

                                            <input
                                                className="form-control mb-2"
                                                value={activeImage.alt}
                                                onChange={(e) =>
                                                    setActiveImage({
                                                        ...activeImage,
                                                        alt: e.target.value,
                                                    })
                                                }
                                            />

                                            <button
                                                className="btn btn-outline-primary w-100 mb-2"
                                                onClick={async () => {
                                                    await axiosServices.put(
                                                        `/api/images/${activeImage.id}`,
                                                        activeImage
                                                    );
                                                }}
                                            >
                                                Save Changes
                                            </button>

                                            <button
                                                className="btn btn-outline-danger w-100"
                                                onClick={() =>
                                                    handleDelete(activeImage.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "upload" && (
                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="container">
                                        {/* HEADER : Drag & Drop */}
                                        <label
                                            htmlFor="file-upload"
                                            className="d-flex flex-column align-items-center justify-content-center border border-2 border-dashed rounded p-5 text-center bg-light"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                const file = e.dataTransfer.files[0];
                                                if (file) {
                                                    setNewImage({
                                                        ...newImage,
                                                        file,
                                                        name: file.name,
                                                    });
                                                }
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <a href="#" onClick={(e) => e.preventDefault()}>
                                                <div
    id="upload-icon"
   // name="md md-upload"
    style={{fontSize: 48, color: "#0d6efd"}}
    />
                                            </a>
                                            <p id="upload-text" className="mt-2 mb-0">
                                                Drag & Drop or Browse File to upload!
                                            </p>
                                            {newImage.file && (
                                                <small className="text-success mt-2">{newImage.file.name}</small>
                                            )}
                                        </label>

                                        {/* FOOTER : file name or placeholder */}
                                        <label htmlFor="file-upload" className="d-block text-center mt-2">
                                            <p className="mb-0">
                                                {newImage.file ? newImage.file.name : "No file selected"}
                                            </p>
                                        </label>

                                        {/* INPUT hidden */}
                                        <input
                                            type="file"
                                            id="file-upload"
                                            accept="image/*"
                                            className="d-none"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setNewImage({
                                                        ...newImage,
                                                        file: e.target.files[0],
                                                        name: e.target.files[0].name,
                                                    });
                                                }
                                            }}
                                        />

                                        {/* PREVIEW IMAGE */}
                                        {newImage.file && (
                                            <div className="mt-3 text-center">
                                                <img
                                                    src={URL.createObjectURL(newImage.file)}
                                                    alt={newImage.name}
                                                    className="img-fluid rounded"
                                                    style={{ maxHeight: 200 }}
                                                />
                                            </div>
                                        )}
                                    </div>



                                    <input
                                        className="form-control mt-3"
                                        placeholder="Alt text"
                                        value={newImage.alt}
                                        onChange={(e) =>
                                            setNewImage({
                                                ...newImage,
                                                alt: e.target.value,
                                            })
                                        }
                                    />

                                    <button
                                        className="btn btn-success w-100 mt-3"
                                        onClick={handleUpload}
                                    >
                                        Upload Image
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
}
