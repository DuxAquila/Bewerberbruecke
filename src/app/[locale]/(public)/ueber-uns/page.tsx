import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ueber-uns.meta");
  return { title: t("title"), description: t("description") };
}

type TeamMember = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

type Section = {
  title: string;
  text: string;
};

export default function UeberUns() {
  const t  = useTranslations("ueber-uns");
  const tc = useTranslations("buttons");

  const sections = t.raw("sections") as Section[];
  const members  = t.raw("team.members") as TeamMember[];

  return (
    <>
      {/* Hero */}
      <section className="section section--dark">
        <div className="container">
          <p className="text-label mb-sm">{t("hero.label")}</p>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "var(--white)", maxWidth: 700 }}>
            {t("hero.title")}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section section--light">
        <div className="container max-w-md">
          <p className="text-muted mb-sm" style={{ fontSize: "1.05rem", lineHeight: 1.85 }}>{t("intro.p1")}</p>
          <p className="text-muted" style={{ fontSize: "1.05rem", lineHeight: 1.85 }}>{t("intro.p2")}</p>
        </div>
      </section>

      {/* Abschnitte */}
      <section className="section">
        <div className="container max-w-xl">
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {sections.map((s) => (
              <div key={s.title} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem", alignItems: "start" }}>
                <h2 className="font-serif" style={{ fontSize: "clamp(1.2rem,2.5vw,1.5rem)", color: "var(--accent)" }}>
                  {s.title}
                </h2>
                <p className="text-muted" style={{ lineHeight: 1.85 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section--dark">
        <div className="container">
          <div className="section-header">
            <p className="section-label">{t("team.heading")}</p>
          </div>
          <div className="auto-grid max-w-xl" style={{ margin: "0 auto" }}>
            {members.map((m) => (
              <div key={m.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                {/* Foto */}
                <div style={{ aspectRatio: "4/3", background: "rgba(200,169,110,0.1)", position: "relative", overflow: "hidden" }}>
                  {m.image ? (
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(200,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "2rem", color: "var(--accent)" }}>
                          {m.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div style={{ padding: "1.75rem" }}>
                  <div className="font-serif" style={{ fontSize: "1.2rem", color: "var(--white)", fontWeight: 600, marginBottom: "0.25rem" }}>
                    {m.name}
                  </div>
                  {m.role && (
                    <div className="text-label" style={{ fontSize: "0.72rem", marginBottom: "1rem" }}>{m.role}</div>
                  )}
                  {m.quote && (
                    <p style={{ color: "rgba(232,217,188,0.75)", fontSize: "0.9rem", lineHeight: 1.75, fontStyle: "italic" }}>
                      „{m.quote}"
                    </p>
                  )}
                </div>
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
