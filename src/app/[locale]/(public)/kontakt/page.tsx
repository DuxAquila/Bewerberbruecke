import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("kontakt.meta");
  return { title: t("title"), description: t("description") };
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
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "var(--white)", maxWidth: 600 }}>
            {t("hero.title")}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "1rem", maxWidth: 520, lineHeight: 1.75 }}>
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Inhalt */}
      <section className="section">
        <div className="container max-w-lg contact-layout">

          {/* Sidebar */}
          <div>
            <h2 style={{ fontSize: "1.3rem", marginBottom: "1.5rem" }}>{t("sidebar.title")}</h2>

            {channels.map((ch) => (
              <div key={ch.label} style={{ marginBottom: "1.5rem" }}>
                <p className="text-label" style={{ marginBottom: "0.3rem" }}>{ch.label}</p>
                <a href={ch.href} style={{ color: "var(--primary)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>
                  {ch.value}
                </a>
              </div>
            ))}

            <div className="steps-box">
              <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                {t("sidebar.nextSteps.title")}
              </div>
              <ol style={{ paddingLeft: "1.2rem", color: "var(--muted)", fontSize: "0.87rem", lineHeight: 1.9 }}>
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
