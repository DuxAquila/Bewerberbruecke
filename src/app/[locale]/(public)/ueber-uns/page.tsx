import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ueber-uns.meta");
  return { title: t("title"), description: t("description") };
}

export default function UeberUns() {
  const t = useTranslations("ueber-uns");
  const tc = useTranslations("buttons");

  const values = t.raw("values.items") as Array<{ title: string; text: string }>;

  return (
    <>
      {/* Hero */}
      <section className="section section--dark">
        <div className="container">
          <p className="text-label mb-sm">{t("hero.label")}</p>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "var(--white)", maxWidth: 600 }}>
            {t("hero.title")}
          </h1>
        </div>
      </section>

      {/* Inhalt */}
      <section className="section">
        <div className="container two-col max-w-xl">
          <div>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", marginBottom: "1.5rem" }}>
              {t("intro.title")}
            </h2>
            <p className="text-muted mb-sm" style={{ lineHeight: 1.85 }}>{t("intro.p1")}</p>
            <p className="text-muted mb-sm" style={{ lineHeight: 1.85 }}>{t("intro.p2")}</p>
            <p className="text-muted" style={{ lineHeight: 1.85 }}>{t("intro.p3")}</p>
          </div>

          <div className="info-box">
            <p className="text-label mb-sm">{t("values.heading")}</p>
            {values.map((v) => (
              <div key={v.title} style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--primary)", marginBottom: "0.25rem" }}>
                  {v.title}
                </div>
                <div className="text-muted" style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner text-center">
        <div className="container max-w-sm">
          <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--primary)", marginBottom: "0.75rem" }}>
            {t("cta.title")}
          </h2>
          <p style={{ color: "rgba(26,23,20,0.7)", marginBottom: "2rem" }}>{t("cta.text")}</p>
          <Link href="/kontakt" className="btn btn-dark">{tc("erstgespraech")}</Link>
        </div>
      </section>
    </>
  );
}
