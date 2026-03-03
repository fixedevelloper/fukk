"use client"

import { useState } from "react"
import {useRouter} from "next/navigation";
import Link from "next/link";

import { useSnackbar } from "notistack";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            enqueueSnackbar("Veuillez entrer votre email.", {
                variant: "warning",
            });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/forget-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                enqueueSnackbar(
                    data.message || "Une erreur est survenue.",
                    {
                        variant: "error",
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right",
                        },
                    }
                );
            } else {
                enqueueSnackbar(
                    "Un lien de réinitialisation a été envoyé à votre email.",
                    {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    }
                );

                setEmail("");

                // redirection après 2s (optionnel)
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            }
        } catch (error) {
            enqueueSnackbar("Erreur réseau. Réessayez.", {
                variant: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-box shop-template mt-60">
            <div className="container">
                <div className="row justify-content-center mb-100">
                    <div className="col-lg-5 col-md-8">

                        <div className="card p-4 shadow-sm border-0">

                            <h3 className="mb-2">Mot de passe oublié</h3>
                            <p className="font-md color-gray-500 mb-4">
                                Entrez votre email pour recevoir un lien de réinitialisation.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label className="mb-1 font-sm color-gray-700">
                                        Email *
                                    </label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder="ex: steve@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="btn btn-buy w-100"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Envoi en cours..."
                                            : "Envoyer le lien"}
                                    </button>
                                </div>
                            </form>

                            <div className="text-center mt-3">
                                <Link
                                    href="/auth/login"
                                    className="font-sm color-brand-3"
                                >
                                    ← Retour à la connexion
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
