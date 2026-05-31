"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface AdminTopbarProps {
  title: string;
}

export default function AdminTopbar({ title }: AdminTopbarProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    if (
      user?.twoFactorEnabled === false &&
      localStorage.getItem("2fa_remind_dismissed") !== "true"
    ) {
      setBannerVisible(true);
    }
  }, [user]);

  return (
    <>
      {bannerVisible && (
        <div className="admin-2fa-banner">
          <span style={{ fontSize: "0.85rem", color: "var(--admin-warning)" }}>
            🔐 Dein Konto ist noch nicht mit Zwei-Faktor-Authentifizierung geschützt.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            <Link href="/admin/settings/2fa" className="admin-btn admin-btn-ghost" style={{ fontSize: "0.8rem", padding: "0.25rem 0.75rem" }}>
              Jetzt einrichten
            </Link>
            <button
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem", color: "var(--admin-text-faint)", fontFamily: "var(--font-sans)" }}
              onClick={() => {
                localStorage.setItem("2fa_remind_dismissed", "true");
                setBannerVisible(false);
              }}
            >
              Später
            </button>
          </div>
        </div>
      )}

      <header className="admin-topbar">
        <h1 className="admin-topbar-title">{title}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div className="admin-user-avatar">
            {user?.name?.slice(0, 2).toUpperCase() ?? "??"}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--admin-text)", lineHeight: 1.2 }}>
              {user?.name}
            </span>
            <span style={{ fontSize: "0.7rem", color: "var(--admin-text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.2 }}>
              {user?.role ?? "Admin"}
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
