"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";
import {enqueueSnackbar} from "notistack";
import {signIn} from "next-auth/react";

export default function RegisterForm() {
    const router = useRouter()
    const [first_name, setFisrtname] = useState("")
    const [last_name, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [agree, setAgree] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!agree) {
            enqueueSnackbar("You must agree to the terms.", { variant: "error" });
            setError("You must agree to the terms.")
            return
        }
        if (password !== rePassword) {
            enqueueSnackbar("Passwords do not match.", { variant: "error" });
            setError("Passwords do not match.")
            return
        }

        setLoading(true)

        try {
            // Exemple: appel API pour créer le compte
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first_name,last_name, email, phone, password,user_type:1 }),
            })
            const data = await res.json()
            setLoading(false)

            if (!res.ok) {
                enqueueSnackbar(data.message || "Registration failed", { variant: "error" });
                setError(data.message || "Registration failed")
            } else {
                const res = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                });
                // Redirige vers la page précédente
                router.push('/auth-vendor/create-store')
            }
        } catch (err) {
            setLoading(false)
            enqueueSnackbar("Une erreur est survenue", { variant: "error" });
            setError("Something went wrong")
        }
    }

    return (
        <section className="section-box shop-template mt-60">
            <div className="container">
                <div className="row mb-100">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-6">
                        <h3>Créer un compte</h3>

                        <form className="form-register mt-30 mb-30" onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className="form-group col-md-6">
                                    <label className="mb-5 font-sm color-gray-700">Prénom *</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Steven"
                                        value={first_name}
                                        onChange={(e) => setFisrtname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-5 font-sm color-gray-700">Nom *</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Job"
                                        value={last_name}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-5 font-sm color-gray-700">Email *</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="stevenjob@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-5 font-sm color-gray-700">Téléphone *</label>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        placeholder="675066919"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-5 font-sm color-gray-700">Mot de passe *</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="******************"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="mb-5 font-sm color-gray-700">Confirmer le mot de passe *</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        placeholder="******************"
                                        value={rePassword}
                                        onChange={(e) => setRePassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group col-12">
                                    <label className="font-sm color-gray-700">
                                        <input
                                            className="checkagree"
                                            type="checkbox"
                                            checked={agree}
                                            onChange={(e) => setAgree(e.target.checked)}
                                        />{" "}
                                        En cliquant sur le bouton S’inscrire, vous acceptez nos conditions et notre politique
                                    </label>
                                </div>
                            </div>

                            {error && <p className="text-red-500 mt-2">{error}</p>}

                            <div className="form-group mt-3">
                                <button className="font-md-bold btn btn-primary w-100" type="submit" disabled={loading}>
                                    {loading ? "Inscription en cours..." : "S’inscrire"}
                                </button>
                            </div>

                            <div className="mt-20">
                                <span className="font-xs color-gray-500 font-medium">Vous avez déjà un compte ?</span>
                                <Link className="font-xs color-brand-3 font-medium" href="/auth-vendor/signin">
                                    {" "}Se connecter
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}