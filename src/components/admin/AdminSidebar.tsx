"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV = [
  {
    label: "Übersicht",
    items: [
      { href: "/admin",           icon: "⊞",  label: "Dashboard" },
    ],
  },
  {
    label: "Akquise",
    items: [
      { href: "/admin/contacts",  icon: "◎",  label: "Kontakte" },
      { href: "/admin/sequences", icon: "⟳",  label: "Sequenzen" },
      { href: "/admin/tracking",  icon: "↗",  label: "Auswertung" },
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
      { href: "/admin/gallery", icon: "◈", label: "Referenzen" },
      { href: "/admin/blog",    icon: "◇", label: "Blog" },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/users",    icon: "◉", label: "Benutzer" },
      { href: "/admin/settings", icon: "⚙", label: "Einstellungen" },
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
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-name">Bewerberbrücke</span>
        <span className="sidebar-logo-tag">Admin</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV.map((group) => (
          <div key={group.label} className="nav-group">
            <span className="nav-group-label">{group.label}</span>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive(item.href) ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <button
        className="sidebar-logout"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
      >
        <span>↩</span>
        <span>Abmelden</span>
      </button>

      <style>{`
        .sidebar {
          width: 220px;
          min-width: 220px;
          height: 100vh;
          background: #181c24;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          overflow-y: auto;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        .sidebar-logo {
          padding: 1.5rem 1.25rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .sidebar-logo-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .sidebar-logo-tag {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sidebar-nav {
          flex: 1;
          padding: 0.25rem 0;
          overflow-y: auto;
        }

        .nav-group {
          margin-bottom: 0.25rem;
          padding: 0 0.75rem;
        }

        .nav-group-label {
          display: block;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
          padding: 0.75rem 0.5rem 0.3rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          text-decoration: none;
          color: rgba(255,255,255,0.45);
          font-size: 0.875rem;
          font-weight: 400;
          transition: all 0.15s;
          margin-bottom: 1px;
          border-left: 2px solid transparent;
        }

        .nav-item:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.04);
        }

        .nav-item.active {
          color: #c8a96e;
          background: rgba(200,169,110,0.08);
          border-left-color: #c8a96e;
          font-weight: 500;
        }

        .nav-icon {
          font-size: 1rem;
          width: 18px;
          text-align: center;
          flex-shrink: 0;
        }

        .sidebar-logout {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.25);
          font-size: 0.85rem;
          cursor: pointer;
          transition: color 0.15s;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }

        .sidebar-logout:hover {
          color: rgba(255,255,255,0.6);
        }
      `}</style>
    </aside>
  );
}
