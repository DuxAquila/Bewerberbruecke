import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kontakt.meta" });
  const BASE_URL = "https://bewerberbruecke.com";

  return {
    title: t("title"),
    description: t("description"),
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
  };
}

export default function Kontakt() {
  const t = useTranslations("kontakt");

  const channels = t.raw("sidebar.channels") as Array<{
    label: string;
    value: string;
    href: string;
  }>;
  const steps = t.raw("sidebar.nextSteps.steps") as string[];

  return (
    <>
      {/* Hero */}
      <section className="section section--dark">
        <div className="container">
          <p className="text-label mb-sm">{t("hero.label")}</p>
          <h1 className="page-hero-title">{t("hero.title")}</h1>
          <p className="page-hero-subtitle">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* Inhalt */}
      <section className="section">
        <div className="container max-w-lg contact-layout">

          {/* Sidebar */}
          <div>
            <h2 className="contact-sidebar-title">{t("sidebar.title")}</h2>

            {channels.map((ch) => (
              <div key={ch.label} className="contact-channel">
                <p className="text-label contact-channel-label">{ch.label}</p>
                <a href={ch.href} className="contact-channel-link">{ch.value}</a>
              </div>
            ))}

            <div className="steps-box">
              <div className="steps-box-title">{t("sidebar.nextSteps.title")}</div>
              <ol className="steps-box-list">
                {steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          </div>

          {/* Formular */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
