import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
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

export default function Home() {
  const t  = useTranslations("home");
  const tc = useTranslations("buttons");

  const phases  = t.raw("phases")  as Array<{ num: string; title: string; text: string }>;
  const steps   = t.raw("process.steps") as Array<{ title: string; text: string }>;
  const faqs    = t.raw("faq.items") as Array<{ q: string; a: string }>;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a,
      },
    })),
  };

  return (
    <>
      {/* Hero */}
      <section className="section section--dark hero-root">
        <div className="hero-deco-gradient" />
        <div className="hero-deco-circle" />

        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">{t("hero.badge")}</div>
            <h1 className="hero-title">
              {t("hero.title")}<br />
              <span className="text-accent">{t("hero.titleAccent")}</span>
            </h1>
            <p className="hero-subtitle">{t("hero.subtitle")}</p>
            <p className="font-serif hero-claim">{t("hero.claim")}</p>
            <div className="flex flex-wrap gap-sm">
              <Link href="/referenzen" className="btn btn-accent">{tc("fallstudie")}</Link>
              <Link href="/kontakt" className="btn btn-outline">{tc("wachstumsanalyse")}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section section--light">
        <div className="container max-w-md text-center">
          <h2 className="section-title">{t("intro.title")}</h2>
          <p className="text-muted intro-text">{t("intro.text")}</p>
        </div>
      </section>

      {/* Phases */}
      <section className="section section--light">
        <div className="container">
          <div className="auto-grid">
            {phases.map((p) => (
              <div key={p.num} className="phase-card">
                <div className="text-label phase-label">PHASE {p.num}</div>
                <h3 className="phase-title">{p.title}</h3>
                <p className="text-muted phase-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-header">
            <p className="section-label">{t("process.label")}</p>
            <h2 className="section-title--white">{t("process.title")}</h2>
          </div>
          <div className="auto-grid max-w-xl">
            {steps.map((s, i) => (
              <div key={s.title} className="process-step">
                <div
                  className="process-step-bar"
                  style={{ background: `linear-gradient(to bottom, var(--accent) ${i * 33}%, rgba(200,169,110,0.2) 100%)` }}
                />
                <div className="font-serif process-step-num">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="process-step-title">{s.title}</h3>
                <p className="process-step-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container flex-between flex-wrap gap-md">
          <div>
            <h2 className="cta-title">{t("ctaBanner.title")}</h2>
            <p className="cta-text">{t("ctaBanner.text")}</p>
          </div>
          <Link href="/kontakt" className="btn btn-dark btn-nowrap">
            {tc("erstgespraech")}
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-md">
          <div className="section-header">
            <p className="section-label">{t("faq.label")}</p>
            <h2 className="section-title--sm">{t("faq.title")}</h2>
          </div>
          <div>
            {faqs.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-summary">
                  {f.q}
                  <span className="faq-icon">+</span>
                </summary>
                <p className="text-muted faq-answer">{f.a}</p>
              </details>
            ))}
            <div className="faq-divider" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section--light text-center">
        <div className="container max-w-sm">
          <h2 className="section-title--sm">{t("finalCta.title")}</h2>
          <p className="text-muted mb-md intro-text">{t("finalCta.text")}</p>
          <Link href="/kontakt" className="btn btn-dark">{tc("erstgespraech")}</Link>
        </div>
      </section>
    </>
  );
}
