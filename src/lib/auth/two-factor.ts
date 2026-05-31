import { TOTP, Secret } from "otpauth";
import { Prisma } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/client";

// ─── Verschlüsselung des TOTP-Secrets ────────────────────

const ENCRYPTION_KEY = process.env.TWO_FACTOR_ENCRYPTION_KEY!;
const ALGORITHM = "aes-256-cbc";

function encrypt(text: string): string {
  const iv      = crypto.randomBytes(16);
  const key     = Buffer.from(ENCRYPTION_KEY, "hex");
  const cipher  = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text: string): string {
  const [ivHex, encryptedHex] = text.split(":");
  const iv        = Buffer.from(ivHex, "hex");
  const key       = Buffer.from(ENCRYPTION_KEY, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher  = crypto.createDecipheriv(ALGORITHM, key, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString();
}

// ─── TOTP Helpers ────────────────────────────────────────

function createTOTP(secret: string, email: string) {
  return new TOTP({
    issuer:    "Bewerberbrücke Admin",
    label:     email,
    algorithm: "SHA1",
    digits:    6,
    period:    30,
    secret,
  });
}

// ─── Setup ───────────────────────────────────────────────

export function generateTwoFactorSecret(userEmail: string): {
  secret: string;
  otpAuthUrl: string;
} {
  const secret = new Secret({ size: 20 }).base32;
  const totp   = createTOTP(secret, userEmail);
  return { secret, otpAuthUrl: totp.toString() };
}

export async function confirmTwoFactorSetup(
  userId: string,
  secret: string,
  token:  string
): Promise<{ success: boolean; backupCodes?: string[] }> {
  const totp  = createTOTP(secret, "");
  const delta = totp.validate({ token, window: 1 });
  if (delta === null) return { success: false };

  const rawCodes    = Array.from({ length: 8 }, () =>
    crypto.randomBytes(5).toString("hex").toUpperCase()
  );
  const hashedCodes = await Promise.all(
    rawCodes.map((c) => bcrypt.hash(c, 10))
  );

  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorSecret:  encrypt(secret),
      twoFactorEnabled: true,
      twoFactorBackup:  hashedCodes,
      twoFactorSetupAt: new Date(),
    },
  });

  return { success: true, backupCodes: rawCodes };
}

// ─── Verify beim Login ───────────────────────────────────

export async function verifyTwoFactorToken(
  userId: string,
  token:  string
): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.twoFactorSecret) return false;

  const secret = decrypt(user.twoFactorSecret);
  const totp   = createTOTP(secret, user.email);
  return totp.validate({ token, window: 1 }) !== null;
}

export async function verifyBackupCode(
  userId: string,
  code:   string
): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.twoFactorBackup) return false;

  const hashed   = user.twoFactorBackup as string[];
  let usedIndex  = -1;

  for (let i = 0; i < hashed.length; i++) {
    if (await bcrypt.compare(code.toUpperCase(), hashed[i])) {
      usedIndex = i;
      break;
    }
  }

  if (usedIndex === -1) return false;

  const remaining = hashed.filter((_, i) => i !== usedIndex);
  await prisma.user.update({
    where: { id: userId },
    data:  { twoFactorBackup: remaining },
  });

  return true;
}

// ─── Deaktivieren ────────────────────────────────────────

export async function disableTwoFactor(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorEnabled: false,
      twoFactorSecret:  null,
      twoFactorBackup:  Prisma.JsonNull,
      twoFactorSetupAt: null,
    },
  });
}
