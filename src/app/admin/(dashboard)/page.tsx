import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/client";

async function getStats() {
  const [contacts, inquiries, newsletter, emailsSent] = await Promise.all([
    prisma.contact.count(),
    prisma.inquiry.count({ where: { read: false } }),
    prisma.newsletterSubscriber.count({ where: { active: true } }),
    prisma.emailLog.count({
      where: {
        sentAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
  ]);
  return { contacts, inquiries, newsletter, emailsSent };
}

async function getRecentInquiries() {
  return prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

async function getRecentActivity() {
  return prisma.activityLog.findMany({
    where: {
      action: {
        notIn: ["LOGIN_SUCCESS", "LOGIN_FAILED"],
      },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

const CATEGORY_COLOR: Record<string, string> = {
  akquise:    "cat-blue",
  anfragen:   "cat-amber",
  inhalte:    "cat-green",
  system:     "cat-gray",
  sicherheit: "cat-red",
};

const CATEGORY_LABEL: Record<string, string> = {
  akquise:    "Akquise",
  anfragen:   "Anfragen",
  inhalte:    "Inhalte",
  system:     "System",
  sicherheit: "Sicherheit",
};

const ACTION_LABEL: Record<string, string> = {
  CONTACT_CREATED:           "hat Kontakt angelegt",
  CONTACT_UPDATED:           "hat Kontakt bearbeitet",
  CONTACT_DELETED:           "hat Kontakt gelöscht",
  CONTACT_STATUS_CHANGED:    "hat Kontaktstatus geändert",
  CONTACT_OPT_OUT:           "hat Opt-Out gesetzt",
  SEQUENCE_STARTED:          "hat Sequenz gestartet",
  SEQUENCE_PAUSED:           "hat Sequenz pausiert",
  SEQUENCE_STOPPED:          "hat Sequenz gestoppt",
  SEQUENCE_COMPLETED:        "hat Sequenz abgeschlossen",
  MAIL_SENT:                 "hat eine Mail gesendet",
  INQUIRY_READ:              "hat Anfrage gelesen",
  INQUIRY_ARCHIVED:          "hat Anfrage archiviert",
  NEWSLETTER_SUB_ADDED:      "hat Newsletter-Abo hinzugefügt",
  NEWSLETTER_SUB_REMOVED:    "hat Newsletter-Abo entfernt",
  GALLERY_CREATED:           "hat Referenz erstellt",
  GALLERY_UPDATED:           "hat Referenz bearbeitet",
  GALLERY_DELETED:           "hat Referenz gelöscht",
  BLOG_CREATED:              "hat Blogartikel erstellt",
  BLOG_UPDATED:              "hat Blogartikel bearbeitet",
  BLOG_PUBLISHED:            "hat Blogartikel veröffentlicht",
  BLOG_DELETED:              "hat Blogartikel gelöscht",
  USER_CREATED:              "hat Benutzer angelegt",
  USER_UPDATED:              "hat Benutzer bearbeitet",
  USER_LOCKED:               "hat Benutzer gesperrt",
  USER_UNLOCKED:             "hat Benutzer entsperrt",
  USER_DELETED:              "hat Benutzer gelöscht",
  USER_ROLE_CHANGED:         "hat Benutzerrolle geändert",
  SETTINGS_UPDATED:          "hat Einstellungen geändert",
  LOGIN_SUCCESS:             "hat sich angemeldet",
  LOGIN_FAILED:              "Anmeldeversuch fehlgeschlagen",
  PASSWORD_CHANGED:          "hat Passwort geändert",
  TWO_FACTOR_ENABLED:        "hat 2FA aktiviert",
  TWO_FACTOR_DISABLED:       "hat 2FA deaktiviert",
  TWO_FACTOR_RESET:          "hat 2FA zurückgesetzt",
  SEQUENCE_TEMPLATE_CREATED: "hat Sequenz-Template erstellt",
  SEQUENCE_TEMPLATE_UPDATED: "hat Sequenz-Template bearbeitet",
  SEQUENCE_TEMPLATE_DELETED: "hat Sequenz-Template gelöscht",
};

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60)   return "Gerade eben";
  if (diff < 3600) return `vor ${Math.floor(diff / 60)} Min.`;
  if (diff < 86400) return `vor ${Math.floor(diff / 3600)} Std.`;
  return new Date(date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function initials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const firstName = session?.user.name?.split(" ")[0] ?? "Hallo";

  const [stats, inquiries, activity] = await Promise.all([
    getStats(),
    getRecentInquiries(),
    getRecentActivity(),
  ]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Guten Morgen" : hour < 18 ? "Guten Tag" : "Guten Abend";

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dash-header">
        <h2 className="dash-greeting">{greeting}, {firstName} 👋</h2>
        <p className="dash-sub">Hier ist, was heute wichtig ist.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Ungelesene Anfragen</div>
          <div className="stat-value">{stats.inquiries}</div>
          <div className="stat-hint">offen</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">CRM Kontakte</div>
          <div className="stat-value">{stats.contacts}</div>
          <div className="stat-hint">gesamt</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Newsletter Abos</div>
          <div className="stat-value">{stats.newsletter}</div>
          <div className="stat-hint">aktiv</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">E-Mails heute</div>
          <div className="stat-value">{stats.emailsSent}</div>
          <div className="stat-hint">versendet</div>
        </div>
      </div>

      <div className="dash-two-col">
        {/* Letzte Anfragen */}
        <div className="dash-card">
          <div className="dash-card-head">
            <h3 className="dash-card-title">Letzte Kontaktanfragen</h3>
            <a href="/admin/inquiries" className="dash-card-link">Alle ansehen →</a>
          </div>

          {inquiries.length === 0 ? (
            <div className="empty-state">
              Keine Anfragen vorhanden.
              </div>
          ) : (
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th>Eingegangen</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td className="td-name">{inq.name}</td>
                    <td className="td-muted">{inq.email}</td>
                    <td className="td-muted">
                      {new Date(inq.createdAt).toLocaleDateString("de-DE", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <span className={`badge ${inq.read ? "badge-gray" : "badge-amber"}`}>
                        {inq.read ? "Gelesen" : "Neu"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Activity Log */}
        <div className="dash-card">
          <div className="dash-card-head">
            <h3 className="dash-card-title">Letzte Aktivitäten</h3>
            <a href="/admin/log" className="dash-card-link">Alle ansehen →</a>
          </div>

          {activity.length === 0 ? (
            <div className="empty-state">Noch keine Aktivitäten.</div>
          ) : (
            <div className="activity-list">
              {activity.map((log) => (
                <div key={log.id} className="activity-item">
                  <div className="activity-avatar">
                    {initials(log.userName)}
                  </div>
                  <div className="activity-body">
                    <div className="activity-text">
                      <span className="activity-user">{log.userName}</span>
                      {" "}{ACTION_LABEL[log.action] ?? log.action}
                      {log.label && (
                        <span className="activity-label"> „{log.label}"</span>
                      )}
                    </div>
                    <div className="activity-meta">
                      <span className={`cat-badge ${CATEGORY_COLOR[log.category] ?? "cat-gray"}`}>
                        {CATEGORY_LABEL[log.category] ?? log.category}
                      </span>
                      <span className="activity-time">{timeAgo(log.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Schnellzugriff */}
      <div className="dash-card">
        <div className="dash-card-head">
          <h3 className="dash-card-title">Schnellzugriff</h3>
        </div>
        <div className="quick-grid">
          <a href="/admin/contacts/new" className="quick-btn">
            <span className="quick-icon blue">◎</span>
            <div>
              <div className="quick-label">Kontakt anlegen</div>
              <div className="quick-sub">Neuen CRM-Eintrag erstellen</div>
            </div>
          </a>
          <a href="/admin/sequences" className="quick-btn">
            <span className="quick-icon green">⟳</span>
            <div>
              <div className="quick-label">Sequenz starten</div>
              <div className="quick-sub">E-Mail-Reihe aktivieren</div>
            </div>
          </a>
          <a href="/admin/gallery/new" className="quick-btn">
            <span className="quick-icon amber">◈</span>
            <div>
              <div className="quick-label">Referenz hinzufügen</div>
              <div className="quick-sub">Neue Fallstudie eintragen</div>
            </div>
          </a>
          <a href="/admin/blog/new" className="quick-btn">
            <span className="quick-icon purple">◇</span>
            <div>
              <div className="quick-label">Blogartikel schreiben</div>
              <div className="quick-sub">Neuen Beitrag erstellen</div>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        .dashboard { max-width: 1100px; }
        .dash-header { margin-bottom: 1.75rem; }
        .dash-greeting { font-size:1.4rem; font-weight:600; color:#fff; letter-spacing:-0.02em; margin-bottom:0.25rem; }
        .dash-sub { font-size:0.875rem; color:rgba(255,255,255,0.35); }

        .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0.875rem; margin-bottom:1rem; }
        @media(max-width:900px){ .stats-grid{ grid-template-columns:repeat(2,1fr); } }
        @media(max-width:500px){ .stats-grid{ grid-template-columns:1fr; } }

        .stat-card { background:#181c24; border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.25rem; }
        .stat-label { font-size:0.75rem; color:rgba(255,255,255,0.4); margin-bottom:0.5rem; }
        .stat-value { font-size:2rem; font-weight:600; color:#fff; letter-spacing:-0.03em; line-height:1; margin-bottom:0.25rem; }
        .stat-hint { font-size:0.75rem; color:rgba(255,255,255,0.25); }

        .dash-two-col { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem; }
        @media(max-width:800px){ .dash-two-col{ grid-template-columns:1fr; } }

        .dash-card { background:#181c24; border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.25rem; margin-bottom:1rem; }
        .dash-card-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; }
        .dash-card-title { font-size:0.9rem; font-weight:500; color:#fff; }
        .dash-card-link { font-size:0.8rem; color:rgba(200,169,110,0.7); text-decoration:none; transition:color 0.15s; }
        .dash-card-link:hover { color:#c8a96e; }

        .empty-state { font-size:0.875rem; color:rgba(255,255,255,0.25); padding:1rem 0; }

        .dash-table { width:100%; border-collapse:collapse; font-size:0.85rem; }
        .dash-table th { text-align:left; font-size:0.72rem; color:rgba(255,255,255,0.3); font-weight:500; padding:0 0.5rem 0.6rem; border-bottom:1px solid rgba(255,255,255,0.06); text-transform:uppercase; letter-spacing:0.06em; }
        .dash-table td { padding:0.7rem 0.5rem; border-bottom:1px solid rgba(255,255,255,0.04); vertical-align:middle; }
        .dash-table tr:last-child td { border-bottom:none; }
        .td-name { color:rgba(255,255,255,0.85); font-weight:500; }
        .td-muted { color:rgba(255,255,255,0.4); }

        .badge { display:inline-block; font-size:0.72rem; padding:0.2rem 0.6rem; border-radius:20px; font-weight:500; }
        .badge-amber { background:rgba(234,179,8,0.1); color:rgba(234,179,8,0.9); }
        .badge-gray  { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.35); }

        .activity-list { display:flex; flex-direction:column; gap:0; }
        .activity-item { display:flex; align-items:flex-start; gap:0.75rem; padding:0.75rem 0; border-bottom:1px solid rgba(255,255,255,0.04); }
        .activity-item:last-child { border-bottom:none; }
        .activity-avatar { width:30px; height:30px; border-radius:50%; background:rgba(200,169,110,0.12); color:#c8a96e; font-size:0.65rem; font-weight:600; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; letter-spacing:0.02em; }
        .activity-body { flex:1; min-width:0; }
        .activity-text { font-size:0.82rem; color:rgba(255,255,255,0.7); line-height:1.4; margin-bottom:0.3rem; }
        .activity-user { font-weight:500; color:rgba(255,255,255,0.9); }
        .activity-label { color:rgba(255,255,255,0.5); font-style:italic; }
        .activity-meta { display:flex; align-items:center; gap:0.5rem; }
        .activity-time { font-size:0.72rem; color:rgba(255,255,255,0.25); }

        .cat-badge { font-size:0.65rem; padding:0.15rem 0.5rem; border-radius:20px; font-weight:500; }
        .cat-blue  { background:rgba(59,130,246,0.1);  color:#60a5fa; }
        .cat-amber { background:rgba(234,179,8,0.1);   color:rgba(234,179,8,0.9); }
        .cat-green { background:rgba(34,197,94,0.1);   color:#4ade80; }
        .cat-gray  { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.4); }
        .cat-red   { background:rgba(239,68,68,0.1);   color:#f87171; }

        .quick-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }
        @media(max-width:600px){ .quick-grid{ grid-template-columns:1fr; } }
        .quick-btn { display:flex; align-items:center; gap:0.75rem; padding:0.875rem 1rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:10px; text-decoration:none; transition:background 0.15s,border-color 0.15s; }
        .quick-btn:hover { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1); }
        .quick-icon { width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; }
        .quick-icon.blue   { background:rgba(59,130,246,0.12); color:#60a5fa; }
        .quick-icon.green  { background:rgba(34,197,94,0.12);  color:#4ade80; }
        .quick-icon.amber  { background:rgba(234,179,8,0.12);  color:#facc15; }
        .quick-icon.purple { background:rgba(168,85,247,0.12); color:#c084fc; }
        .quick-label { font-size:0.85rem; font-weight:500; color:rgba(255,255,255,0.8); margin-bottom:0.15rem; }
        .quick-sub { font-size:0.75rem; color:rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
}
