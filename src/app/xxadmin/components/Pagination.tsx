import React from "react";

type PaginationProps = {
    currentPage: number
    lastPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({
                                       currentPage,
                                       lastPage,
                                       onPageChange,
                                   }: PaginationProps) {

    if (lastPage <= 1) return null

    const handleChange = (page: number) => {
        if (page < 1 || page > lastPage) return
        if (page === currentPage) return
        onPageChange(page)
    }

    const getPages = () => {
        const pages: (number | string)[] = []

        const start = Math.max(2, currentPage - 1)
        const end = Math.min(lastPage - 1, currentPage + 1)

        pages.push(1)

        if (start > 2) {
            pages.push('...')
        }

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (end < lastPage - 1) {
            pages.push('...')
        }

        if (lastPage > 1) {
            pages.push(lastPage)
        }

        return pages
    }

    const pages = getPages()

    return (
        <div className="pagination-area mt-15 mb-50">
            <nav>
                <ul className="pagination justify-content-start">

                    {/* Previous */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => handleChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <i className="material-icons md-chevron_left" />
                        </button>
                    </li>

                    {pages.map((page, index) =>
                        page === '...' ? (
                            <li key={`dot-${index}`} className="page-item">
                                <span className="page-link dot">...</span>
                            </li>
                        ) : (
                            <li
                                key={page}
                                className={`page-item ${
                                    currentPage === page ? 'active' : ''
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => typeof page === "number" && handleChange(page)}

                                >
                                    {page}
                                 {/*   {String(page).padStart(2, '0')}*/}
                                </button>
                            </li>
                        )
                    )}

                    {/* Next */}
                    <li
                        className={`page-item ${
                            currentPage === lastPage ? 'disabled' : ''
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => handleChange(currentPage + 1)}
                            disabled={currentPage === lastPage}
                        >
                            <i className="material-icons md-chevron_right" />
                        </button>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
