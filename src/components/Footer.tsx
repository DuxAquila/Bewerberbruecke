import Link from "next/link";
import { useTranslations } from "next-intl";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t  = useTranslations("footer");
  const tn = useTranslations("nav");

  const navLinks = [
    { href: `/${locale}`,            label: tn("home") },
    { href: `/${locale}/referenzen`, label: tn("referenzen") },
    { href: `/${locale}/ueber-uns`,  label: tn("ueberUns") },
    { href: `/${locale}/kontakt`,    label: tn("kontakt") },
    { href: `/${locale}/impressum`,  label: tn("impressum") },
  ];

  return (
    <footer style={{ background: "var(--primary)", color: "var(--accent-light)", marginTop: "6rem" }}>
      <div className="container auto-grid" style={{ padding: "4rem 2rem 2rem", gap: "3rem" }}>

        {/* Marke */}
        <div>
          <div className="font-serif" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--white)", marginBottom: "0.5rem" }}>
            Bewerberbrücke
          </div>
          <div className="text-label" style={{ fontSize: "0.7rem", marginBottom: "1.25rem" }}>
            {t("tagline")}
          </div>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "rgba(232,217,188,0.75)" }}>
            {t("description")}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <div className="text-label" style={{ fontSize: "0.75rem", marginBottom: "1.25rem" }}>
            {t("navHeading")}
          </div>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="footer-link">{label}</Link>
          ))}
        </div>

        {/* Kontakt */}
        <div>
          <div className="text-label" style={{ fontSize: "0.75rem", marginBottom: "1.25rem" }}>
            {t("contactHeading")}
          </div>
          <p style={{ fontSize: "0.9rem", color: "rgba(232,217,188,0.75)", marginBottom: "0.6rem" }}>{t("email")}</p>
          <p style={{ fontSize: "0.9rem", color: "rgba(232,217,188,0.75)", marginBottom: "0.6rem" }}>{t("phone")}</p>
          <p style={{ fontSize: "0.85rem", color: "rgba(232,217,188,0.5)", marginTop: "1rem", whiteSpace: "pre-line" }}>
            {t("address")}
          </p>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(232,217,188,0.12)", padding: "1.25rem 2rem", textAlign: "center", fontSize: "0.8rem", color: "rgba(232,217,188,0.4)" }}>
        © {new Date().getFullYear()} {t("copyright")}
      </div>
    </footer>
  );
}
