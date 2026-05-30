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
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "var(--white)", maxWidth: 600 }}>
            {t("hero.title")}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "1rem", maxWidth: 600, lineHeight: 1.75 }}>
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section section--light">
        <div className="container max-w-md text-center">
          <p className="text-muted" style={{ fontSize: "1rem", lineHeight: 1.8 }}>{t("intro")}</p>
        </div>
      </section>

      {/* Featured Case – Haus Hohensolms */}
      <section className="section">
        <div className="container">
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>

            {/* Header */}
            <div style={{ background: "var(--primary)", padding: "2.5rem" }}>
              <div className="flex-between flex-wrap gap-md">
                <div>
                  <div style={{ background: "rgba(200,169,110,0.2)", color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.1em", padding: "0.25rem 0.7rem", borderRadius: "var(--radius-sm)", fontWeight: 600, display: "inline-block", marginBottom: "1rem" }}>
                    {featured.tag}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(232,217,188,0.6)", marginBottom: "0.4rem" }}>{featured.sector}</div>
                  <h2 className="font-serif" style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "var(--white)", marginBottom: "0.75rem" }}>
                    {featured.client}
                  </h2>
                </div>
                <div style={{ background: "rgba(200,169,110,0.15)", border: "1px solid rgba(200,169,110,0.3)", borderRadius: "var(--radius-lg)", padding: "1.25rem 2rem", textAlign: "center" }}>
                  <div className="font-serif" style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>138</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(232,217,188,0.7)", marginTop: "0.25rem" }}>Bewerbungen in 12 Monaten</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "2.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "2rem" }}>
              {[
                { label: labels.situation, text: featured.situation },
                { label: labels.challenge, text: featured.challenge },
                { label: labels.approach,  text: featured.approach },
                { label: labels.result,    text: featured.result_detail },
              ].filter(s => s.text).map(({ label, text }) => (
                <div key={label}>
                  <div className="text-label" style={{ fontSize: "0.72rem", marginBottom: "0.6rem" }}>{label}</div>
                  <p className="text-muted" style={{ fontSize: "0.92rem", lineHeight: 1.75 }}>{text}</p>
                </div>
              ))}
            </div>

            {/* Insight + Video */}
            {featured.insight && (
              <div style={{ background: "var(--section-bg)", borderTop: "1px solid var(--border)", padding: "2rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
                <p style={{ color: "var(--primary)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 600, fontWeight: 500 }}>
                  {featured.insight}
                </p>
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
                  <div style={{ background: "var(--primary)", padding: "2rem", position: "relative" }}>
                    <div style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(200,169,110,0.2)", color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.1em", padding: "0.25rem 0.7rem", borderRadius: "var(--radius-sm)", fontWeight: 600 }}>
                      {c.tag}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(232,217,188,0.6)", marginBottom: "0.5rem" }}>{c.sector}</div>
                    <div className="font-serif" style={{ fontSize: "1.2rem", color: "var(--white)", fontWeight: 600 }}>{c.client}</div>
                  </div>
                  <div style={{ padding: "1.75rem" }}>
                    <div className="font-serif" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent)", marginBottom: "1rem" }}>{c.result}</div>
                    <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>{c.result_detail}</p>
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
            <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>{t("cta.title")}</h2>
            <p className="text-muted mb-md">{t("cta.text")}</p>
            <Link href="/kontakt" className="btn btn-dark">{tc("wachstumsanalyse")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
