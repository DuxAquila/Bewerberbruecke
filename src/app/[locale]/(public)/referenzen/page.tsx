import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("referenzen.meta");
  return { title: t("title"), description: t("description") };
}

type Case = {
  client: string;
  sector: string;
  result: string;
  tag: string;
  situation: string;
  challenge: string;
  approach: string;
  result_detail: string;
  insight: string;
  videoUrl: string;
};

export default function Referenzen() {
  const t  = useTranslations("referenzen");
  const tc = useTranslations("buttons");
  const cases  = t.raw("cases")  as Case[];
  const labels = t.raw("labels") as Record<string, string>;

  const [featured, ...rest] = cases;

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

      {/* Intro */}
      <section className="section section--light">
        <div className="container max-w-md text-center">
          <p className="text-muted intro-text">{t("intro")}</p>
        </div>
      </section>

      {/* Featured Case – Haus Hohensolms */}
      <section className="section">
        <div className="container">
          <div className="featured-card">

            {/* Header */}
            <div className="featured-card-header">
              <div className="flex-between flex-wrap gap-md">
                <div>
                  <div className="featured-tag">{featured.tag}</div>
                  <div className="featured-sector">{featured.sector}</div>
                  <h2 className="font-serif featured-client">{featured.client}</h2>
                </div>
                <div className="featured-stat">
                  <div className="font-serif featured-stat-number">138</div>
                  <div className="featured-stat-label">Bewerbungen in 12 Monaten</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="featured-card-body">
              {[
                { label: labels.situation, text: featured.situation },
                { label: labels.challenge, text: featured.challenge },
                { label: labels.approach,  text: featured.approach },
                { label: labels.result,    text: featured.result_detail },
              ].filter(s => s.text).map(({ label, text }) => (
                <div key={label}>
                  <div className="text-label featured-card-section-label">{label}</div>
                  <p className="text-muted featured-card-section-text">{text}</p>
                </div>
              ))}
            </div>

            {/* Insight + Video */}
            {featured.insight && (
              <div className="featured-insight">
                <p className="featured-insight-text">{featured.insight}</p>
                {featured.videoUrl && (
                  <a href={featured.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                    {labels.video} ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Weitere Cases */}
      {rest.length > 0 && (
        <section className="section section--light">
          <div className="container">
            <div className="auto-grid">
              {rest.map((c, i) => (
                <div key={i} className="case-card">
                  <div className="case-card-header">
                    <div className="case-card-tag">{c.tag}</div>
                    <div className="case-card-sector">{c.sector}</div>
                    <div className="font-serif case-card-client">{c.client}</div>
                  </div>
                  <div className="case-card-body">
                    <div className="font-serif case-card-result">{c.result}</div>
                    <p className="text-muted case-card-detail">{c.result_detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="info-box text-center">
            <h2 className="section-title--sm">{t("cta.title")}</h2>
            <p className="text-muted mb-md">{t("cta.text")}</p>
            <Link href="/kontakt" className="btn btn-dark">{tc("wachstumsanalyse")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
