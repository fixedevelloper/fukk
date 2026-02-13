import React from "react";

export function CallToAction() {
    return (
        <section className="section-box pt-50">
            <div className="container">
                <div className="row">

                    {/* iPhone */}
                    <div className="col-xl-3 col-lg-5 col-md-5 col-sm-12 mb-30">
                        <div className="bg-5 block-iphone" style={{
                            backgroundImage: `url(/images/homepage4/iphone-12.png)`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'bottom right',
                            backgroundSize: 'auto 160px',
                            padding: '25px 35px 25px 35px',
                            height: '250px'
                        }}>
                            <span className="color-brand-3 font-sm-lh32">À partir de 899FCFA</span>
                            <h3 className="font-xl mb-10">iPhone 12 Pro 128Go</h3>
                            <p className="font-base color-brand-3 mb-10">Offre spéciale</p>
                            <a className="btn btn-arrow" href="shop-grid.html">Voir le produit</a>
                        </div>
                    </div>

                    {/* Samsung TV */}
                    <div className="col-xl-4 col-lg-7 col-md-7 col-sm-12 mb-30">
                        <div className="bg-4 block-samsung" style={{
                            backgroundImage: `url(/images/homepage4/samsung-tv.png)`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'bottom right',
                            backgroundSize: 'auto 220px',
                            padding: '25px 200px 25px 35px',
                            height: '250px'
                        }}>
                            <span className="color-brand-3 font-sm-lh32">Nouveautés</span>
                            <h3 className="font-xl mb-10">TV LED Samsung 2022</h3>
                            <p className="font-base color-brand-3 mb-20">Offre spéciale</p>
                            <a className="btn btn-brand-2 btn-arrow-right" href="shop-grid.html">Voir le produit</a>
                        </div>
                    </div>

                    {/* Drone */}
                    <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12">
                        <div className="bg-6 block-drone" style={{
                            backgroundImage: `url(/images/homepage4/drone.png)`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'bottom right',
                            backgroundSize: 'auto 150px',
                            padding: '25px 200px 25px 35px',
                            height: '250px'
                        }}>
                            <h3 className="font-33 mb-20">Drone Quadcopter UAV - DJI Air 2S</h3>
                            <div className="mb-30"><strong className="font-18">Caméra Gimbal, Vidéo 5.4K</strong></div>
                            <a className="btn btn-brand-2 btn-arrow-right" href="shop-grid.html">Voir le produit</a>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )

}