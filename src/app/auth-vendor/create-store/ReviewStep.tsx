"use client"

type Props = { data: any }

export default function ReviewStep({ data }: Props) {
    return (
        <div className="card p-4">
            <h5>Vérifiez vos informations</h5>
            <ul>
                <li>Nom: {data.first_name} {data.last_name}</li>
                <li>Email: {data.email}</li>
                <li>Téléphone: {data.phone}</li>
                <li>Boutique: {data.store_name}</li>
                <li>Description: {data.store_description}</li>
            </ul>
        </div>
    )
}
