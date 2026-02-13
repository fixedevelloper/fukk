import Link from "next/link";

export default function NotFound() {
    return (
        <section className="section-box shop-template mt-60">
            <div className="container">
                <div className="text-center mb-150 mt-50">
                    <div className="image-404 mb-50">
                        <img src="/images/page/account/404.png" alt="Page introuvable" />
                    </div>

                    <h3>404 – Page introuvable</h3>

                    <p className="font-md-bold color-gray-600">
                        Oups 😅 la page que vous recherchez n’existe pas ou a été déplacée.
                    </p>

                    <div className="mt-15">
                        <Link href="/" className="btn btn-buy w-auto arrow-back">
                            Retour à l’accueil
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
