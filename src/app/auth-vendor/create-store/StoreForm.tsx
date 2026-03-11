"use client"
import { useState } from "react"
type Props = {
    data: any
    updateData: (fields: any) => void
}



export default function StoreForm({ data, updateData }: Props) {

    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [coverPreview, setCoverPreview] = useState<string | null>(null)

    const handleFileChange = (field: string, file: File | null) => {
        if (!file) return

        updateData({ [field]: file })

        const previewUrl = URL.createObjectURL(file)

        if (field === "store_logo") {
            setLogoPreview(previewUrl)
        }

        if (field === "store_cover") {
            setCoverPreview(previewUrl)
        }
    }

    return (
        <div className="card p-4">
            <div className="row">

                <div className="col-md-6 mb-3">
                    <label>Nom de la boutique</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.store_name}
                        onChange={(e) => updateData({ store_name: e.target.value })}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label>Téléphone boutique</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={data.store_phone}
                        onChange={(e) => updateData({ store_phone: e.target.value })}
                    />
                </div>

                <div className="col-md-12 mb-3">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        rows={4}
                        value={data.store_description}
                        onChange={(e) => updateData({ store_description: e.target.value })}
                    />
                </div>

                {/* LOGO */}
                <div className="col-md-6 mb-3">
                    <label>Logo</label>

                    {logoPreview && (
                        <div className="mb-2">
                            <img
                                src={logoPreview}
                                alt="Logo preview"
                                style={{
                                    width: 120,
                                    height: 120,
                                    objectFit: "cover",
                                    borderRadius: 8
                                }}
                            />
                        </div>
                    )}

                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) =>
                            handleFileChange("store_logo", e.target.files?.[0] || null)
                        }
                    />
                </div>

                {/* COVER */}
                <div className="col-md-6 mb-3">
                    <label>Image cover</label>

                    {coverPreview && (
                        <div className="mb-2">
                            <img
                                src={coverPreview}
                                alt="Cover preview"
                                style={{
                                    width: "100%",
                                    maxHeight: 150,
                                    objectFit: "cover",
                                    borderRadius: 8
                                }}
                            />
                        </div>
                    )}

                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) =>
                            handleFileChange("store_cover", e.target.files?.[0] || null)
                        }
                    />
                </div>

            </div>
        </div>
    )
}
