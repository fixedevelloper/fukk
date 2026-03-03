function EmptyState() {
    return (
        <div className="col-12 d-flex flex-column align-items-center justify-content-center py-5 fade-in">

            {/* SVG illustration */}
            <svg
                width="180"
                height="180"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-3"
            >
                <circle cx="100" cy="100" r="80" fill="#f1f3f5" />
                <path
                    d="M65 80h70v40H65z"
                    fill="#dee2e6"
                    stroke="#adb5bd"
                    strokeWidth="2"
                />
                <line
                    x1="65"
                    y1="80"
                    x2="135"
                    y2="120"
                    stroke="#adb5bd"
                    strokeWidth="2"
                />
                <line
                    x1="135"
                    y1="80"
                    x2="65"
                    y2="120"
                    stroke="#adb5bd"
                    strokeWidth="2"
                />
            </svg>

            <h5 className="fw-semibold">Aucun produit trouvé</h5>
            <p className="text-muted text-center" style={{ maxWidth: 300 }}>
                Essayez de modifier vos filtres ou revenez plus tard.
            </p>
        </div>
    );
}

export default EmptyState;