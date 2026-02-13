import NextAuth from "next-auth";

import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        token?: string;
        user: User & {
            id?: string,
            email?: string,
            role: "vendor" | "super_admin";
            name: string,
            token?:string
            image: string;
            phone: string;
        };
    }

    interface User {
        id?: string;
        token?: string;
        email?: string;
        role: "vendor" | "super_admin";
        name: string;
        image: string;
        phone: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        token?: string;
        email?: string;
        role: "vendor" | "super_admin";
        name: string;
        image: string;
        phone: string;

    }
}
