import { useState } from "react";

type CollapseCardProps = {
    title: string
    children: React.ReactNode
    defaultOpen?: boolean
}

export function CollapseCard({ title, children, defaultOpen = true }: CollapseCardProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="card mb-4">
            <div
                className="card-header d-flex justify-content-between align-items-center cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(!open)}
            >
                <h4 className="mb-0">{title}</h4>
                <span>{open ? "−" : "+"}</span>
            </div>

            {open && (
                <div className="card-body">
                    {children}
                </div>
            )}
        </div>
    );
}
