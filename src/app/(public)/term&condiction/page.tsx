// app/terms-and-conditions/page.tsx
export default function TermAndCondition() {
    return (
        <section className="section-box shop-template mt-30">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto page-content">
                        <h1 className="text-center mb-20">
                            Conditions Générales d’Utilisation
                        </h1>

                        <img
                            className="mb-30"
                            src="/assets/imgs/page/about/team.jpg"
                            alt="Conditions Générales FinduKarko"
                        />

                        <p>
                            Merci d’utiliser <strong>FinduKarko</strong>. La présente
                            politique a pour objectif de vous informer de la manière
                            dont vos données personnelles sont collectées, utilisées
                            et protégées.
                        </p>

                        <h2>1. Collecte des données personnelles</h2>

                        <h5>1.1 Définition</h5>
                        <p>
                            Les données personnelles désignent toute information
                            permettant d’identifier directement ou indirectement une
                            personne physique.
                        </p>

                        <h5>1.2 Données collectées</h5>
                        <p>
                            Selon les services utilisés, nous pouvons collecter :
                        </p>

                        <ul>
                            <li>Données d’identification (nom, email, téléphone)</li>
                            <li>Données de commande et de paiement</li>
                            <li>Données de navigation et cookies</li>
                            <li>Données techniques (IP, navigateur, appareil)</li>
                        </ul>

                        <h2>2. Cookies</h2>
                        <p>
                            Nous utilisons des cookies afin d’améliorer l’expérience
                            utilisateur, analyser le trafic et proposer des contenus
                            personnalisés.
                        </p>

                        <h2>3. Utilisation des données</h2>
                        <p>
                            Vos données sont utilisées uniquement pour :
                        </p>

                        <ul>
                            <li>Fournir et améliorer nos services</li>
                            <li>Gérer vos commandes</li>
                            <li>Assurer la sécurité de la plateforme</li>
                            <li>Respecter nos obligations légales</li>
                        </ul>

                        <h2>4. Partage des données</h2>
                        <p>
                            Vos données peuvent être partagées avec des prestataires
                            techniques ou partenaires de paiement uniquement dans le
                            cadre du service fourni.
                        </p>

                        <h2>5. Conservation des données</h2>
                        <p>
                            Les données sont conservées pendant la durée nécessaire
                            aux finalités pour lesquelles elles ont été collectées,
                            conformément à la législation en vigueur.
                        </p>

                        <h2>6. Vos droits</h2>
                        <p>
                            Conformément à la réglementation, vous disposez des droits
                            suivants :
                        </p>

                        <ul>
                            <li>Droit d’accès</li>
                            <li>Droit de rectification</li>
                            <li>Droit à l’effacement</li>
                            <li>Droit d’opposition</li>
                        </ul>

                        <p>
                            Pour exercer vos droits, veuillez nous contacter via la
                            page de contact.
                        </p>

                        <h4 className="text-center mt-40">
                            Merci de votre confiance.
                        </h4>
                    </div>
                </div>
            </div>
        </section>
    );
}
