import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import type { Flag } from "@/lib/auth/flags";

/**
 * Session holen — wirft wenn nicht eingeloggt oder 2FA noch ausständig.
 * In Server Components und Route Handlers verwenden.
 */
export async function requireSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  if (session.user.twoFactorPending) {
    throw new Error("TWO_FACTOR_PENDING");
  }

  return session;
}

/**
 * Session + Flag-Prüfung in einem.
 * Wirft FORBIDDEN wenn Flag fehlt.
 */
export async function requireFlag(flag: Flag) {
  const session = await requireSession();

  if (!session.user.flags.includes(flag)) {
    throw new Error("FORBIDDEN");
  }

  return session;
}

/**
 * Hilfsfunktion für Route Handlers — gibt standardisierte Response zurück.
 *
 * Verwendung:
 *   const session = await getSessionOrResponse()
 *   if (session instanceof Response) return session
 */
export async function getSessionOrResponse(flag?: Flag) {
  try {
    if (flag) return await requireFlag(flag);
    return await requireSession();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg === "UNAUTHORIZED")         return new Response("Unauthorized", { status: 401 });
    if (msg === "TWO_FACTOR_PENDING")   return new Response("2FA required",  { status: 403 });
    if (msg === "FORBIDDEN")            return new Response("Forbidden",      { status: 403 });
    return new Response("Internal Server Error", { status: 500 });
  }
}
