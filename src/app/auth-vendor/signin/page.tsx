'use client';

import React, {useEffect, useState} from 'react';
import {useSession, signIn, getSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {useSnackbar} from "notistack";
import Link from "next/link";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Redirection si déjà connecté
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/xxadmin");
    }
  }, [status, router]);


  // ⏳ RENDER SAFE (APRÈS TOUS LES HOOKS)
  if (status === "loading") {
    return null;
  }

  // ✅ Soumission formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(username)
/*    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      enqueueSnackbar("Veuillez remplir tous les champs", { variant: "error" });
      return;
    }*/

    setLoading(true);
    setError('');

    try {

      const res = await signIn("credentials", {
        redirect: false,
        email: username,
        password,
      });

      if (!res?.error) {
        window.location.href = "/xxadmin";
/*        const session = await getSession();

        if (session?.user.role === "super_admin") {
          router.push("/xxadmin");
        } else {
          router.push("/xxadmin");
        }

        router.refresh();*/
      }

    } catch {
      enqueueSnackbar("Une erreur est survenue", { variant: "error" });
      setError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };
  return (
      <section className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
          <div className="card-body p-4">
            <h4 className="card-title text-center mb-4">Sign in</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    placeholder="Username or email"
                    type="text"
                    required
                />
              </div>

              <div className="mb-3">
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    required
                />
              </div>

              <div className="mb-3 d-flex justify-content-between align-items-center">
                <a className="font-sm text-muted" href="#">Forgot password?</a>
                <div className="form-check">
              <input className="form-check-input" type="checkbox" id="rememberMe"/>
              <label className="form-check-label" htmlFor="rememberMe">Remember</label>
          </div>
              </div>

              <div className="d-grid mb-3">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>

              {/* <p className="text-center mb-0 font-sm">
          Do not have account? <Link href="/auth-vendor/register">Sign up</Link>
        </p> */}
            </form>
          </div>
        </div>
      </section>

  );
}
