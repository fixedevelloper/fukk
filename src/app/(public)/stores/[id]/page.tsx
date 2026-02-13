import {Product, ResponsePaginate, Store} from "../../../../types/FrontType";
import {ProductShow} from "../../../components/shop/ProductShow";
import React from "react";
import {VendorLayout} from "../../../components/VendorLayout";

async function getStoreBySlug(id: number) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stores/${id}`,
        { cache: "no-store" }
    );

    if (!res.ok) return null;

    return res.json();
}

export default async function StoreShowPage({ params, }: {  params: Promise<{ id: number }>;}) {
    const { id } = await params;
    const data:Store = await getStoreBySlug(id);

    if (!data) {
        return <h2 className="text-center mt-5">Magasin introuvable</h2>;
    }

    return <VendorLayout store={data} />;
}
