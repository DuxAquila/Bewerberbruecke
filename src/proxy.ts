import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Alle Routen außer API, _next, statische Dateien und Uploads
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

