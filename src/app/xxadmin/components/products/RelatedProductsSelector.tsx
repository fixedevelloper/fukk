import { useEffect, useState } from "react";
import {Product} from "../../../../types/FrontType";


type Props = {
    selected?: number[];
    onChange?: (ids: number[]) => void;
};

export default function RelatedProductsSelector({
                                                    selected = [],
                                                    onChange,
                                                }: Props) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    // Charger produits sélectionnés (si édition)
    useEffect(() => {
        if (selected.length === 0) return;

        const fetchSelected = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products/by-ids`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ids: selected }),
                    }
                );

                const data = await response.json();
                setSelectedProducts(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSelected();
    }, [selected]);

    // Recherche produits
    useEffect(() => {
        if (search.length < 2) return;

        const delay = setTimeout(async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/products?search=${search}`
                );

                const data = await response.json();
                setResults(data.data);
            } catch (error) {
                console.error(error);
            }
        }, 400); // debounce

        return () => clearTimeout(delay);
    }, [search]);

    const handleAdd = (product: Product) => {
        if (selectedProducts.find((p) => p.id === product.id)) return;

        const updated = [...selectedProducts, product];
        setSelectedProducts(updated);
        onChange?.(updated.map((p) => p.id));
    };

    const handleRemove = (id: number) => {
        const updated = selectedProducts.filter((p) => p.id !== id);
        setSelectedProducts(updated);
        onChange?.(updated.map((p) => p.id));
    };

    return (
        <div className="card p-4 mt-4 rounded-4 shadow-sm">
            <h5 className="fw-bold mb-3">Produits associés</h5>

            {/* Search */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Search results */}
            {results.length > 0 && (
                <div className="border rounded-3 p-2 mb-3 bg-light">
                    {results.map((product) => (
                        <div
                            key={product.id}
                            className="d-flex justify-content-between align-items-center py-2 border-bottom"
                        >
                            <div className="d-flex align-items-center gap-2">
                                <img
                                    src={
                                        product.image?.thumb ||
                                        "/images/page/product/img-thumb.png"
                                    }
                                    width={40}
                                    height={40}
                                    style={{ objectFit: "cover", borderRadius: 6 }}
                                    alt={product.name}
                                />
                                <span>{product.name}</span>
                            </div>

                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleAdd(product)}
                            >
                                Ajouter
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Selected products */}
            {selectedProducts.length > 0 && (
                <div className="mt-3">
                    <p className="fw-semibold mb-2">Sélectionnés :</p>

                    <div className="d-flex flex-wrap gap-2">
                        {selectedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="badge bg-secondary d-flex align-items-center gap-2 p-2"
                            >
                                {product.name}
                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleRemove(product.id)}
                                >
                  ✕
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
