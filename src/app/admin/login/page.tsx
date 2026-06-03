"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res?.ok) {
      setError("E-Mail oder Passwort falsch.");
      return;
    }

    router.push("/admin/2fa");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--admin-bg)", padding: "1.5rem" }}>
      <div className="admin-card" style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ marginBottom: "2rem" }}>
          <span className="admin-sidebar-logo-name" style={{ fontSize: "1.1rem" }}>Bewerberbrücke</span>
          {" "}
          <span className="admin-sidebar-logo-tag">Admin</span>
        </div>

        <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--admin-text)", marginBottom: "0.4rem", letterSpacing: "-0.02em", fontFamily: "var(--font-sans)" }}>
          Anmelden
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--admin-text-muted)", marginBottom: "2rem" }}>
          Willkommen zurück. Bitte melde dich an.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label htmlFor="email" className="admin-field-label">E-Mail</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="admin-field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.tld"
            />
          </div>

          <div>
            <label htmlFor="password" className="admin-field-label">Passwort</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="admin-field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div style={{ background: "var(--admin-danger-bg)", border: "1px solid var(--admin-danger)", borderRadius: "var(--radius-md)", padding: "0.7rem 1rem", fontSize: "0.85rem", color: "var(--admin-danger)" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "0.75rem", marginTop: "0.25rem" }}
            disabled={loading}
          >
            {loading ? "Wird angemeldet…" : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}
