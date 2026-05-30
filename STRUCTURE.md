# Bewerberbrücke – Projektstruktur

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl (DE/EN)
- **ORM**: Prisma
- **Database**: MySQL
- **Auth**: NextAuth.js
- **Email**: Nodemailer (SMTP)

## Ordnerstruktur

```
.
├── app/
│   └── [locale]/
│       ├── admin/                  → Admin Interface (geschützt)
│       │   ├── blog/               → Blog/News verwalten
│       │   ├── contacts/           → CRM Kontakte
│       │   ├── gallery/            → Referenzen/Galerie
│       │   ├── inquiries/          → Kontaktanfragen
│       │   ├── newsletter/         → Newsletter
│       │   ├── roles/              → Rollenverwaltung
│       │   ├── sequences/          → E-Mail Sequenzen
│       │   ├── settings/           → Systemeinstellungen (SMTP etc.)
│       │   ├── tracking/           → E-Mail Tracking
│       │   └── users/              → Benutzerverwaltung
│       └── (public)/               → Öffentliche Seiten
│           ├── blog/               → News/Blog
│           ├── impressum/          → Impressum & Datenschutz
│           ├── kontakt/            → Kontaktformular
│           ├── referenzen/         → Galerie/Referenzen
│           └── ueber-uns/          → Über uns
│
├── components/
│   ├── admin/                      → Admin-spezifische Komponenten
│   ├── layout/                     → Navbar, Footer, AdminSidebar
│   ├── sections/                   → Hero, Phases, FAQ, CTA etc.
│   └── ui/                         → Button, Card, Input, Modal etc.
│
├── lib/
│   ├── auth/                       → NextAuth Konfiguration, Rechtesystem
│   ├── db/                         → Prisma Client
│   ├── email/                      → Nodemailer, Templates, Tracking
│   └── tracking/                   → Pixel, Link-Redirect Logik
│
├── messages/
│   ├── de.json                     → Deutsche Texte
│   └── en.json                     → Englische Texte
│
├── prisma/
│   └── schema.prisma               → DB Schema
│
├── public/
│   ├── images/                     → Statische Bilder
│   └── uploads/                    → Hochgeladene Dateien
│
└── types/
    └── index.ts                    → Globale TypeScript Typen

## Rechtesystem

### Flags (Einzelberechtigungen)
| Flag | Beschreibung |
|------|-------------|
| MANAGE_USERS | Benutzer anlegen/bearbeiten/löschen |
| MANAGE_ROLES | Rollen anlegen/bearbeiten |
| VIEW_DASHBOARD | Dashboard einsehen |
| MANAGE_CONTACTS | CRM Kontakte verwalten |
| MANAGE_SEQUENCES | Sequenzen & Templates |
| SEND_EMAILS | E-Mails versenden |
| VIEW_TRACKING | E-Mail Tracking einsehen |
| MANAGE_NEWSLETTER | Newsletter verwalten |
| MANAGE_BLOG | News/Blog verwalten |
| MANAGE_GALLERY | Referenzen/Galerie verwalten |
| MANAGE_SETTINGS | Systemeinstellungen |
| VIEW_INQUIRIES | Kontaktanfragen einsehen |

### Rollen (Voreingestellte Flag-Kombinationen)
| Rolle | Flags |
|-------|-------|
| SUPER_ADMIN | Alle Flags |
| ADMIN | Alle außer MANAGE_USERS, MANAGE_ROLES |
| SALES | MANAGE_CONTACTS, MANAGE_SEQUENCES, SEND_EMAILS, VIEW_TRACKING |
| EDITOR | MANAGE_BLOG, MANAGE_GALLERY |

## Datenbank Schema (Übersicht)

| Tabelle | Beschreibung |
|---------|-------------|
| users | Admin-Benutzer mit Flags & Rolle |
| roles | Rollen mit Flag-Kombinationen |
| contacts | CRM Kontakte (Kaltakquise) |
| sequences | E-Mail Sequenzen |
| sequence_steps | Schritte einer Sequenz |
| sequence_runs | Aktive Sequenzen pro Kontakt |
| email_logs | Versendete E-Mails + Tracking |
| newsletter_subs | Newsletter Abonnenten |
| newsletter_mails | Versendete Newsletter |
| blog_posts | News/Blog Artikel |
| blog_categories | Blog Kategorien |
| blog_tags | Blog Tags |
| inquiries | Kontaktanfragen vom Frontend |
| gallery | Referenzen/Galerie Einträge |
| settings | Systemeinstellungen (Key/Value) |

## E-Mail Tracking
- **Geöffnet**: Tracking Pixel (1x1 PNG) pro Mail
- **Link geklickt**: Redirect über `/api/track/click/[token]`
- **Sequenz Pause**: Eingehende Antworten via SMTP IDLE oder Webhook

## i18n
- Standard-Sprache: Deutsch (`/de`)
- Englisch: `/en`
- Texte in `messages/de.json` und `messages/en.json`
- SEO: hreflang Tags pro Seite
