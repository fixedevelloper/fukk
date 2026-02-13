"use client"

import { CategoryMediaCard } from "../../xxadmin/components/CategoryMediaCard"

type Props = {
    data: any
    updateData: (fields: any) => void
}

export default function StoreForm({ data, updateData }: Props) {
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

                <div className="col-md-6 mb-3">
                    <label>Logo</label>
                    <CategoryMediaCard
                        selectedImage={data.logo}
                        onChange={(img) => updateData({
                            logo_id: img?.id,
                            logo:data.logo
                        }
                            )
                        }
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label>Image cover</label>
                    <CategoryMediaCard
                        selectedImage={data.cover}
                        onChange={(img) => updateData({
                                cover_id: img?.id ,
                                cover:data.cover
                        }
                        )}
                    />
                </div>
            </div>
        </div>
    )
}
