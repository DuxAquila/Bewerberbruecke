import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ── Admin-Routen schützen ──────────────────────────────
  if (pathname.includes("/admin")) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Nicht eingeloggt → zum Login
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Eingeloggt aber 2FA noch ausstehend → nur /admin/2fa erlaubt
    if (
      token.twoFactorPending &&
      !pathname.includes("/admin/2fa") &&
      !pathname.includes("/admin/login")
    ) {
      return NextResponse.redirect(new URL("/admin/2fa", req.url));
    }

    return NextResponse.next();
  }

  // ── Alle anderen Routen → next-intl ───────────────────
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
