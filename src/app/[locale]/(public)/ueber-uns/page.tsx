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
          <h1 className="page-hero-title">{t("hero.title")}</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="section section--light">
        <div className="container max-w-md">
          <p className="text-muted intro-text--lg mb-sm">{t("intro.p1")}</p>
          <p className="text-muted intro-text--lg">{t("intro.p2")}</p>
        </div>
      </section>

      {/* Abschnitte */}
      <section className="section">
        <div className="container max-w-xl">
          <div className="about-sections">
            {sections.map((s) => (
              <div key={s.title} className="about-section-row">
                <h2 className="font-serif about-section-title">{s.title}</h2>
                <p className="text-muted about-section-text">{s.text}</p>
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
          <div className="auto-grid max-w-xl">
            {members.map((m) => (
              <div key={m.name} className="team-stack">

                {/* Foto */}
                <div className="team-img">
                  {m.image ? (
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      loading="eager"
                      priority
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  ) : (
                    <div className="flex-center fill">
                      <div className="team-avatar">
                        <span className="team-avatar-initial">{m.name.charAt(0)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="team-info">
                  <div className="font-serif team-name">{m.name}</div>
                  {m.role && <div className="text-label team-role">{m.role}</div>}
                  <blockquote>
                    {m.quote.split('\n').filter(Boolean).map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                    </blockquote>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner text-center">
        <div className="container max-w-sm">
          <h2 className="cta-title cta-title--spaced">{t("cta.title")}</h2>
          <p className="cta-text cta-text--spaced">{t("cta.text")}</p>
          <Link href="/kontakt" className="btn btn-dark">{tc("erstgespraech")}</Link>
        </div>
      </section>
    </>
  );
}
