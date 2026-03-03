"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

export function ResetPasswordForm(){
    const params = useSearchParams();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    // ❌ Ne pas utiliser `await`
    const token = params.get("token") || "";
    const email = params.get("email") || "";

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !confirm) {
            enqueueSnackbar("Veuillez remplir tous les champs.", { variant: "warning" });
            return;
        }

        if (password !== confirm) {
            enqueueSnackbar("Les mots de passe ne correspondent pas.", { variant: "error" });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    email,
                    password,
                    password_confirmation: confirm,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                enqueueSnackbar(data.message || "Erreur.", { variant: "error" });
            } else {
                enqueueSnackbar("Mot de passe mis à jour avec succès.", {
                    variant: "success",
                });

                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            }
        } catch {
            enqueueSnackbar("Erreur réseau.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="container mt-60">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-8">
                    <div className="card p-4 shadow-sm border-0">
                        <h3>Nouveau mot de passe</h3>
                        <p className="text-muted mb-4">
                            Entrez votre nouveau mot de passe.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Nouveau mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirmer le mot de passe"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                />
                            </div>

                            <button className="btn btn-buy w-100" disabled={loading}>
                                {loading ? "Mise à jour..." : "Réinitialiser"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}