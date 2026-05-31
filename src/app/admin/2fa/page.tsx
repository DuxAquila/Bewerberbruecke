"use client";

import { useState, useRef, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function TwoFactorContent() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [code, setCode]             = useState(["", "", "", "", "", ""]);
  const [isBackup, setIsBackup]     = useState(false);
  const [backupCode, setBackupCode] = useState("");
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (session && !session.user.twoFactorPending) {
      router.push("/admin");
    }
  }, [session, router]);

  function handleDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next  = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
    if (digit && index === 5) {
      const full = [...next].join("");
      if (full.length === 6) submitCode(full);
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted.split(""));
      submitCode(pasted);
    }
  }

  async function submitCode(codeStr?: string) {
    const finalCode = codeStr ?? code.join("");
    if (!isBackup && finalCode.length < 6) return;
    if (isBackup && !backupCode.trim()) return;

    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/2fa-verify", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ code: isBackup ? backupCode.trim() : finalCode, isBackup }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Ungültiger Code. Bitte versuche es erneut.");
      setCode(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
      return;
    }

    await update({ twoFactorPending: false });
    router.push("/admin");
    router.refresh();
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--admin-bg)", padding: "1.5rem" }}>
      <div className="admin-card" style={{ width: "100%", maxWidth: 380, textAlign: "center" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <span className="admin-sidebar-logo-name">Bewerberbrücke</span>
          {" "}
          <span className="admin-sidebar-logo-tag">Admin</span>
        </div>

        {!isBackup ? (
          <>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔐</div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--admin-text)", marginBottom: "0.5rem", letterSpacing: "-0.02em", fontFamily: "var(--font-sans)" }}>
              Zwei-Faktor-Prüfung
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--admin-text-muted)", marginBottom: "2rem", lineHeight: 1.5 }}>
              Gib den 6-stelligen Code aus deiner Authenticator App ein.
            </p>

            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "1.5rem" }} onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigit(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  autoFocus={i === 0}
                  style={{
                    width: 44, height: 52,
                    background: digit ? "var(--admin-accent-bg)" : "var(--admin-surface-2)",
                    border: `1px solid ${digit ? "var(--accent)" : "var(--admin-border)"}`,
                    borderRadius: "var(--radius-md)",
                    textAlign: "center",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: digit ? "var(--accent)" : "var(--admin-text)",
                    outline: "none",
                    caretColor: "transparent",
                  }}
                />
              ))}
            </div>

            {error && (
              <div style={{ background: "var(--admin-danger-bg)", border: "1px solid var(--admin-danger)", borderRadius: "var(--radius-md)", padding: "0.6rem 1rem", fontSize: "0.85rem", color: "var(--admin-danger)", marginBottom: "1rem", textAlign: "left" }}>
                {error}
              </div>
            )}

            <button
              className="admin-btn admin-btn-primary"
              onClick={() => submitCode()}
              disabled={loading || code.join("").length < 6}
              style={{ width: "100%", justifyContent: "center", padding: "0.75rem", marginBottom: "1rem" }}
            >
              {loading ? "Wird geprüft…" : "Bestätigen"}
            </button>
            <button
              onClick={() => { setIsBackup(true); setError(""); }}
              style={{ background: "none", border: "none", color: "var(--admin-text-faint)", fontSize: "0.8rem", cursor: "pointer", fontFamily: "var(--font-sans)" }}
            >
              Backup-Code verwenden
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔑</div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--admin-text)", marginBottom: "0.5rem", letterSpacing: "-0.02em", fontFamily: "var(--font-sans)" }}>
              Backup-Code
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--admin-text-muted)", marginBottom: "2rem", lineHeight: 1.5 }}>
              Gib einen deiner gespeicherten Backup-Codes ein.
            </p>

            <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              <input
                type="text"
                className="admin-field-input"
                value={backupCode}
                onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
                placeholder="z.B. A3F8C2E1B7"
                autoFocus
                style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}
              />
            </div>

            {error && (
              <div style={{ background: "var(--admin-danger-bg)", border: "1px solid var(--admin-danger)", borderRadius: "var(--radius-md)", padding: "0.6rem 1rem", fontSize: "0.85rem", color: "var(--admin-danger)", marginBottom: "1rem", textAlign: "left" }}>
                {error}
              </div>
            )}

            <button
              className="admin-btn admin-btn-primary"
              onClick={() => submitCode()}
              disabled={loading || !backupCode.trim()}
              style={{ width: "100%", justifyContent: "center", padding: "0.75rem", marginBottom: "1rem" }}
            >
              {loading ? "Wird geprüft…" : "Bestätigen"}
            </button>
            <button
              onClick={() => { setIsBackup(false); setError(""); }}
              style={{ background: "none", border: "none", color: "var(--admin-text-faint)", fontSize: "0.8rem", cursor: "pointer", fontFamily: "var(--font-sans)" }}
            >
              ← Zurück zum Code
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function TwoFactorPage() {
  return (
    <SessionProvider>
      <TwoFactorContent />
    </SessionProvider>
  );
}
