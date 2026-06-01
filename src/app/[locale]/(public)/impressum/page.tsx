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
        <h1 className="impressum-title">{t("title")}</h1>
        <p className="text-muted impressum-subtitle mb-lg">{t("subtitle")}</p>

        <div className="impressum-sections">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="text-section-title">{sec.title}</h2>
              {sec.lines.map((line, i) => (
                <p key={i} className="text-muted impressum-section-text">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
