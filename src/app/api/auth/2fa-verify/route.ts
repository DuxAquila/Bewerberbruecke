import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { verifyTwoFactorToken, verifyBackupCode } from "@/lib/auth/two-factor";
import { logActivity } from "@/lib/activity";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
  }

  if (!session.user.twoFactorPending) {
    return NextResponse.json({ error: "2FA nicht ausstehend." }, { status: 400 });
  }

  const { code, isBackup } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Kein Code übergeben." }, { status: 400 });
  }

  const userId   = session.user.id;
  const userName = session.user.name;

  const valid = isBackup
    ? await verifyBackupCode(userId, code)
    : await verifyTwoFactorToken(userId, code);

  if (!valid) {
    return NextResponse.json({ error: "Ungültiger Code." }, { status: 401 });
  }

  // twoFactorPending aus dem JWT entfernen
  // Da NextAuth JWT-basiert ist, updaten wir das Token über ein Update-Callback.
  // Der Client ruft danach update() aus next-auth/react auf.
  await logActivity({
    userId,
    userName,
    action: "LOGIN_SUCCESS",
    meta:   { via: isBackup ? "backup_code" : "totp" },
  });

  return NextResponse.json({ ok: true });
}
