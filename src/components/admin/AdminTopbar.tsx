"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

interface AdminTopbarProps {
  title: string;
}

export default function AdminTopbar({ title }: AdminTopbarProps) {
  const { data: session } = useSession();
  const user = session?.user;

  const show2faBanner =
    user?.twoFactorEnabled === false &&
    // Hinweis nur wenn nicht kürzlich weggeklickt (Client-seitig via localStorage)
    typeof window !== "undefined" &&
    localStorage.getItem("2fa_remind_dismissed") !== "true";

  return (
    <>
      {/* 2FA-Hinweis-Banner */}
      {show2faBanner && (
        <div className="tfa-banner">
          <span className="tfa-banner-text">
            🔐 Dein Konto ist noch nicht mit Zwei-Faktor-Authentifizierung geschützt.
          </span>
          <div className="tfa-banner-actions">
            <Link href="/admin/settings/2fa" className="tfa-banner-btn">
              Jetzt einrichten
            </Link>
            <button
              className="tfa-banner-dismiss"
              onClick={() => {
                localStorage.setItem("2fa_remind_dismissed", "true");
                // Banner verstecken ohne Reload
                const banner = document.querySelector(".tfa-banner") as HTMLElement;
                if (banner) banner.style.display = "none";
              }}
            >
              Später
            </button>
          </div>
        </div>
      )}

      {/* Topbar */}
      <header className="topbar">
        <h1 className="topbar-title">{title}</h1>

        <div className="topbar-user">
          <div className="user-avatar">
            {user?.name?.slice(0, 2).toUpperCase() ?? "??"}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role ?? "Admin"}</span>
          </div>
        </div>
      </header>

      <style>{`
        .tfa-banner {
          background: rgba(234,179,8,0.08);
          border-bottom: 1px solid rgba(234,179,8,0.15);
          padding: 0.65rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        .tfa-banner-text {
          font-size: 0.85rem;
          color: rgba(234,179,8,0.9);
        }

        .tfa-banner-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .tfa-banner-btn {
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.3rem 0.85rem;
          background: rgba(234,179,8,0.15);
          color: rgba(234,179,8,0.9);
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.15s;
        }

        .tfa-banner-btn:hover {
          background: rgba(234,179,8,0.25);
        }

        .tfa-banner-dismiss {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.25);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: inherit;
          transition: color 0.15s;
        }

        .tfa-banner-dismiss:hover {
          color: rgba(255,255,255,0.5);
        }

        .topbar {
          height: 56px;
          background: #0f1117;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        .topbar-title {
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .topbar-user {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(200,169,110,0.15);
          color: #c8a96e;
          font-size: 0.7rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.02em;
          flex-shrink: 0;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          line-height: 1.2;
        }

        .user-role {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          line-height: 1.2;
        }
      `}</style>
    </>
  );
}
