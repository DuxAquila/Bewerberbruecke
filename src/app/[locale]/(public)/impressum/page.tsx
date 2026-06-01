import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impressum.meta" });
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

export default function Impressum() {
  const t = useTranslations("impressum");

  const sections = t.raw("sections") as Array<{ title: string; lines: string[] }>;

  return (
    <section className="section">
      <div className="container max-w-md">
        <h1 className="impressum-title">{t("title")}</h1>
        <p className="text-muted impressum-subtitle mb-lg">{t("subtitle")}</p>

        <div className="impressum-sections">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="text-section-title">{sec.title}</h2>
              {sec.lines.map((line, i) => (
                <p key={i} className="text-muted impressum-section-text">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
