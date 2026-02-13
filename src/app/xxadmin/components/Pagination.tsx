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

    const pages = []

    for (let i = 1; i <= lastPage; i++) {
        if (
            i === 1 ||
            i === lastPage ||
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            pages.push(i)
        } else if (pages[pages.length - 1] !== '...') {
            pages.push('...')
        }
    }

    return (
        <div className="pagination-area mt-15 mb-50">
            <nav>
                <ul className="pagination justify-content-start">

                    {/* Previous */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            <i className="material-icons md-chevron_left" />
                        </button>
                    </li>

                    {pages.map((page, index) =>
                        page === '...' ? (
                            <li key={index} className="page-item">
                                <span className="page-link dot">...</span>
                            </li>
                        ) : (
                            <li
                                key={index}
                                className={`page-item ${
                                    currentPage === page ? 'active' : ''
                                }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => onPageChange(page as number)}
                                >
                                    {String(page).padStart(2, '0')}
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
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            <i className="material-icons md-chevron_right" />
                        </button>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
