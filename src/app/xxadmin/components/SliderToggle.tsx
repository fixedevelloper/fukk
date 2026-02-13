import React, {useState} from "react";

type Slider = {
    id: number;
    title: string;
    is_active: boolean;
};

export default function SliderToggle({ slider }: { slider: Slider }) {
    const [active, setActive] = useState(slider.is_active);
    const [loading, setLoading] = useState(false);

    const toggleStatus = async () => {
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/sliders/${slider.id}/toggle`,
                {
                    method: "PATCH",
                }
            );

            const data = await res.json();
            if (res.ok) {
                setActive(data.is_active);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleStatus}
            disabled={loading}
            className={`btn btn-sm ${active ? "btn-success" : "btn-secondary"}`}
        >
            {loading
                ? "..."
                : active
                    ? "Actif"
                    : "Inactif"}
        </button>
    );
}
