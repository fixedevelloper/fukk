"use client"

type Props = {
    data: any
    updateData: (fields: any) => void
}

export default function UserForm({ data, updateData }: Props) {
    return (
        <div className="card p-4">
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Prénom</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.first_name}
                        onChange={(e) => updateData({ first_name: e.target.value })}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.last_name}
                        onChange={(e) => updateData({ last_name: e.target.value })}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={data.email}
                        onChange={(e) => updateData({ email: e.target.value })}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Téléphone</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={data.phone}
                        onChange={(e) => updateData({ phone: e.target.value })}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        value={data.password}
                        onChange={(e) => updateData({ password: e.target.value })}
                    />
                </div>
            </div>
        </div>
    )
}
