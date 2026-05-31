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

    // Wenn 2FA aktiv → Weiterleitung zur 2FA-Seite via proxy
    router.push("/admin/2fa");
    router.refresh();
  }

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-text">Bewerberbrücke</span>
          <span className="login-logo-sub">Admin</span>
        </div>

        <h1 className="login-title">Anmelden</h1>
        <p className="login-desc">Willkommen zurück. Bitte melde dich an.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label htmlFor="email" className="field-label">E-Mail</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="finn@bewerberbruecke.com"
            />
          </div>

          <div className="field">
            <label htmlFor="password" className="field-label">Passwort</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Wird angemeldet…" : "Anmelden"}
          </button>
        </form>
      </div>

      <style>{`
        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f1117;
          padding: 1.5rem;
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 400px;
          background: #181c24;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 2.5rem;
        }

        .login-logo {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .login-logo-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .login-logo-sub {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .login-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 0.4rem;
          letter-spacing: -0.02em;
        }

        .login-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 2rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-label {
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.02em;
        }

        .field-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.7rem 1rem;
          font-size: 0.9rem;
          color: #fff;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }

        .field-input:focus {
          border-color: rgba(200,169,110,0.5);
        }

        .field-input::placeholder {
          color: rgba(255,255,255,0.2);
        }

        .login-error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px;
          padding: 0.7rem 1rem;
          font-size: 0.85rem;
          color: #f87171;
        }

        .login-btn {
          background: #c8a96e;
          color: #0f1117;
          border: none;
          border-radius: 8px;
          padding: 0.75rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
          margin-top: 0.25rem;
          letter-spacing: 0.02em;
        }

        .login-btn:hover:not(:disabled) {
          opacity: 0.88;
        }

        .login-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
