import React from "react";

export function CallToAction2() {

    return (
        <section className="section-box pt-50">
            <div className="container">
                <div className="row">

                    {/* Power Bank */}
                    <div className="col-xl-4 col-lg-7 col-md-7 col-sm-12 mb-30">
                        <div
                            className="bg-4 block-charge"
                            style={{
                                backgroundImage: `url(/images/homepage4/powerbank.avif)`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "bottom right",
                                backgroundSize: "auto 100%",
                                padding: "25px 200px 25px 35px",
                                height: "250px"
                            }}
                        >
                    <span className="color-brand-3 font-sm-lh32">
                        Batterie externe
                    </span>
                            <h3 className="font-xl mb-10">
                                Anker PowerCore 20 000 mAh
                            </h3>
                            <p className="font-base color-brand-3 mb-20">
                                Charge rapide USB-C<br className="d-none d-lg-block" />
                                Haute capacité et compacte
                            </p>
                            <a className="btn btn-brand-2 btn-arrow-right" href="/shop">
                                Acheter maintenant
                            </a>
                        </div>
                    </div>

                    {/* Manette PS5 */}
                    <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 mb-30">
                        <div
                            className="bg-6 block-player"
                            style={{
                                backgroundImage: `url(/images/homepage4/PS5-Controller.png)`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "bottom right",
                                backgroundSize: "auto 90%",
                                padding: "25px 200px 25px 35px",
                                height: "250px"
                            }}
                        >
                            <h3 className="font-33 mb-20">
                                Manette Sony DualSense PS5
                            </h3>
                            <div className="mb-30">
                                <strong className="font-16">
                                    Retour haptique & gâchettes adaptatives
                                </strong>
                            </div>
                            <a className="btn btn-brand-3 btn-arrow-right" href="/shop">
                                En savoir plus
                            </a>
                        </div>
                    </div>

                    {/* iPhone */}
                    <div className="col-xl-3 col-lg-5 col-md-5 col-sm-12 mb-30">
                        <div
                            className="bg-5 block-iphone"
                            style={{
                                backgroundImage: `url(/images/homepage4/iphone-12.png)`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "bottom right",
                                backgroundSize: "auto 160px",
                                padding: "25px 35px",
                                height: "250px"
                            }}
                        >
                    <span className="color-brand-3 font-sm-lh32">
                        À partir de 1 199 €
                    </span>
                            <h3 className="font-xl mb-10">
                                iPhone 15 Pro 128 Go
                            </h3>
                            <p className="font-base color-brand-3 mb-10">
                                Nouvelle génération
                            </p>
                            <a className="btn btn-arrow" href="/shop">
                                En savoir plus
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )

}