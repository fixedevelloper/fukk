"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCheckoutStore } from "../../../../store/useCheckoutStore";

interface CheckoutAccordionProps {
    isAuthenticated: boolean;
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    placeOrder: () => void;
    loading: boolean;
}

export function CheckoutAccordion({
                                      isAuthenticated,
                                      form,
                                      setForm,
                                      placeOrder,
                                      loading,
                                  }: CheckoutAccordionProps) {
    const { setShipping } = useCheckoutStore();
    const [openSection, setOpenSection] = useState("address");
    const [cities, setCities] = useState([]);
    const [zones, setZones] = useState([]);
    const [cityId, setCityId] = useState("");
    const [shippingMethods, setShippingMethods] = useState([]);
    const [shippingLoading, setShippingLoading] = useState(false);

    // Charger les villes
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/app-cities`
                );

                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des villes");
                }

                const data = await response.json();
                setCities(data.data);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        fetchCities();
    }, []);



    // Charger les zones quand ville change
    useEffect(() => {
        if (!cityId) return;

        const controller = new AbortController();

        const fetchZones = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/zones/by-city?city_id=${cityId}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des zones");
                }

                const data = await response.json();
                setZones(data.data);
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error(error);
                }
            }
        };

        fetchZones();

        setForm((prev: any) => ({
            ...prev,
            zone_id: "",
            shipping_method: "",
            shipping_price: 0,
        }));

        return () => controller.abort();

    }, [cityId]);


    // Charger shipping methods
    useEffect(() => {
        if (!cityId || !form.zone_id) return;

        const controller = new AbortController();

        const fetchShippingMethods = async () => {
            try {
                setShippingLoading(true);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/shipping-methods/by-city`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            city_id: cityId,
                            zone_id: form.zone_id,
                        }),
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error("Erreur lors du chargement");
                }

                const data = await response.json();
                setShippingMethods(data.data);
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error(error);
                }
            } finally {
                setShippingLoading(false);
            }
        };

        fetchShippingMethods();

        return () => controller.abort();
    }, [cityId, form.zone_id]);


    const toggleSection = (section: string) =>
        setOpenSection((prev) => (prev === section ? "" : section));

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="col-lg-6">
            {/* Adresse */}
            <div className="box-border mb-3">
                <button
                    type="button"
                    className="w-100 text-start font-md-bold bg-light py-2 px-3 border"
                    onClick={() => toggleSection("address")}
                >
                    Adresse de livraison
                </button>
                {openSection === "address" && (
                    <div className="p-3 border-top">
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <input
                                    name="name"
                                    className="form-control"
                                    placeholder="Prénom"
                                    value={form.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-2">
                                <input
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-2">
                                <input
                                    name="phone"
                                    className="form-control"
                                    placeholder="Téléphone"
                                    value={form.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-12 mb-2">
                                <input
                                    name="address"
                                    className="form-control"
                                    placeholder="Adresse"
                                    value={form.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-6 mb-2">
                                <select
                                    className="form-select"
                                    value={cityId}
                                    onChange={(e) => setCityId(e.target.value)}
                                >
                                    <option value="">Sélectionner une ville</option>
                                    {cities.map((city: any) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 mb-2">
                                <select
                                    name="zone_id"
                                    className="form-select"
                                    value={form.zone_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Sélectionner une zone</option>
                                    {zones.map((zone: any) => (
                                        <option key={zone.id} value={zone.id}>{zone.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-12 mb-2">
                <textarea
                    name="note"
                    className="form-control"
                    rows={3}
                    placeholder="Note additionnelle"
                    value={form.note}
                    onChange={handleInputChange}
                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Livraison */}
            <div className="box-border mb-3">
                <button
                    type="button"
                    className="w-100 text-start font-md-bold bg-light py-2 px-3 border"
                    onClick={() => toggleSection("shipping")}
                >
                    Méthode de livraison
                </button>
                {openSection === "shipping" && (
                    <div className="p-3 border-top">
                        {!cityId && <div className="text-muted">Sélectionnez une ville</div>}
                        {shippingLoading && <div>Calcul des frais...</div>}
                        {!shippingLoading && shippingMethods.length === 0 && cityId && (
                            <div className="text-muted">Sélectionnez votre quartier</div>
                        )}

                        {shippingMethods.map((method: any) => (
                            <label
                                key={method.id}
                                className="d-flex justify-content-between align-items-center border p-2 rounded mb-2"
                            >
                                <div>
                                    <div className="fw-bold">{method.title}</div>
                                    <small className="text-muted">{method.description}</small>
                                </div>
                                <div className="d-flex align-items-center">
                  <span className="fw-bold me-3">
                    {method.is_free ? "Gratuit" : `${method.price} FCFA`}
                  </span>
                                    <input
                                        type="radio"
                                        name="shipping_method"
                                        value={method.id}
                                        checked={form.shipping_method === method.id}
                                        onChange={() => {
                                            setShipping(method); // store global
                                            setForm((prev: any) => ({
                                                ...prev,
                                                shipping_method: method.id,
                                                shipping_price: method.is_free ? 0 : Number(method.price),
                                            }));
                                        }}
                                        className="form-check-input"
                                    />
                                </div>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Paiement */}
            <div className="box-border mb-3">
                <button
                    type="button"
                    className="w-100 text-start font-md-bold bg-light py-2 px-3 border"
                    onClick={() => toggleSection("payment")}
                >
                    Mode de paiement
                </button>
                {openSection === "payment" && (
                    <div className="p-3 border-top row g-3">

                        {/* Paiement à la livraison */}
                        <div className="col-12 col-md-6">
                            <div
                                className={`card h-100 cursor-pointer ${form.payment_method === "cod" ? "border-primary bg-light" : ""}`}
                                onClick={() => handleInputChange({ target: { name: "payment_method", value: "cod" } } as any)}
                            >
                                <div className="card-body d-flex align-items-center gap-3">
                                    <img src="/images/theme/cod.png" alt="Paiement à la livraison" className="img-fluid" style={{ width: "50px" }} />
                                    <div>
                                        <h6 className="card-title mb-1">Paiement à la livraison</h6>
                                        <p className="card-text text-muted mb-0">Payez directement à la livraison</p>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cod"
                                        checked={form.payment_method === "cod"}
                                        onChange={handleInputChange}
                                        className="form-check-input ms-auto"
                                    />
                                </div>
                            </div>


                        </div>

                        {/* Mobile Money */}
                        <div className="col-12 col-md-6">
                            <div
                                className={`card h-100 cursor-pointer ${form.payment_method === "mobile_money" ? "border-success bg-light" : ""}`}
                                onClick={() => handleInputChange({ target: { name: "payment_method", value: "mobile_money" } } as any)}
                            >
                                <div className="card-body d-flex align-items-center gap-3">
                                    <img src="/images/theme/mobile-money.jpg" alt="Mobile Money" className="img-fluid" style={{ width: "50px" }} />
                                    <div>
                                        <h6 className="card-title mb-1">Mobile Money</h6>
                                        <p className="card-text text-muted mb-0">Payez facilement via votre compte mobile</p>
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="mobile_money"
                                        checked={form.payment_method === "mobile_money"}
                                        onChange={handleInputChange}
                                        className="form-check-input ms-auto"
                                    />
                                </div>
                            </div>


                        </div>
                        <div className="col-12 mt-3">

                            {/* Zone explicative générale */}
                            <div className="card border-dark p-3 bg-light">
                                {form.payment_method === "cod" && (
                                    <p className="mb-0 text-dark">
                                        💳 <strong>Paiement à la livraison</strong> : Payez en toute sécurité lorsque vous recevez vos articles.
                                        <br /><br />
                                        Pour réserver vos produits, un <strong>acompte ou paiement complet</strong> peut être demandé.
                                        Cela vous garantit que vos articles seront préparés et réservés rien que pour vous !
                                    </p>
                                )}

                                {form.payment_method === "mobile_money" && (
                                    <>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Numéro de téléphone Mobile Money"
                                            name="mobile_number"
                                            value={form.mobile_number || ""}
                                            onChange={handleInputChange}
                                        />
                                        <p className="mb-0 text-dark">
                                            💸 <strong>Paiement Mobile Money</strong> : Payez rapidement et facilement via votre téléphone.
                                            <br /><br />
                                            Assurez-vous que votre numéro est correct pour recevoir la confirmation.
                                            Un <strong>acompte ou paiement complet</strong> est nécessaire pour garantir votre commande et réserver vos articles immédiatement.
                                        </p>
                                    </>
                                )}

                                {!form.payment_method && (
                                    <p className="mb-0 text-muted">
                                        ⚠️ Sélectionnez une méthode de paiement pour connaître le processus et les instructions.
                                    </p>
                                )}
                            </div>
                        </div>


                    </div>


                )}
            </div>

            {/* Bouton */}
            <div className="row mt-20">
                <div className="col-lg-6 col-5 mb-20">
                    <Link className="btn font-sm-bold color-brand-1 arrow-back-1" href="/shop-cart">
                        Retour au panier
                    </Link>
                </div>
                <div className="col-lg-6 col-7 mb-20 text-end">
                    <button
                        onClick={placeOrder}
                        disabled={!isAuthenticated || loading}
                        className="btn btn-buy w-auto arrow-next"
                    >
                        {loading ? "Traitement..." : "Passer la commande"}
                    </button>
                </div>
            </div>
        </div>
    );
}
