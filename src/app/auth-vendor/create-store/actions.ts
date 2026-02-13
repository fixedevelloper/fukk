"use server"

import axiosServices from "../../../lib/axios"

export async function createVendorWithStore(data: any) {
    const formData = new FormData()
    formData.append("first_name", data.first_name)
    formData.append("last_name", data.last_name)
    formData.append("email", data.email)
    formData.append("phone", data.phone)
    formData.append("password", data.password)
    formData.append("store_name", data.store_name)
    formData.append("store_phone", data.store_phone || "")
    formData.append("store_description", data.store_description || "")
   formData.append("logo_id", data.logo_id)
   formData.append("cover_id", data.cover_id)


    const res = await axiosServices.post("/api/vendor/register-with-store", formData)
    console.log(res)
    if (res.status !== 201) throw new Error(res.data.message || "Erreur serveur")
}
