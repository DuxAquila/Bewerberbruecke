import Link from "next/link";
import { useTranslations } from "next-intl";

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t  = useTranslations("footer");
  const tn = useTranslations("nav");

  const navLinks = [
    { href: `/${locale}/impressum`,  label: tn("impressum") },
  ];

  return (
    <footer className="footer-root">
      <div className="container auto-grid footer-grid">

        {/* Marke */}
        <div>
          <div className="font-serif footer-brand-name">Bewerberbrücke</div>
          <div className="text-label footer-tagline">{t("tagline")}</div>
          <p className="footer-description">{t("description")}</p>
        </div>

        {/* Navigation */}
        <div>
          <div className="text-label footer-heading">{t("navHeading")}</div>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="footer-link">{label}</Link>
          ))}
        </div>

        {/* Kontakt */}
        <div>
          <div className="text-label footer-heading">{t("contactHeading")}</div>
          <p className="footer-contact-text">{t("email")}</p>
          <p className="footer-contact-text">{t("phone")}</p>
          <p className="footer-address">{t("address")}</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} {t("copyright")}
      </div>
    </footer>
  );
}
