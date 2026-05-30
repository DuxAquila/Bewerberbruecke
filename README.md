# Bewerberbrücke

Digitale Wachstumssysteme für planbare Sichtbarkeit und Mitarbeitergewinnung.

---

## Tech Stack

| Bereich | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) |
| Sprache | TypeScript |
| Styling | Tailwind CSS + modulares CSS-System |
| i18n | next-intl (DE / EN) |
| ORM | Prisma |
| Datenbank | MySQL |
| Auth | NextAuth.js |
| E-Mail | Nodemailer (SMTP) |
| Fonts | Playfair Display + DM Sans (lokal via next/font) |

---

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build
npm run build && npm run start
```

Läuft auf [http://localhost:3000](http://localhost:3000) → leitet automatisch auf `/de` weiter.

---

## Projektstruktur

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Root Layout mit i18n + Fonts
│   │   ├── admin/                  # Admin Interface (geschützt)
│   │   │   ├── blog/
│   │   │   ├── contacts/
│   │   │   ├── gallery/
│   │   │   ├── inquiries/
│   │   │   ├── newsletter/
│   │   │   ├── roles/
│   │   │   ├── sequences/
│   │   │   ├── settings/
│   │   │   ├── tracking/
│   │   │   └── users/
│   │   └── (public)/               # Öffentliche Seiten
│   │       ├── page.tsx            # Homepage
│   │       ├── referenzen/
│   │       ├── ueber-uns/
│   │       ├── kontakt/
│   │       └── impressum/
│   ├── api/
│   │   └── contact/                # Kontaktformular API
│   ├── page.tsx                    # Root-Redirect → /de
│   └── style/                      # Modulares CSS-System
│       ├── index.css               # Einstiegspunkt
│       ├── tokens.css              # CSS-Variablen
│       ├── base.css                # Reset & Basis
│       ├── layout.css              # Container, Grid
│       ├── components.css          # Buttons, Cards, Nav etc.
│       └── utilities.css           # Hilfsklassen
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   ├── admin/
│   ├── layout/
│   ├── sections/
│   └── ui/
│
├── i18n/
│   ├── routing.ts                  # Locale-Konfiguration
│   └── request.ts                  # Namespace-Loader
│
├── messages/
│   ├── de/                         # Deutsche Texte
│   │   ├── common.json             # Navbar, Footer, Buttons
│   │   ├── home.json
│   │   ├── referenzen.json
│   │   ├── ueber-uns.json
│   │   ├── kontakt.json
│   │   └── impressum.json
│   └── en/                         # Englische Texte
│       └── ...
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── email/
│   └── tracking/
│
├── proxy.ts                        # next-intl Locale-Routing
└── types/
```

---

## CSS-System

Alle Styles liegen unter `src/app/style/`. Kein `globals.css`, keine `<style>`-Blöcke in Komponenten.

| Datei | Inhalt |
|---|---|
| `tokens.css` | CSS-Variablen (Farben, Fonts, Radii, Abstände) |
| `base.css` | Reset, Body, Typografie |
| `layout.css` | Container, Grid-Klassen, Section-Wrapper |
| `components.css` | Buttons, Cards, Navbar, Footer, Formulare |
| `utilities.css` | Text-, Abstand- und Flex-Hilfsklassen |

---

## i18n

Texte sind nach Seite in separate JSON-Dateien aufgeteilt:

```
messages/{locale}/{page}.json
```

Jede Seite lädt nur ihren eigenen Namespace über `useTranslations("page")`. Geteilte Texte (Navbar, Footer, Buttons) liegen in `common.json`.

Unterstützte Sprachen: **Deutsch (`de`)** · **Englisch (`en`)**

---

## Umgebungsvariablen

Kopiere `.env.example` zu `.env` und fülle die Werte aus:

```env
# Datenbank
DATABASE_URL=mysql://user:password@localhost:3306/bewerberbruecke

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# SMTP
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
CONTACT_RECEIVER=
```

---

## Rechtesystem

### Rollen

| Rolle | Beschreibung |
|---|---|
| `SUPER_ADMIN` | Alle Rechte |
| `ADMIN` | Alle außer Benutzer- & Rollenverwaltung |
| `SALES` | CRM, Sequenzen, E-Mail, Tracking |
| `EDITOR` | Blog, Galerie |

### Flags

`MANAGE_USERS` · `MANAGE_ROLES` · `VIEW_DASHBOARD` · `MANAGE_CONTACTS` · `MANAGE_SEQUENCES` · `SEND_EMAILS` · `VIEW_TRACKING` · `MANAGE_NEWSLETTER` · `MANAGE_BLOG` · `MANAGE_GALLERY` · `MANAGE_SETTINGS` · `VIEW_INQUIRIES`

---

## Statische Assets

```
public/
├── images/
│   ├── logo.svg            # Hauptlogo
│   └── team/
│       ├── finn-loreth.png
│       └── philipp-gornert.png
└── uploads/                # Hochgeladene Dateien (Admin)
```

---

## Kontakt

**Bewerberbrücke e.K.**
Fronhofstraße 18 · 35440 Linden
info@bewerberbruecke.com · 06403 / 9179483
