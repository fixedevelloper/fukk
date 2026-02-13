import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {randomBytes} from "crypto";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "Entrez votre email"},
                password: {label: "Mot de passe", type: "password"},
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const result = await res.json();

                    if (!res.ok || result.status !== "success") {
                        console.log("Auth error:", result?.message);
                        return null; // ⬅️ clé ici
                    }

                    console.log(result)
                    return {
                        id: result.data.id,
                        name: result.data.name,
                        email: result.data.email,
                        token: result.data.token,
                        role: result.data.role,
                        image: result.data.image,
                        phone: result.data.phone,
                    };
                } catch (error) {
                    console.error("🔥 Server unreachable", error);
                    return null;
                }
            }

        }),
    ],

    secret: process.env.NEXTAUTH_SECRET ?? "fallback_secret_key",

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24h
        generateSessionToken: () => randomBytes(32).toString("hex"),
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.token = user.token;
                token.name = user.name;
                token.role = user.role;
                token.email = user.email;
                token.image = user.image;
                token.phone = user.phone;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.token = token.token;
                session.user.name = token.name;
                session.user.role = token.role;
                session.user.email = token.email;
                session.user.image = token.image;
                session.user.phone = token.phone;
            }
            return session;
        },

    },
};
