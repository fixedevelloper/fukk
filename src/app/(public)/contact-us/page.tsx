// app/contact/page.tsx
export default function ContactPage() {
    return (
        <section className="section-box shop-template mt-0">
            <div className="container">
                <div className="box-contact">
                    <div className="row">
                        {/* FORM */}
                        <div className="col-lg-6">
                            <div className="contact-form">
                                <h1 className="color-brand-3 mt-60">
                                    Contactez-nous
                                </h1>
                                <p className="font-sm color-gray-700 mb-30">
                                    Notre équipe est ravie d’échanger avec vous.
                                </p>

                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Prénom"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Nom"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="email"
                                                placeholder="Adresse email"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="tel"
                                                placeholder="Numéro de téléphone"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                placeholder="Votre message"
                                                rows={5}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <input
                                                className="btn btn-buy w-auto"
                                                type="submit"
                                                value="Envoyer le message"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MAP */}
                        <div className="col-lg-6">
                            <div className="map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325467.51371614134!2d-73.98947743776016!3d40.72209526768085"
                                    height="550"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    aria-label="Carte Google Maps"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ADDRESSES */}
                <div className="box-contact-address pt-80 pb-50">
                    <div className="row">
                        <div className="col-lg-3 mb-30">
                            <h3 className="mb-5">Nos boutiques</h3>
                            <p className="font-sm color-gray-700 mb-30">
                                Retrouvez-nous dans ces villes
                            </p>
                            <a className="btn btn-buy w-auto">Voir la carte</a>
                        </div>

                        {[
                            "Melbourne",
                            "San Francisco",
                            "Byron Bay",
                            "Sydney",
                            "Stockholm",
                            "Hanoï",
                            "Bangkok",
                            "Séoul",
                            "Paris",
                        ].map((city, i) => (
                            <div className="col-lg-3" key={i}>
                                <div className="mb-30">
                                    <h4>{city}</h4>
                                    <p className="font-sm color-gray-700">
                                        205 North Michigan Avenue, Suite 810
                                        <br />
                                        Chicago, 60601, USA
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SUPPORT */}
            <div className="box-contact-support pt-80 pb-50 background-gray-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 mb-30 text-center text-lg-start">
                            <h3 className="mb-5">
                                Nous sommes à votre écoute
                            </h3>
                            <p className="font-sm color-gray-700">
                                Discutez avec notre équipe
                            </p>
                        </div>

                        <div className="col-lg-3 text-center mb-30">
                            <div className="box-image mb-20">
                                <img
                                    src="/images/page/contact/chat.svg"
                                    alt="Chat FinduKarko"
                                />
                            </div>
                            <h4 className="mb-5">Ventes</h4>
                            <p className="font-sm color-gray-700 mb-5">
                                Contactez notre équipe commerciale
                            </p>
                            <a
                                className="font-sm color-gray-900"
                                href="mailto:sales@FinduKarko.com"
                            >
                                sales@FinduKarko.com
                            </a>
                        </div>

                        <div className="col-lg-3 text-center mb-30">
                            <div className="box-image mb-20">
                                <img
                                    src="/images/page/contact/call.svg"
                                    alt="Téléphone"
                                />
                            </div>
                            <h4 className="mb-5">Téléphone</h4>
                            <p className="font-sm color-gray-700 mb-5">
                                Lun–Ven : 8h à 17h
                            </p>
                            <a
                                className="font-sm color-gray-900"
                                href="tel:+15550000000"
                            >
                                +1 (555) 000-0000
                            </a>
                        </div>

                        <div className="col-lg-3 text-center mb-30">
                            <div className="box-image mb-20">
                                <img
                                    src="/images/page/contact/map.svg"
                                    alt="Adresse"
                                />
                            </div>
                            <h4 className="mb-5">Nous rendre visite</h4>
                            <p className="font-sm color-gray-700 mb-5">
                                Bureau principal
                            </p>
                            <span className="font-sm color-gray-900">
                                205 North Michigan Avenue, Suite 810
                                <br />
                                Chicago, 60601, USA
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
