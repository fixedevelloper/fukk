// proxy.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const token = getToken({ req });

    // redirige non-auth vers la page de connexion
    if (req.nextUrl.pathname.startsWith("/xxadmin") && !token) {
        const loginUrl = new URL("/auth-vendor/signin", req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/xxadmin/:path*"],
};
