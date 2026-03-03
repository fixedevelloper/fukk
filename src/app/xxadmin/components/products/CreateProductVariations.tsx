import { useState } from "react";

type AttributeValue = {
    id: number;
    name: string;
};

export type Attribute = {
    id: number;
    name: string;
    values: AttributeValue[];
};

type Variation = {
    id?: number;
    attributes: number[];
    price: number;
    stock: number;
    sku: string;
    is_default: number;
};

type Props = {
    attributes: Attribute[];
    existingVariations?: Variation[];
    onChange: (variations: Variation[]) => void;
};

export default function CreateOrEditProductVariations({
                                                          attributes,
                                                          existingVariations = [],
                                                          onChange,
                                                      }: Props) {
    const [selectedAttributes, setSelectedAttributes] = useState<
        {
            attributeId: number;
            values: AttributeValue[];
        }[]
        >([]);

    const [variations, setVariations] =
        useState<Variation[]>(existingVariations);

    // 🔥 Génération des combinaisons (au clic bouton)
    const generateCombinations = () => {
        const valueArrays = selectedAttributes
            .map((attr) => attr.values)
            .filter((v) => v.length > 0);

        if (valueArrays.length === 0) {
            setVariations([]);
            onChange([]);
            return;
        }

        const cartesian = (arrays: AttributeValue[][]): AttributeValue[][] =>
            arrays.reduce(
                (acc, curr) =>
                    acc.flatMap((a) =>
                        curr.map((b) => [...a, b])
                    ),
                [[]] as AttributeValue[][]
            );

        const combinations = cartesian(valueArrays);

        const formatted: Variation[] = combinations.map(
            (combo) => {
                const attributeIds = combo.map((v) => v.id);

                const existing = variations.find(
                    (v) =>
                        JSON.stringify([...v.attributes].sort()) ===
                        JSON.stringify([...attributeIds].sort())
                );

                return (
                    existing || {
                        attributes: attributeIds,
                        price: 0,
                        stock: 0,
                        sku: "",
                        is_default: 0,
                    }
                );
            }
        );

        setVariations(formatted);
        onChange(formatted);
    };

    const handleFieldChange = <K extends keyof Variation>(
        index: number,
        field: K,
        value: Variation[K] // ✅ valeur doit correspondre au type du champ
    ) => {
        const updated = [...variations];
        updated[index][field] = value;

        // Gestion du champ is_default
        if (field === "is_default" && value === 1) {
            updated.forEach((v, i) => {
                if (i !== index) v.is_default = 0;
            });
        }

        setVariations(updated);
        onChange(updated);
    };

    // 🔎 Map pour afficher les noms
    const valueMap = attributes.reduce((acc, attr) => {
        attr.values.forEach((val) => {
            acc[val.id] = val.name;
        });
        return acc;
    }, {} as Record<number, string>);

    return (
        <div className="card p-4 rounded-4 mt-4 shadow-sm">
            <h5 className="fw-bold mb-3">
                Gestion des variations
            </h5>

            {/* Sélection attributs */}
            <div className="mb-4 row gap-2">
                {attributes.map((attr) => {
                    const selected = selectedAttributes.find(
                        (a) => a.attributeId === attr.id
                    );

                    return (

                            <div key={attr.id} className="mb-3 border p-3 rounded-3 col-md-3">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={!!selected}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedAttributes((prev) => [
                                                    ...prev,
                                                    {
                                                        attributeId: attr.id,
                                                        values: [],
                                                    },
                                                ]);
                                            } else {
                                                setSelectedAttributes((prev) =>
                                                    prev.filter(
                                                        (a) =>
                                                            a.attributeId !==
                                                            attr.id
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                    <label className="form-check-label fw-semibold">
                                        {attr.name}
                                    </label>
                                </div>

                                {/* Valeurs */}
                                {selected && (
                                    <div className="ms-4 mt-2">
                                        {attr.values.map((value) => {
                                            const isChecked =
                                                selected.values.some(
                                                    (v) =>
                                                        v.id === value.id
                                                );

                                            return (
                                                <div
                                                    key={value.id}
                                                    className="form-check"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        checked={isChecked}
                                                        onChange={(e) => {
                                                            setSelectedAttributes(
                                                                (prev) =>
                                                                    prev.map(
                                                                        (a) => {
                                                                            if (
                                                                                a.attributeId ===
                                                                                attr.id
                                                                            ) {
                                                                                if (
                                                                                    e
                                                                                        .target
                                                                                        .checked
                                                                                ) {
                                                                                    return {
                                                                                        ...a,
                                                                                        values: [
                                                                                            ...a.values,
                                                                                            value,
                                                                                        ],
                                                                                    };
                                                                                } else {
                                                                                    return {
                                                                                        ...a,
                                                                                        values: a.values.filter(
                                                                                            (
                                                                                                v
                                                                                            ) =>
                                                                                                v.id !==
                                                                                                value.id
                                                                                        ),
                                                                                    };
                                                                                }
                                                                            }
                                                                            return a;
                                                                        }
                                                                    )
                                                            );
                                                        }}
                                                    />
                                                    <label className="form-check-label">
                                                        {value.name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>


                    );
                })}
            </div>

            {/* Bouton génération */}
            <div className="mb-4">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={generateCombinations}
                >
                    Générer les combinaisons
                </button>
            </div>

            {/* Tableau */}
            {variations.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                        <thead className="table-light">
                        <tr>
                            <th>Combinaison</th>
                            <th>Prix (FCFA)</th>
                            <th>Stock</th>
                            <th>SKU</th>
                            <th>Default</th>
                        </tr>
                        </thead>
                        <tbody>
                        {variations.map((variation, index) => (
                            <tr key={index}>
                                <td>
                                    {variation.attributes
                                        .map(
                                            (id) =>
                                                valueMap[id] || id
                                        )
                                        .join(" - ")}
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={variation.price}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                index,
                                                "price",
                                                Number(
                                                    e.target.value
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={variation.stock}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                index,
                                                "stock",
                                                Number(
                                                    e.target.value
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={variation.sku}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                index,
                                                "sku",
                                                e.target.value
                                            )
                                        }
                                    />
                                </td>
                                <td className="text-center">
                                    <input
                                        type="radio"
                                        name="defaultVariation"
                                        checked={
                                            variation.is_default ===
                                            1
                                        }
                                        onChange={() =>
                                            handleFieldChange(
                                                index,
                                                "is_default",
                                                1
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
