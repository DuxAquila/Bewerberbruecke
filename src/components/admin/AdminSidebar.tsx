"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV = [
  {
    label: "Übersicht",
    items: [
      { href: "/admin",            icon: "⊞", label: "Dashboard" },
    ],
  },
  {
    label: "Akquise",
    items: [
      { href: "/admin/contacts",   icon: "◎", label: "Kontakte" },
      { href: "/admin/sequences",  icon: "⟳", label: "Sequenzen" },
      { href: "/admin/tracking",   icon: "↗", label: "Auswertung" },
    ],
  },
  {
    label: "Anfragen",
    items: [
      { href: "/admin/inquiries",  icon: "◻", label: "Kontaktanfragen" },
      { href: "/admin/newsletter", icon: "✉", label: "Newsletter" },
    ],
  },
  {
    label: "Inhalte",
    items: [
      { href: "/admin/gallery",    icon: "◈", label: "Referenzen" },
      { href: "/admin/blog",       icon: "◇", label: "Blog" },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/users",      icon: "◉", label: "Benutzer" },
      { href: "/admin/settings",   icon: "⚙", label: "Einstellungen" },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <span className="admin-sidebar-logo-name">Bewerberbrücke</span>
        <span className="admin-sidebar-logo-tag">Admin</span>
      </div>

      <nav style={{ flex: 1, overflowY: "auto", padding: "0.25rem 0" }}>
        {NAV.map((group) => (
          <div key={group.label} style={{ padding: "0 0.75rem", marginBottom: "0.25rem" }}>
            <span className="admin-nav-group-label">{group.label}</span>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item${isActive(item.href) ? " active" : ""}`}
              >
                <span style={{ width: 18, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <button
        className="admin-sidebar-logout"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
      >
        <span>↩</span>
        <span>Abmelden</span>
      </button>
    </aside>
  );
}
