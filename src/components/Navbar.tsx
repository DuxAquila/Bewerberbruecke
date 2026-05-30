"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  // Aktuellen Pfad auf andere Sprache umschalten
  // z.B. /de/referenzen → /en/referenzen
  const otherLocale = locale === "de" ? "en" : "de";
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { href: `/${locale}`,            label: t("home") },
    { href: `/${locale}/referenzen`, label: t("referenzen") },
    { href: `/${locale}/ueber-uns`,  label: t("ueberUns") },
  ];

  return (
    <>
      {/* Topbar */}
      <div style={{ background: "var(--primary)", color: "var(--accent-light)", fontSize: "0.8rem", textAlign: "center", padding: "0.5rem 1rem", letterSpacing: "0.05em" }}>
        {t("topBar")}{" "}
        <a href="tel:064039179483" style={{ color: "var(--accent)", fontWeight: 600 }}>
          {t("topBarPhone")}
        </a>
      </div>

      {/* Navbar */}
      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 12px rgba(0,0,0,0.06)" }}>
        <div className="container flex-between" style={{ height: "70px" }}>

          {/* Logo */}
          <Link href={`/${locale}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span className="font-serif" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "-0.01em" }}>
              Bewerberbrücke
            </span>
            <span className="text-label" style={{ fontSize: "0.65rem", letterSpacing: "0.12em" }}>
              Social Recruiting
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav flex gap-md" style={{ alignItems: "center" }}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="nav-link">{label}</Link>
            ))}
            <Link href={`/${locale}/kontakt`} className="nav-cta">{t("ctaLabel")}</Link>

            {/* Lang Switch */}
            <Link
              href={otherLocalePath}
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "var(--muted)",
                textDecoration: "none",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "0.3rem 0.65rem",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.borderColor = "var(--accent)";
                (e.target as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.borderColor = "var(--border)";
                (e.target as HTMLElement).style.color = "var(--muted)";
              }}
            >
              {otherLocale.toUpperCase()}
            </Link>
          </div>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            className="burger"
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "0.5rem" }}
            aria-label="Menu"
          >
            <div style={{ width: 24, height: 2, background: "var(--primary)", marginBottom: 5 }} />
            <div style={{ width: 24, height: 2, background: "var(--primary)", marginBottom: 5 }} />
            <div style={{ width: 24, height: 2, background: "var(--primary)" }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div style={{ background: "var(--white)", borderTop: "1px solid var(--border)", padding: "1rem 1.5rem 1.5rem" }}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{ display: "block", padding: "0.75rem 0", color: "var(--primary)", textDecoration: "none", fontSize: "1rem", borderBottom: "1px solid var(--border)" }}
              >
                {label}
              </Link>
            ))}
            <Link
              href={`/${locale}/kontakt`}
              onClick={() => setOpen(false)}
              style={{ display: "block", padding: "0.75rem 0", color: "var(--accent)", textDecoration: "none", fontSize: "1rem", fontWeight: 600, borderBottom: "1px solid var(--border)" }}
            >
              {t("ctaLabel")}
            </Link>
            {/* Lang Switch Mobile */}
            <Link
              href={otherLocalePath}
              onClick={() => setOpen(false)}
              style={{ display: "block", padding: "0.75rem 0", color: "var(--muted)", textDecoration: "none", fontSize: "0.9rem" }}
            >
              {otherLocale.toUpperCase()} – {otherLocale === "de" ? "Deutsch" : "English"}
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
