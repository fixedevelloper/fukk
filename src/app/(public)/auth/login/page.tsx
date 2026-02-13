"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";


export default function LoginCustomer() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)


        const res = await signIn("credentials", {
            redirect: false,  // important pour gérer la redirection manuellement
            email,
            password,
        })

        if (res?.ok) {
            const previousPage = document.referrer || "/account"
            router.push(previousPage)
        } else {
            setLoading(false)
            console.error(res?.error)
            setError(res?.error || "Erreur login")
        }
    }

    return (
        <section className="section-box shop-template mt-60">
            <div className="container">
                <div className="row mb-100">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-5">
                        <h3>Connexion membre</h3>
                        <p className="font-md color-gray-500">Bienvenue de retour !</p>

                        <form className="form-register mt-30 mb-30" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="mb-5 font-sm color-gray-700">
                                    Email / Téléphone / Nom d'utilisateur *
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="stevenjob@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
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

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="color-gray-500 font-xs">
                                            <input className="checkagree" type="checkbox" /> Se souvenir de moi
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <div className="form-group">
                                        <a className="font-xs color-gray-500" href="#">
                                            Mot de passe oublié ?
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {error && <p className="text-red-500 font-xs mt-2">{error}</p>}

                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="font-md-bold btn btn-buy"
                                    disabled={loading}
                                >
                                    {loading ? "Connexion en cours..." : "Se connecter"}
                                </button>
                            </div>

                            <div className="mt-20">
                        <span className="font-xs color-gray-500 font-medium">
                            Pas encore de compte ?
                        </span>
                                <Link className="font-xs color-brand-3 font-medium" href="/auth/register">
                                    S'inscrire
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="col-lg-5"/>
                </div>
            </div>
        </section>

    )
}
