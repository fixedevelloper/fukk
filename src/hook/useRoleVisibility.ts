"use client";

import { useSession } from "next-auth/react";

/**
 * Hook pour vérifier la visibilité d'un élément selon le rôle
 * @param rolesAllowed liste des rôles autorisés
 * @returns boolean : true si l'élément doit être visible
 */
export function useRoleVisibility(rolesAllowed: string[] | string) {
    const { data: session } = useSession();

    if (!session?.user?.role) return false; // pas connecté

    const roles = Array.isArray(rolesAllowed) ? rolesAllowed : [rolesAllowed];

    return roles.includes(session.user.role);
}
