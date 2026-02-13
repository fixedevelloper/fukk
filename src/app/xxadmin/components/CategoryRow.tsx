import { useState } from "react";
import {Category} from "../../../types/FrontType";


export default function CategoryRow({ cat, onEdit, onDelete }: { cat: Category; onEdit: (c: Category) => void; onDelete: (c: Category) => void }) {
    const [open, setOpen] = useState(false);

    return (
        <tr>
            <td>{cat.id}</td>
            <td>  <img
                src={cat.image?.thumb}
                alt={cat.image?.alt}
                style={{ width: 50, height: 50, objectFit: "cover" }}
            /></td>
            <td>{cat.name}</td>
            <td>{cat.description}</td>
            <td>{cat.slug}</td>
            <td className="text-end">
                <div className="dropup position-relative">
                    <button
                        className="btn btn-light btn-sm"
                        type="button"
                        onClick={() => setOpen(!open)}
                    >
                        <i className="material-icons md-more_horiz" />
                    </button>

                    {open && (
                        <ul
                            className="dropdown-menu show"
                            style={{ position: "absolute", bottom: "100%", right: 0 }}
                        >
                            <li>
                                <button
                                    className="dropdown-item"
                                    type="button"
                                    onClick={() => { onEdit(cat); setOpen(false); }}
                                >
                                    Edit
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item text-danger"
                                    type="button"
                                    onClick={() => { onDelete(cat); setOpen(false); }}
                                >
                                    Delete
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </td>
        </tr>
    );
}
