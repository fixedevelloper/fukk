import { useState, useEffect } from "react";
import axios from "axios";

interface ImageItem {
    id: number;
    name: string;
    alt: string;
    url: string;
}

interface ModalProps {
    show: boolean;
    onClose: () => void;
}

export function ImageModal({ show, onClose }: ModalProps) {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [name, setName] = useState("");
    const [alt, setAlt] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    // fetch images depuis Laravel
    const fetchImages = async () => {
        try {
            const res = await axios.get("/api/images"); // ton endpoint Laravel
            setImages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (show) fetchImages();
    }, [show]);

    const handleAddImage = async () => {
        if (!file || !name) return alert("Name and file are required");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("alt", alt);
        formData.append("file", file);

        try {
            setLoading(true);
            await axios.post("/api/images", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setName("");
            setAlt("");
            setFile(null);
            await fetchImages(); // rafraîchir la liste
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'upload de l'image");
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-dialog modal-lg">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h5 className="modal-title">Manage Images</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body row">
                        {/* Col-9: Liste des images */}
                        <div className="col-9">
                            <div className="row">
                                {images.map((img) => (
                                    <div key={img.id} className="col-4 mb-3">
                                        <div className="card">
                                            <img
                                                src={img.url}
                                                alt={img.alt}
                                                className="card-img-top"
                                                style={{ height: "120px", objectFit: "cover" }}
                                            />
                                            <div className="card-body">
                                                <h6 className="card-title">{img.name}</h6>
                                                <p className="card-text">{img.alt}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Col-3: Ajouter une image */}
                        <div className="col-3">
                            <div className="card p-3">
                                <h6>Add Image</h6>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Alt</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={alt}
                                        onChange={(e) => setAlt(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">File</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={handleAddImage}
                                    disabled={loading}
                                >
                                    {loading ? "Uploading..." : "Add"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* styles simples pour le modal */}
            <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .modal-dialog {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 900px;
        }
      `}</style>
        </div>
    );
}
