import { useState } from "react";

type AttributeValue = {
    id: number;
    name: string;
    value?: string; // ex: #000000 pour couleur
    image?: string;
};

type Attribute = {
    id: number;
    name: string;
    type?: "color" | "image" | "text";
    values: AttributeValue[];
};

type Props = {
    attributes?: Attribute[];
    onChange?: (selected: Record<number, number>) => void;
};

export default function ProductShopAttributes({
                                              attributes,
                                              onChange,
                                          }: Props) {
    const [selectedValues, setSelectedValues] = useState<Record<number, number>>(
        {}
    );

    if (!attributes || attributes.length === 0) return null;

    const handleSelect = (attributeId: number, valueId: number) => {
        const updated = {
            ...selectedValues,
            [attributeId]: valueId,
        };

        setSelectedValues(updated);
        onChange?.(updated);
    };

    return (
        <div className="mt-4">
            {attributes.map((attribute) => {
                const selected = selectedValues[attribute.id];

                return (
                    <div key={attribute.id} className="mb-4">
                        <p className="fw-semibold mb-2">
                            {attribute.name} :{" "}
                            <span className="text-primary">
                {
                    attribute.values.find((v) => v.id === selected)?.name
                }
              </span>
                        </p>

                        <div className="d-flex flex-wrap gap-2">
                            {attribute.values.map((value) => {
                                const isActive = selected === value.id;

                                // TYPE COLOR
                                if (attribute.type === "color") {
                                    return (
                                        <div
                                            key={value.id}
                                            onClick={() =>
                                                handleSelect(attribute.id, value.id)
                                            }
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: "50%",
                                                backgroundColor: value.value || "#ccc",
                                                cursor: "pointer",
                                                border: isActive
                                                    ? "3px solid #0d6efd"
                                                    : "2px solid #eee",
                                                transition: "0.2s",
                                            }}
                                            title={value.name}
                                        />
                                    );
                                }

                                // TYPE IMAGE
                                if (attribute.type === "image") {
                                    return (
                                        <div
                                            key={value.id}
                                            onClick={() =>
                                                handleSelect(attribute.id, value.id)
                                            }
                                            className={`border rounded-3 p-1 ${
                                                isActive
                                                    ? "border-primary shadow-sm"
                                                    : "border-light"
                                            }`}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <img
                                                src={
                                                    value.image ||
                                                    "/images/page/product/img-thumb.png"
                                                }
                                                alt={value.name}
                                                width={50}
                                                height={50}
                                                style={{
                                                    borderRadius: "8px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                    );
                                }

                                // TYPE TEXT (taille, stockage, etc.)
                                return (
                                    <button
                                        key={value.id}
                                        onClick={() =>
                                            handleSelect(attribute.id, value.id)
                                        }
                                        className={`btn ${
                                            isActive
                                                ? "btn-primary"
                                                : "btn-outline-secondary"
                                        }`}
                                    >
                                        {value.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
