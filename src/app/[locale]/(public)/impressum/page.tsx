import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("impressum.meta");
  return { title: t("title"), description: t("description") };
}

export default function Impressum() {
  const t = useTranslations("impressum");

  const sections = t.raw("sections") as Array<{ title: string; lines: string[] }>;

  return (
    <section className="section">
      <div className="container max-w-md">
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{t("title")}</h1>
        <p className="text-muted mb-lg" style={{ fontSize: "0.9rem" }}>{t("subtitle")}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="text-section-title">{sec.title}</h2>
              {sec.lines.map((line, i) => (
                <p key={i} className="text-muted" style={{ fontSize: "0.92rem", lineHeight: 1.8 }}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
