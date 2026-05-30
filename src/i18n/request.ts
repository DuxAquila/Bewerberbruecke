import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Alle Namespace-Dateien für diesen Locale laden und zusammenführen
  const [common, home, referenzen, ueberUns, kontakt, impressum] =
    await Promise.all([
      import(`@/messages/${locale}/common.json`),
      import(`@/messages/${locale}/home.json`),
      import(`@/messages/${locale}/referenzen.json`),
      import(`@/messages/${locale}/ueber-uns.json`),
      import(`@/messages/${locale}/kontakt.json`),
      import(`@/messages/${locale}/impressum.json`),
    ]);

  return {
    locale,
    messages: {
      ...common.default,
      home: home.default,
      referenzen: referenzen.default,
      "ueber-uns": ueberUns.default,
      kontakt: kontakt.default,
      impressum: impressum.default,
    },
  };
});

