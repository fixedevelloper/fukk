"use client"

import React, { useState } from "react"
import UserForm from "./UserForm"
import StoreForm from "./StoreForm"
import ReviewStep from "./ReviewStep"
import { createVendorWithStore } from "./actions"

export default function VendorWizard() {
    const [step, setStep] = useState(1)
    const [data, setData] = useState<any>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        store_name: "",
        store_phone: "",
        store_description: "",
        logo_id: null,
        cover_id: null,
        logo: null,
        cover: null,
    })

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

    const updateData = (fields: any) => setData((prev: any) => ({ ...prev, ...fields }))

    const handleSubmit = async () => {
        try {
            await createVendorWithStore(data)
            window.location.href = "/auth-vendor/signin" // redirection après succès
        } catch (err: any) {
            alert(err.message || "Erreur serveur")
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Créer votre compte et votre boutique</h2>

            <div className="mb-4">
                <div className="progress" style={{ height: "8px" }}>
                    <div
    className="progress-bar"
    role="progressbar"
    style={{width: `${(step / 3) * 100}%`}}
    />
                </div>
            </div>

            {step === 1 && <UserForm data={data} updateData={updateData} />}
            {step === 2 && <StoreForm data={data} updateData={updateData} />}
            {step === 3 && <ReviewStep data={data} />}

            <div className="mt-3 d-flex justify-content-between">
                {step > 1 && <button className="btn btn-secondary" onClick={prevStep}>Précédent</button>}
                {step < 3 ? (
                    <button className="btn btn-primary" onClick={nextStep}>Suivant</button>
                ) : (
                    <button className="btn btn-success" onClick={handleSubmit}>Terminer et créer</button>
                )}
            </div>
        </div>
    )
}
