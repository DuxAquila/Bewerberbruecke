import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/app/style/index.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bewerberbruecke.com";
  const otherLocale = locale === "de" ? "en" : "de";

  return {
    title: {
      default: t("title"),
      template: `%s | Bewerberbrücke`,
    },
    description: t("description"),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        de: `${BASE_URL}/de`,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}`,
      siteName: "Bewerberbrücke",
      locale: locale === "de" ? "de_DE" : "en_GB",
      alternateLocale: locale === "de" ? "en_GB" : "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

// Im Layout, nach den Metadata-Exporten:
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Bewerberbrücke e.K.",
  "description": "Digitale Wachstumssysteme für planbare Sichtbarkeit und Mitarbeitergewinnung im Pflege- und Sozialbereich.",
  "url": "https://bewerberbruecke.com",
  "telephone": "+496403 9179483",
  "email": "info@bewerberbruecke.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Fronhofstraße 18",
    "addressLocality": "Linden",
    "postalCode": "35440",
    "addressCountry": "DE"
  },
  "founders": [
    { "@type": "Person", "name": "Finn Loreth" },
    { "@type": "Person", "name": "Philipp Gornert" }
  ],
  "areaServed": "DE",
  "knowsAbout": ["Social Recruiting", "Mitarbeitergewinnung", "Pflege", "Sozialbereich", "Employer Branding"]
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
