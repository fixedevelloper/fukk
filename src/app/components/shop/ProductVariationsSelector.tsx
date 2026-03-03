import { useMemo, useState, useEffect } from "react";
import { Variation } from "../../../types/FrontType";

type Props = {
    variations: Variation[];
    basePrice: number;
    onVariationChange?: (variation: Variation | null) => void;
};

export default function ProductVariationsSelector({
                                                      variations,
                                                      basePrice,
                                                      onVariationChange,
                                                  }: Props) {
    const [selectedValues, setSelectedValues] =
        useState<Record<number, number>>({});

    /* ================= ATTRIBUTES ================= */

    const attributes = useMemo(() => {
        const map: Record<
            number,
            { name: string; values: { id: number; name: string }[] }
            > = {};

        variations.forEach((variation) => {
            variation.attributes.forEach((attr) => {
                if (!map[attr.attribute_id]) {
                    map[attr.attribute_id] = {
                        name: attr.attribute_name,
                        values: [],
                    };
                }

                if (
                    !map[attr.attribute_id].values.some(
                        (v) => v.id === attr.value_id
                    )
                ) {
                    map[attr.attribute_id].values.push({
                        id: attr.value_id,
                        name: attr.value_name,
                    });
                }
            });
        });

        return map;
    }, [variations]);

    /* ================= SELECTED VARIATION ================= */

    const selectedVariation = useMemo(() => {
        const selectedIds = Object.values(selectedValues);

        if (
            selectedIds.length !== Object.keys(attributes).length
        )
            return null;

        return (
            variations.find((variation) =>
                variation.attributes.every((attr) =>
                    selectedIds.includes(attr.value_id)
                )
            ) || null
        );
    }, [selectedValues, variations, attributes]);

    useEffect(() => {
        onVariationChange?.(selectedVariation);
    }, [selectedVariation]);

    /* ================= DISABLE LOGIC ================= */

    const isValueAvailable = (
        attributeId: number,
        valueId: number
    ) => {
        const testSelection = {
            ...selectedValues,
            [attributeId]: valueId,
        };

        return variations.some((variation) =>
            variation.attributes.every((attr) => {
                const selected =
                    testSelection[attr.attribute_id];
                return (
                    !selected ||
                    selected === attr.value_id
                );
            })
        );
    };

    return (
        <div className="variation-card mt-4">

            {/* ATTRIBUTES */}
            {Object.entries(attributes).map(
                ([attributeId, attribute]) => (
                    <div key={attributeId} className="mb-4">
                        <label className="variation-label">
                            {attribute.name}
                        </label>

                        <div className="variation-options">
                            {attribute.values.map((value) => {
                                const isActive =
                                    selectedValues[
                                        Number(attributeId)
                                        ] === value.id;

                                const disabled =
                                    !isValueAvailable(
                                        Number(attributeId),
                                        value.id
                                    );

                                return (
                                    <button
                                        key={value.id}
                                        type="button"
                                        disabled={disabled}
                                        className={`variation-btn ${
                                            isActive
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setSelectedValues(
                                                (prev) => ({
                                                    ...prev,
                                                    [
                                                        Number(
                                                            attributeId
                                                        )
                                                        ]: value.id,
                                                })
                                            )
                                        }
                                    >
                                        {value.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )
            )}

            {/* PRICE & STOCK */}
            <div className="variation-info">
                <div className="variation-price">
                    {selectedVariation
                        ? `${selectedVariation.price} FCFA`
                        : `${basePrice} FCFA`}
                </div>

                {selectedVariation && (
                    <div
                        className={`variation-stock ${
                            selectedVariation.stock > 0
                                ? "in-stock"
                                : "out-stock"
                        }`}
                    >
                        {selectedVariation.stock > 0
                            ? `En stock (${selectedVariation.stock})`
                            : "Rupture de stock"}
                    </div>
                )}
            </div>
        </div>
    );
}

