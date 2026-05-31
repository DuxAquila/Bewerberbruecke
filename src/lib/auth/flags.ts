// Alle verfügbaren Einzelberechtigungen
export const FLAGS = [
  "MANAGE_USERS",
  "MANAGE_ROLES",
  "VIEW_DASHBOARD",
  "MANAGE_CONTACTS",
  "MANAGE_SEQUENCES",
  "SEND_EMAILS",
  "VIEW_TRACKING",
  "MANAGE_NEWSLETTER",
  "MANAGE_BLOG",
  "MANAGE_GALLERY",
  "MANAGE_SETTINGS",
  "VIEW_INQUIRIES",
] as const;

export type Flag = (typeof FLAGS)[number];

// Voreingestellte Rollen mit ihren Flags
export const ROLE_FLAGS: Record<string, Flag[]> = {
  SUPER_ADMIN: [...FLAGS],
  ADMIN: FLAGS.filter((f) => f !== "MANAGE_USERS" && f !== "MANAGE_ROLES"),
  SALES: ["MANAGE_CONTACTS", "MANAGE_SEQUENCES", "SEND_EMAILS", "VIEW_TRACKING"],
  EDITOR: ["MANAGE_BLOG", "MANAGE_GALLERY"],
};

// Prüft ob ein User ein bestimmtes Flag hat
// Berücksichtigt Rollen-Flags + individuelle User-Flags
export function hasFlag(
  userFlags: string[],
  roleFlags: string[],
  flag: Flag
): boolean {
  return userFlags.includes(flag) || roleFlags.includes(flag);
}

// Gibt alle effektiven Flags eines Users zurück (Rolle + individuelle)
export function getEffectiveFlags(
  userFlags: string[],
  roleFlags: string[]
): Flag[] {
  const combined = new Set([...userFlags, ...roleFlags]);
  return FLAGS.filter((f) => combined.has(f));
}
