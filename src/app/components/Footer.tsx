import Link from "next/link";

export default function Footer() {
    return (


        <footer className="footer">
            <div className="footer-1">
                <div className="container">
                    <div className="row">
                        {/* Contact */}
                        <div className="col-lg-3 width-25 mb-30">
                            <h4 className="mb-30 color-gray-1000">Contact</h4>
                            <div className="font-md mb-20 color-gray-900">
                                <strong className="font-md-bold">Adresse :</strong> Fin goundron Mbangue, Douala, Cameroun
                            </div>
                            <div className="font-md mb-20 color-gray-900">
                                <strong className="font-md-bold">Téléphone :</strong> 675 06 69 19 / 657 28 50 50
                            </div>
                            <div className="font-md mb-20 color-gray-900">
                                <strong className="font-md-bold">E-mail :</strong> contact@findkarko.com
                            </div>
                            <div className="font-md mb-20 color-gray-900">
                                <strong className="font-md-bold">Horaires :</strong> 8:00 - 17:00, Lun - Sam
                            </div>
                            <div className="mt-30">
                                <a className="icon-socials icon-facebook" href="#"/>
                                <a className="icon-socials icon-instagram" href="#"/>
                                <a className="icon-socials icon-twitter" href="#"/>
                                <a className="icon-socials icon-linkedin" href="#"/>
                            </div>
                        </div>

                        {/* Make Money with Us */}
                        <div className="col-lg-3 width-20 mb-30">
                            <h4 className="mb-30 color-gray-1000">Gagnez de l'argent avec nous</h4>
                            <ul className="menu-footer">
                                <li><a href="page-about-us.html">Mission & Vision</a></li>
                                <li><a href="page-about-us.html">Notre équipe</a></li>
                                <li><a href="page-careers.html">Carrières</a></li>
                                <li><a href="#">Presse & Médias</a></li>
                                <li><a href="#">Publicité</a></li>
                                <li><a href="#">Témoignages</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="col-lg-3 width-16 mb-30">
                            <h4 className="mb-30 color-gray-1000">Entreprise</h4>
                            <ul className="menu-footer">
                                <li><Link href="blog">Notre blog</Link></li>
                                <li><Link href="#">Plans & Tarifs</Link></li>
                                <li><Link href="#">Base de connaissances</Link></li>
                                <li><Link href="#">Politique de cookies</Link></li>
                                <li><Link href="#">Centre d'affaires</Link></li>
                                <li><Link href="blog.html">Actualités & Événements</Link></li>
                            </ul>
                        </div>

                        {/* My account */}
                        <div className="col-lg-3 width-16 mb-30">
                            <h4 className="mb-30 color-gray-1000">Mon compte</h4>
                            <ul className="menu-footer">
                                <li><Link href="#">FAQs</Link></li>
                                <li><Link href="#">Aide de l’éditeur</Link></li>
                                <li><Link href="#">Communauté</Link></li>
                                <li><Link href="#">Chat en direct</Link></li>
                                <li><Link href="/contact-us">Nous contacter</Link></li>
                                <li><a href="#">Centre de support</a></li>
                            </ul>
                        </div>

                        {/* App & Payment */}
                        <div className="col-lg-3 width-23">
                            <h4 className="mb-30 color-gray-1000">Application & Paiement</h4>
                            <div>
                                <p className="font-md color-gray-900">
                                    Téléchargez nos applications et obtenez 15% de réduction supplémentaire sur votre première commande !
                                </p>
                                <div className="mt-20">
                                    <a className="mr-10" href="#"><img src="/images/template/appstore.png" alt="Ecom"/></a>
                                    <a href="#"><img src="/images/template/google-play.png" alt="Ecom"/></a>
                                </div>
                                <p className="font-md color-gray-900 mt-20 mb-10">Passerelles de paiement sécurisées</p>
                                <img src="/images/template/payment-method.png" alt="Ecom"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="footer-2">
                <div className="container">
                    <div className="footer-bottom mt-20">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 text-center text-lg-start">
                                <span className="color-gray-900 font-sm">Copyright © 2026 Find Karko. Tous droits réservés.</span>
                            </div>
                            <div className="col-lg-6 col-md-12 text-center text-lg-end">
                                <ul className="menu-bottom">
                                    <li><Link className="font-sm color-gray-900" href="/term&condiction">Conditions d'utilisation</Link></li>
                                    <li><a className="font-sm color-gray-900" href="/term&condiction">Politique de confidentialité</a></li>
                                    <li><a className="font-sm color-gray-900" href="page-careers.html">Publicité basée sur les centres d'intérêt</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )

}