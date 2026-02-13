import {useState} from "react";
import {useRoleVisibility} from "../../../hook/useRoleVisibility";

const attributePresets = [
    { name: "Taille", values: "S;M;L;XL" },
    { name: "Couleur", values: "Rouge;Bleu;Noir" },
    { name: "Pointure", values: "38;39;40;41;42" },
];

export default function ProductAttributes({ onChange }: { onChange?: Function }) {
    const [attributes, setAttributes] = useState<any[]>([]);

    const sync = (data: any[]) => {
        setAttributes(data);
        onChange && onChange(data);
    };

    const addEmptyAttribute = () => {
        sync([
            ...attributes,
            { id: Date.now(), name: "", values: "" },
        ]);
    };

    const addPresetAttribute = (preset: any) => {
        if (attributes.some(a => a.name === preset.name)) return;

        sync([
            ...attributes,
            {
                id: Date.now(),
                name: preset.name,
                values: preset.values,
            },
        ]);
    };

    const updateAttribute = (id: number, field: string, value: string) => {
        sync(
            attributes.map(attr =>
                attr.id === id ? { ...attr, [field]: value } : attr
            )
        );
    };

    const removeAttribute = (id: number) => {
        sync(attributes.filter(attr => attr.id !== id));
    };
    const showAdminMenu = useRoleVisibility("super_admin");
    return (
        <div className="card mb-4">
            <div className="card-header">
                <h4>Attributs</h4>
            </div>

            <div className="card-body">
                {/* Actions */}
                <div className="row mb-3">
                    <div className="col-md-6">
                        {showAdminMenu && (    <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={addEmptyAttribute}
                        >
                            Add
                        </button>)}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Attributs prédéfinis</label>
                        <select
                            className="form-select"
                            onChange={(e) => {
                                const preset = attributePresets.find(
                                    p => p.name === e.target.value
                                );
                                if (preset) addPresetAttribute(preset);
                                e.target.value = "";
                            }}
                        >
                            <option value="">-- Choisir --</option>
                            {attributePresets.map((preset) => (
                                <option key={preset.name} value={preset.name}>
                                    {preset.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Attribute items */}
                {attributes.map((attr) => (
                    <div className="row mb-3" key={attr.id}>
                        <div className="col-lg-5">
                            <input
                                className="form-control"
                                value={attr.name}
                                onChange={(e) =>
                                    updateAttribute(attr.id, "name", e.target.value)
                                }
                                placeholder="Nom (ex: Taille)"
                            />
                        </div>

                        <div className="col-lg-6">
                            <input
                                className="form-control"
                                value={attr.values}
                                onChange={(e) =>
                                    updateAttribute(attr.id, "values", e.target.value)
                                }
                                placeholder="Valeurs (ex: S;M;L)"
                            />
                        </div>

                        <div className="col-lg-1">
                            <button
                                className="btn btn-sm btn-danger w-100"
                                onClick={() => removeAttribute(attr.id)}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}

                {attributes.length === 0 && (
                    <p className="text-muted">Aucun attribut ajouté</p>
                )}
            </div>
        </div>
    );
}
