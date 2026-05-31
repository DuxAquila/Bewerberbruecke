import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/client";

async function getStats() {
  const [contacts, inquiries, newsletter, emailsSent] = await Promise.all([
    prisma.contact.count(),
    prisma.inquiry.count({ where: { read: false } }),
    prisma.newsletterSubscriber.count({ where: { active: true } }),
    prisma.emailLog.count({
      where: { sentAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
    }),
  ]);
  return { contacts, inquiries, newsletter, emailsSent };
}

async function getRecentInquiries() {
  return prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 });
}

async function getRecentActivity() {
  return prisma.activityLog.findMany({
    where: { action: { notIn: ["LOGIN_SUCCESS", "LOGIN_FAILED"] } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

const CATEGORY_CLASS: Record<string, string> = {
  akquise:    "admin-badge-info",
  anfragen:   "admin-badge-warning",
  inhalte:    "admin-badge-success",
  system:     "admin-badge-muted",
  sicherheit: "admin-badge-danger",
};

const CATEGORY_LABEL: Record<string, string> = {
  akquise: "Akquise", anfragen: "Anfragen", inhalte: "Inhalte",
  system: "System", sicherheit: "Sicherheit",
};

const ACTION_LABEL: Record<string, string> = {
  CONTACT_CREATED: "hat Kontakt angelegt", CONTACT_UPDATED: "hat Kontakt bearbeitet",
  CONTACT_DELETED: "hat Kontakt gelöscht", CONTACT_STATUS_CHANGED: "hat Kontaktstatus geändert",
  CONTACT_OPT_OUT: "hat Opt-Out gesetzt", SEQUENCE_STARTED: "hat Sequenz gestartet",
  SEQUENCE_PAUSED: "hat Sequenz pausiert", SEQUENCE_STOPPED: "hat Sequenz gestoppt",
  SEQUENCE_COMPLETED: "hat Sequenz abgeschlossen", MAIL_SENT: "hat eine Mail gesendet",
  INQUIRY_READ: "hat Anfrage gelesen", INQUIRY_ARCHIVED: "hat Anfrage archiviert",
  NEWSLETTER_SUB_ADDED: "hat Newsletter-Abo hinzugefügt", NEWSLETTER_SUB_REMOVED: "hat Newsletter-Abo entfernt",
  GALLERY_CREATED: "hat Referenz erstellt", GALLERY_UPDATED: "hat Referenz bearbeitet",
  GALLERY_DELETED: "hat Referenz gelöscht", BLOG_CREATED: "hat Blogartikel erstellt",
  BLOG_UPDATED: "hat Blogartikel bearbeitet", BLOG_PUBLISHED: "hat Blogartikel veröffentlicht",
  BLOG_DELETED: "hat Blogartikel gelöscht", USER_CREATED: "hat Benutzer angelegt",
  USER_UPDATED: "hat Benutzer bearbeitet", USER_LOCKED: "hat Benutzer gesperrt",
  USER_UNLOCKED: "hat Benutzer entsperrt", USER_DELETED: "hat Benutzer gelöscht",
  USER_ROLE_CHANGED: "hat Benutzerrolle geändert", SETTINGS_UPDATED: "hat Einstellungen geändert",
  PASSWORD_CHANGED: "hat Passwort geändert", TWO_FACTOR_ENABLED: "hat 2FA aktiviert",
  TWO_FACTOR_DISABLED: "hat 2FA deaktiviert", TWO_FACTOR_RESET: "hat 2FA zurückgesetzt",
  SEQUENCE_TEMPLATE_CREATED: "hat Sequenz-Template erstellt",
  SEQUENCE_TEMPLATE_UPDATED: "hat Sequenz-Template bearbeitet",
  SEQUENCE_TEMPLATE_DELETED: "hat Sequenz-Template gelöscht",
};

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60)    return "Gerade eben";
  if (diff < 3600)  return `vor ${Math.floor(diff / 60)} Min.`;
  if (diff < 86400) return `vor ${Math.floor(diff / 3600)} Std.`;
  return new Date(date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function initials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default async function DashboardPage() {
  const session   = await getServerSession(authOptions);
  const firstName = session?.user.name?.split(" ")[0] ?? "Hallo";
  const hour      = new Date().getHours();
  const greeting  = hour < 12 ? "Guten Morgen" : hour < 18 ? "Guten Tag" : "Guten Abend";

  const [stats, inquiries, activity] = await Promise.all([
    getStats(), getRecentInquiries(), getRecentActivity(),
  ]);

  return (
    <div style={{ maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--admin-text)", letterSpacing: "-0.02em", marginBottom: "0.25rem", fontFamily: "var(--font-sans)" }}>
          {greeting}, {firstName} 👋
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--admin-text-muted)" }}>Hier ist, was heute wichtig ist.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.875rem", marginBottom: "1rem" }}>
        {[
          { label: "Ungelesene Anfragen", value: stats.inquiries, hint: "offen" },
          { label: "CRM Kontakte",        value: stats.contacts,  hint: "gesamt" },
          { label: "Newsletter Abos",     value: stats.newsletter, hint: "aktiv" },
          { label: "E-Mails heute",       value: stats.emailsSent, hint: "versendet" },
        ].map((s) => (
          <div key={s.label} className="admin-stat-card">
            <div className="admin-stat-label">{s.label}</div>
            <div className="admin-stat-value">{s.value}</div>
            <div className="admin-stat-hint">{s.hint}</div>
          </div>
        ))}
      </div>

      {/* Zwei-Spalten: Anfragen + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        {/* Anfragen */}
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--admin-text)" }}>Letzte Kontaktanfragen</h3>
            <a href="/admin/inquiries" style={{ fontSize: "0.8rem", color: "var(--accent)", textDecoration: "none" }}>Alle ansehen →</a>
          </div>
          {inquiries.length === 0 ? (
            <p className="admin-empty">Keine Anfragen vorhanden.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Eingegangen</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td className="primary">{inq.name}</td>
                    <td>{new Date(inq.createdAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</td>
                    <td>
                      <span className={`admin-badge ${inq.read ? "admin-badge-muted" : "admin-badge-warning"}`}>
                        {inq.read ? "Gelesen" : "Neu"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Activity */}
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--admin-text)" }}>Letzte Aktivitäten</h3>
            <a href="/admin/log" style={{ fontSize: "0.8rem", color: "var(--accent)", textDecoration: "none" }}>Alle ansehen →</a>
          </div>
          {activity.length === 0 ? (
            <p className="admin-empty">Noch keine Aktivitäten.</p>
          ) : (
            <div>
              {activity.map((log) => (
                <div key={log.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.7rem 0", borderBottom: "1px solid var(--admin-border-soft)" }}>
                  <div className="admin-user-avatar" style={{ width: 28, height: 28, fontSize: "0.65rem", flexShrink: 0, marginTop: 1 }}>
                    {initials(log.userName)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.82rem", color: "var(--admin-text-muted)", lineHeight: 1.4, marginBottom: "0.3rem" }}>
                      <span style={{ fontWeight: 500, color: "var(--admin-text)" }}>{log.userName}</span>
                      {" "}{ACTION_LABEL[log.action] ?? log.action}
                      {log.label && <span style={{ color: "var(--admin-text-faint)", fontStyle: "italic" }}> „{log.label}"</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span className={`admin-badge ${CATEGORY_CLASS[log.category] ?? "admin-badge-muted"}`}>
                        {CATEGORY_LABEL[log.category] ?? log.category}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--admin-text-faint)" }}>{timeAgo(log.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Schnellzugriff */}
      <div className="admin-card">
        <h3 style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--admin-text)", marginBottom: "1rem" }}>Schnellzugriff</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {[
            { href: "/admin/contacts/new",  icon: "◎", color: "var(--admin-info)",    bg: "var(--admin-info-bg)",    label: "Kontakt anlegen",      sub: "Neuen CRM-Eintrag erstellen" },
            { href: "/admin/sequences",     icon: "⟳", color: "var(--admin-success)", bg: "var(--admin-success-bg)", label: "Sequenz starten",       sub: "E-Mail-Reihe aktivieren" },
            { href: "/admin/gallery/new",   icon: "◈", color: "var(--admin-warning)", bg: "var(--admin-warning-bg)", label: "Referenz hinzufügen",   sub: "Neue Fallstudie eintragen" },
            { href: "/admin/blog/new",      icon: "◇", color: "var(--accent)",        bg: "var(--admin-accent-bg)",  label: "Blogartikel schreiben", sub: "Neuen Beitrag erstellen" },
          ].map((q) => (
            <a key={q.href} href={q.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1rem", background: "var(--admin-surface-2)", border: "1px solid var(--admin-border-soft)", borderRadius: "var(--radius-md)", textDecoration: "none", transition: "border-color 0.15s" }}>
              <span style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0, background: q.bg, color: q.color }}>
                {q.icon}
              </span>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--admin-text)", marginBottom: "0.15rem" }}>{q.label}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--admin-text-faint)" }}>{q.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
