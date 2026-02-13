"use server"

import { revalidatePath } from "next/cache"

const API = process.env.NEXT_PUBLIC_API_URL

export async function createBrand(formData: FormData) {
    console.log(API)
    await fetch(`${API}/api/brands`, {
        method: "POST",
        body: JSON.stringify({
            name: formData.get("name"),
            image_id: Number(formData.get("image_id")) || null,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })

    revalidatePath("/admin/brands")
}

export async function updateBrand(id: number, formData: FormData) {
    await fetch(`${API}/api/brands/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            name: formData.get("name"),
            image_id: Number(formData.get("image_id")) || null,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })

    revalidatePath("/admin/brands")
}

export async function deleteBrand(id: number) {
    await fetch(`${API}/api/brands/${id}`, {
        method: "DELETE",
    })

    revalidatePath("/admin/brands")
}
