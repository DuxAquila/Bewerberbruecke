import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("referenzen.meta");
  return { title: t("title"), description: t("description") };
}

export default function Referenzen() {
  const t = useTranslations("referenzen");
  const tc = useTranslations("buttons");

  const cases = t.raw("cases") as Array<{
    client: string;
    sector: string;
    result: string;
    detail: string;
    tag: string;
  }>;

  return (
    <>
      {/* Hero */}
      <section className="section section--dark">
        <div className="container">
          <p className="text-label mb-sm">{t("hero.label")}</p>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "var(--white)", maxWidth: 600 }}>
            {t("hero.title")}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "1rem", maxWidth: 500, lineHeight: 1.75 }}>
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Cases */}
      <section className="section">
        <div className="container">
          <div className="auto-grid">
            {cases.map((c, i) => (
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
                  <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>{c.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="info-box text-center mt-lg">
            <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>{t("cta.title")}</h2>
            <p className="text-muted mb-md">{t("cta.text")}</p>
            <Link href="/kontakt" className="btn btn-dark">{tc("wachstumsanalyse")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
