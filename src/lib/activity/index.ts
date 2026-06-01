import { prisma } from "@/lib/db/client";

export type ActivityAction =
  // ── Akquise ─────────────────────────────────────────
  | "CONTACT_CREATED"
  | "CONTACT_UPDATED"
  | "CONTACT_DELETED"
  | "CONTACT_STATUS_CHANGED"
  | "CONTACT_OPT_OUT"
  | "SEQUENCE_STARTED"
  | "SEQUENCE_PAUSED"
  | "SEQUENCE_STOPPED"
  | "SEQUENCE_COMPLETED"
  | "MAIL_SENT"
  // ── Anfragen ────────────────────────────────────────
  | "INQUIRY_READ"
  | "INQUIRY_ARCHIVED"
  | "NEWSLETTER_SUB_ADDED"
  | "NEWSLETTER_SUB_REMOVED"
  // ── Inhalte ─────────────────────────────────────────
  | "GALLERY_CREATED"
  | "GALLERY_UPDATED"
  | "GALLERY_DELETED"
  | "BLOG_CREATED"
  | "BLOG_UPDATED"
  | "BLOG_PUBLISHED"
  | "BLOG_DELETED"
  // ── System ──────────────────────────────────────────
  | "USER_CREATED"
  | "USER_UPDATED"
  | "USER_LOCKED"
  | "USER_UNLOCKED"
  | "USER_DELETED"
  | "USER_ROLE_CHANGED"
  | "SEQUENCE_TEMPLATE_CREATED"
  | "SEQUENCE_TEMPLATE_UPDATED"
  | "SEQUENCE_TEMPLATE_DELETED"
  | "SETTINGS_UPDATED"
  // ── Sicherheit ──────────────────────────────────────
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "PASSWORD_CHANGED"
  | "TWO_FACTOR_ENABLED"
  | "TWO_FACTOR_DISABLED"
  | "TWO_FACTOR_RESET";

export type ActivityCategory =
  | "akquise"
  | "anfragen"
  | "inhalte"
  | "system"
  | "sicherheit";

const ACTION_CATEGORY: Record<ActivityAction, ActivityCategory> = {
  CONTACT_CREATED:            "akquise",
  CONTACT_UPDATED:            "akquise",
  CONTACT_DELETED:            "akquise",
  CONTACT_STATUS_CHANGED:     "akquise",
  CONTACT_OPT_OUT:            "akquise",
  SEQUENCE_STARTED:           "akquise",
  SEQUENCE_PAUSED:            "akquise",
  SEQUENCE_STOPPED:           "akquise",
  SEQUENCE_COMPLETED:         "akquise",
  MAIL_SENT:                  "akquise",
  INQUIRY_READ:               "anfragen",
  INQUIRY_ARCHIVED:           "anfragen",
  NEWSLETTER_SUB_ADDED:       "anfragen",
  NEWSLETTER_SUB_REMOVED:     "anfragen",
  GALLERY_CREATED:            "inhalte",
  GALLERY_UPDATED:            "inhalte",
  GALLERY_DELETED:            "inhalte",
  BLOG_CREATED:               "inhalte",
  BLOG_UPDATED:               "inhalte",
  BLOG_PUBLISHED:             "inhalte",
  BLOG_DELETED:               "inhalte",
  USER_CREATED:               "system",
  USER_UPDATED:               "system",
  USER_LOCKED:                "system",
  USER_UNLOCKED:              "system",
  USER_DELETED:               "system",
  USER_ROLE_CHANGED:          "system",
  SEQUENCE_TEMPLATE_CREATED:  "system",
  SEQUENCE_TEMPLATE_UPDATED:  "system",
  SEQUENCE_TEMPLATE_DELETED:  "system",
  SETTINGS_UPDATED:           "system",
  LOGIN_SUCCESS:              "sicherheit",
  LOGIN_FAILED:               "sicherheit",
  PASSWORD_CHANGED:           "sicherheit",
  TWO_FACTOR_ENABLED:         "sicherheit",
  TWO_FACTOR_DISABLED:        "sicherheit",
  TWO_FACTOR_RESET:           "sicherheit",
};

export interface LogActivityOptions {
  userId:    string;
  userName:  string;
  action:    ActivityAction;
  entity?:   string;
  entityId?: string;
  label?:    string;
  meta?:     Record<string, unknown>;
}

/**
 * Zentrale Funktion für alle Admin-Aktionen.
 * Wirft nie — Logging-Fehler sollen die eigentliche Aktion nicht blockieren.
 *
 * Verwendung:
 *   await logActivity({ userId, userName, action: "CONTACT_CREATED", entity: "Contact", entityId: contact.id, label: contact.name })
 */
export async function logActivity(opts: LogActivityOptions): Promise<void> {
  try {
    await prisma.activityLog.create({
      data: {
        userId:   opts.userId,
        userName: opts.userName,
        action:   opts.action,
        category: ACTION_CATEGORY[opts.action],
        entity:   opts.entity,
        entityId: opts.entityId,
        label:    opts.label,
        meta:     opts.meta ? (opts.meta as import("@prisma/client").Prisma.InputJsonValue) : undefined,
      },
    });
  } catch (err) {
    // Niemals die aufrufende Funktion blockieren
    console.error("[activity] Failed to write log:", err);
  }
}
