import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import type { DefaultSession } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/client";
import { getEffectiveFlags } from "@/lib/auth/flags";
import type { Flag } from "@/lib/auth/flags";
import { logActivity } from "@/lib/activity";

// ─── Session-Typen erweitern ─────────────────────────────

declare module "next-auth" {
  interface Session {
    user: {
      id:               string;
      name:             string;
      email:            string;
      role:             string | null;
      flags:            Flag[];
      twoFactorEnabled: boolean;
      // true = 2FA noch ausständig (Token wurde noch nicht verifiziert)
      twoFactorPending: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    id:               string;
    name:             string;
    email:            string;
    role:             string | null;
    flags:            Flag[];
    twoFactorEnabled: boolean;
    twoFactorPending: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id:               string;
    role:             string | null;
    flags:            Flag[];
    twoFactorEnabled: boolean;
    twoFactorPending: boolean;
  }
}

// ─── NextAuth Config ─────────────────────────────────────

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  pages: {
    signIn:  "/admin/login",
    error:   "/admin/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "E-Mail",   type: "email" },
        password: { label: "Passwort", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where:   { email: credentials.email },
          include: { role: true },
        });

        // User nicht gefunden
        if (!user) {
          // Trotzdem kurz warten um Timing-Angriffe zu erschweren
          await bcrypt.compare("dummy", "$2b$10$dummyhashfortimingprotection000");
          return null;
        }

        // User gesperrt?
        if (!user.active) return null;

        // Temporär gesperrt nach zu vielen Fehlversuchen?
        if (user.lockedUntil && user.lockedUntil > new Date()) return null;

        // Passwort prüfen
        const valid = await bcrypt.compare(credentials.password, user.password);

        if (!valid) {
          // Fehlversuch zählen, ab 5 für 15 Minuten sperren
          const failed = user.failedLogins + 1;
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLogins: failed,
              lockedUntil:  failed >= 5
                ? new Date(Date.now() + 15 * 60 * 1000)
                : null,
            },
          });

          await logActivity({
            userId:   user.id,
            userName: user.name,
            action:   "LOGIN_FAILED",
            meta:     { email: user.email, failedAttempts: failed },
          });

          return null;
        }

        // Login erfolgreich — Fehlversuche zurücksetzen
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLogins: 0,
            lockedUntil:  null,
            lastLoginAt:  new Date(),
          },
        });

        await logActivity({
          userId:   user.id,
          userName: user.name,
          action:   "LOGIN_SUCCESS",
        });

        const roleFlags = (user.role?.flags as string[]) ?? [];
        const userFlags = (user.flags as string[]) ?? [];
        const effectiveFlags = getEffectiveFlags(userFlags, roleFlags);

        return {
          id:               user.id,
          name:             user.name,
          email:            user.email,
          role:             user.role?.name ?? null,
          flags:            effectiveFlags,
          twoFactorEnabled: user.twoFactorEnabled,
          // Wenn 2FA aktiv → Login ist noch "pending" bis Code bestätigt
          twoFactorPending: user.twoFactorEnabled,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id               = user.id;
        token.role             = user.role;
        token.flags            = user.flags;
        token.twoFactorEnabled = user.twoFactorEnabled;
        token.twoFactorPending = user.twoFactorPending;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id               = token.id;
      session.user.role             = token.role;
      session.user.flags            = token.flags;
      session.user.twoFactorEnabled = token.twoFactorEnabled;
      session.user.twoFactorPending = token.twoFactorPending;
      return session;
    },
  },
};
