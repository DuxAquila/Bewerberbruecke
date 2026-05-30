import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t  = useTranslations("home");
  const tc = useTranslations("buttons");

  const phases  = t.raw("phases")  as Array<{ num: string; title: string; text: string }>;
  const steps   = t.raw("process.steps") as Array<{ title: string; text: string }>;
  const faqs    = t.raw("faq.items") as Array<{ q: string; a: string }>;

  return (
    <>
      {/* Hero */}
      <section
        className="section section--dark"
        style={{ padding: "7rem 0 6rem", position: "relative", overflow: "hidden" }}
      >
        {/* Dekorative Hintergrundebenen */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "linear-gradient(135deg, transparent 40%, rgba(200,169,110,0.08) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(200,169,110,0.1)", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative" }}>
          <div style={{ maxWidth: 740 }}>
            <div className="hero-badge">{t("hero.badge")}</div>
            <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem", color: "var(--white)" }}>
              {t("hero.title")}<br />
              <span className="text-accent">{t("hero.titleAccent")}</span>
            </h1>
            <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.7)", marginBottom: "1rem", lineHeight: 1.7, maxWidth: 580 }}>
              {t("hero.subtitle")}
            </p>
            <p className="font-serif" style={{ fontSize: "1rem", color: "var(--accent-light)", marginBottom: "2.5rem", fontStyle: "italic" }}>
              {t("hero.claim")}
            </p>
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
          <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", marginBottom: "1.5rem" }}>
            {t("intro.title")}
          </h2>
          <p className="text-muted" style={{ fontSize: "1rem", lineHeight: 1.8 }}>
            {t("intro.text")}
          </p>
        </div>
      </section>

      {/* Phases */}
      <section className="section--light" style={{ paddingBottom: "5rem" }}>
        <div className="container">
          <div className="auto-grid">
            {phases.map((p) => (
              <div key={p.num} className="phase-card">
                <div className="text-label" style={{ fontSize: "0.7rem", letterSpacing: "0.18em", marginBottom: "0.75rem" }}>
                  PHASE {p.num}
                </div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "var(--primary)" }}>{p.title}</h3>
                <p className="text-muted" style={{ fontSize: "0.92rem", lineHeight: 1.75 }}>{p.text}</p>
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
            <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "var(--white)" }}>
              {t("process.title")}
            </h2>
          </div>
          <div className="auto-grid max-w-xl" style={{ margin: "0 auto" }}>
            {steps.map((s, i) => (
              <div key={s.title} style={{ position: "relative", paddingLeft: "1rem" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 3, height: "100%", background: `linear-gradient(to bottom, var(--accent) ${i * 33}%, rgba(200,169,110,0.2) 100%)` }} />
                <div className="font-serif" style={{ fontSize: "2.5rem", fontWeight: 700, color: "rgba(200,169,110,0.2)", lineHeight: 1, marginBottom: "0.5rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 style={{ fontSize: "1.15rem", color: "var(--white)", marginBottom: "0.75rem" }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.92rem", lineHeight: 1.75 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container flex-between flex-wrap gap-md">
          <div>
            <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--primary)", marginBottom: "0.5rem" }}>
              {t("ctaBanner.title")}
            </h2>
            <p style={{ color: "rgba(26,23,20,0.7)", fontSize: "0.95rem" }}>{t("ctaBanner.text")}</p>
          </div>
          <Link href="/kontakt" className="btn btn-dark" style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
            {tc("erstgespraech")}
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-md">
          <div className="section-header">
            <p className="section-label">{t("faq.label")}</p>
            <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)" }}>{t("faq.title")}</h2>
          </div>
          <div>
            {faqs.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-summary">
                  {f.q}
                  <span className="faq-icon">+</span>
                </summary>
                <p className="text-muted" style={{ fontSize: "0.92rem", lineHeight: 1.8, marginTop: "0.85rem" }}>{f.a}</p>
              </details>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section--light text-center">
        <div className="container max-w-sm">
          <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", marginBottom: "1rem" }}>
            {t("finalCta.title")}
          </h2>
          <p className="text-muted mb-md" style={{ lineHeight: 1.8 }}>{t("finalCta.text")}</p>
          <Link href="/kontakt" className="btn btn-dark">{tc("erstgespraech")}</Link>
        </div>
      </section>
    </>
  );
}
