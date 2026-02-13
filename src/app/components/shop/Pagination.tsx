"use client";

import { usePaginationStore } from "@/store/pagination.store";
import clsx from "clsx";
import React from "react";

export default function Pagination() {
    const { page, totalPages, setPage } = usePaginationStore();

    if (totalPages <= 1) return null;

    const pages = buildPages(page, totalPages);

    return (
        <ul className="pagination mt-30">
            {/* Prev */}
            <li
                className={clsx("page-item", { disabled: page === 1 })}
                onClick={() => page > 1 && setPage(page - 1)}
            >
                <span className="page-link page-prev">Prev</span>
            </li>

            {/* Pages */}
            {pages.map((p, index) =>
                p === "..." ? (
                    <li key={`ellipsis-${index}`} className="page-ellipsis">
                        <span>…</span>
                    </li>
                ) : (
                    <li
                        key={`page-${p}`}
                        className={clsx("page-item", { active: p === page })}
                        onClick={() => setPage(p as number)}
                    >
                        <span className="page-link">{p}</span>
                    </li>
                )
            )}

            {/* Next */}
            <li
                className={clsx("page-item", { disabled: page === totalPages })}
                onClick={() => page < totalPages && setPage(page + 1)}
            >
                <span className="page-link page-next">Next</span>
            </li>
        </ul>
    );
}

/* ------------------ */
/* Utils              */
/* ------------------ */

function buildPages(current: number, total: number): (number | "...")[] {
    const pages: (number | "...")[] = [];

    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
        return pages;
    }

    pages.push(1); // première page

    const left = Math.max(2, current - 1);
    const right = Math.min(total - 1, current + 1);

    if (left > 2) pages.push("..."); // ellipse gauche

    for (let i = left; i <= right; i++) {
        pages.push(i);
    }

    if (right < total - 1) pages.push("..."); // ellipse droite

    pages.push(total); // dernière page

    // Supprimer doublons accidentels
    return [...new Set(pages)];
}
