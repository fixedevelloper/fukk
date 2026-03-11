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
                                <li><Link href="contact">Mission & Vision</Link></li>
                                <li><Link href="/">Comment devenir vendeur</Link></li>
                                <li><Link href="/">Ouvrir la boutique</Link></li>
                                <li><Link href="/">Témoignages</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="col-lg-3 width-16 mb-30">
                            <h4 className="mb-30 color-gray-1000">Entreprise</h4>
                            <ul className="menu-footer">
                                <li><Link href="/">Conditions générales de vente</Link></li>
                                <li><Link href="/">Retour & Remboursement</Link></li>
                                <li><Link href="/">Politique de cookies</Link></li>
                                <li><Link href="/">Actualités & Événements</Link></li>
                            </ul>
                        </div>

                        {/* My account */}
                        <div className="col-lg-3 width-16 mb-30">
                            <h4 className="mb-30 color-gray-1000">Mon compte</h4>
                            <ul className="menu-footer">
                                <li><Link href="#">FAQs</Link></li>
                                <li><Link href="#">Aide de l’éditeur</Link></li>
                                <li><Link href="#">Chat en direct</Link></li>
                                <li><Link href="/contact-us">Nous contacter</Link></li>
                                <li><Link href="#">Centre de support</Link></li>
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
                                    <a className="mr-10" href="#"><img src="/images/template/appstore.png" alt="FinduKarko"/></a>
                                    <a href="#"><img src="/images/template/google-play.png" alt="FinduKarko"/></a>
                                </div>
                                <p className="font-md color-gray-900 mt-20 mb-10">Passerelles de paiement sécurisées</p>
                                <img src="/images/template/payment-method.png" alt="FinduKarko"/>
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