import { useWishlistStore } from "@/store/wishlistStore";
import Link from "next/link";

export default function WishlistLink() {
    const { items } = useWishlistStore();

    return (
        <Link className="font-lg icon-list icon-wishlist" href="/shop/shop-wishlist">
            <span>Liste souhaits</span>
            <span className="number-item font-xs">{items.length}</span>
        </Link>
    );
}
