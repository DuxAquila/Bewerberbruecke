"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

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
      <div className="topbar">
        {t("topBar")}{" "}
        <a href="tel:064039179483" className="topbar-phone">
          {t("topBarPhone")}
        </a>
      </div>

      {/* Navbar */}
      <nav className="nav-root">
        <div className="container flex-between nav-inner">

          {/* Logo */}
          <Link href={`/${locale}`} className="nav-logo">
            <Image
              src="/images/navbarLogo.png"
              alt="Bewerberbrücke Logo"
              width={170}
              height={170}
              className="nav-logo-img"
              priority
            />
            <div className="nav-logo-text">
              <span className="font-serif nav-logo-name">Bewerberbrücke</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav flex gap-md flex-center">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="nav-link">{label}</Link>
            ))}
            <Link href={`/${locale}/kontakt`} className="nav-cta">{t("ctaLabel")}</Link>
            <Link href={otherLocalePath} className="lang-switch">
              {otherLocale.toUpperCase()}
            </Link>
          </div>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            className="burger"
            aria-label="Menu"
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="mobile-menu">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="mobile-menu-link"
              >
                {label}
              </Link>
            ))}
            <Link
              href={`/${locale}/kontakt`}
              onClick={() => setOpen(false)}
              className="mobile-menu-cta"
            >
              {t("ctaLabel")}
            </Link>
            <Link
              href={otherLocalePath}
              onClick={() => setOpen(false)}
              className="mobile-menu-lang"
            >
              {otherLocale.toUpperCase()} – {otherLocale === "de" ? "Deutsch" : "English"}
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
