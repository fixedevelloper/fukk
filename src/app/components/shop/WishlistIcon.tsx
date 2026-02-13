"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import Link from "next/link";

export function WishlistIcon() {
    const count = useWishlistStore((s) => s.items.length);

    return (
        <Link href="/wishlist" className="icon-wishlist">
            <span>Liste de souhaits</span>
            {count > 0 && <span className="number-item">{count}</span>}
        </Link>

    );
}
