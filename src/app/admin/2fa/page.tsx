"use client";

import { useState, useRef, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function TwoFactorContent() {
  const { data: session, update } = useSession();
  const router   = useRouter();
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
      body:    JSON.stringify({
        code:     isBackup ? backupCode.trim() : finalCode,
        isBackup,
      }),
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
    <div className="tfa-root">
      <div className="tfa-card">
        <div className="tfa-logo">
          <span className="tfa-logo-text">Bewerberbrücke</span>
          <span className="tfa-logo-sub">Admin</span>
        </div>

        {!isBackup ? (
          <>
            <div className="tfa-icon">🔐</div>
            <h1 className="tfa-title">Zwei-Faktor-Prüfung</h1>
            <p className="tfa-desc">Gib den 6-stelligen Code aus deiner Authenticator App ein.</p>

            <div className="code-inputs" onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`code-box ${digit ? "filled" : ""}`}
                  value={digit}
                  onChange={(e) => handleDigit(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {error && <div className="tfa-error" role="alert">{error}</div>}

            <button className="tfa-btn" onClick={() => submitCode()} disabled={loading || code.join("").length < 6}>
              {loading ? "Wird geprüft…" : "Bestätigen"}
            </button>
            <button className="tfa-link" onClick={() => { setIsBackup(true); setError(""); }}>
              Backup-Code verwenden
            </button>
          </>
        ) : (
          <>
            <div className="tfa-icon">🔑</div>
            <h1 className="tfa-title">Backup-Code</h1>
            <p className="tfa-desc">Gib einen deiner gespeicherten Backup-Codes ein.</p>

            <div className="field">
              <input
                type="text"
                className="field-input"
                value={backupCode}
                onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
                placeholder="z.B. A3F8C2E1B7"
                autoFocus
              />
            </div>

            {error && <div className="tfa-error" role="alert">{error}</div>}

            <button className="tfa-btn" onClick={() => submitCode()} disabled={loading || !backupCode.trim()}>
              {loading ? "Wird geprüft…" : "Bestätigen"}
            </button>
            <button className="tfa-link" onClick={() => { setIsBackup(false); setError(""); }}>
              ← Zurück zum Code
            </button>
          </>
        )}
      </div>

      <style>{`
        .tfa-root { min-height:100vh; display:flex; align-items:center; justify-content:center; background:#0f1117; padding:1.5rem; font-family:'DM Sans',system-ui,sans-serif; }
        .tfa-card { width:100%; max-width:380px; background:#181c24; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:2.5rem; text-align:center; }
        .tfa-logo { display:flex; align-items:baseline; gap:0.5rem; margin-bottom:1.5rem; justify-content:center; }
        .tfa-logo-text { font-size:1rem; font-weight:600; color:#fff; }
        .tfa-logo-sub { font-size:0.7rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.08em; }
        .tfa-icon { font-size:2.5rem; margin-bottom:1rem; }
        .tfa-title { font-size:1.4rem; font-weight:600; color:#fff; margin-bottom:0.5rem; letter-spacing:-0.02em; }
        .tfa-desc { font-size:0.875rem; color:rgba(255,255,255,0.4); margin-bottom:2rem; line-height:1.5; }
        .code-inputs { display:flex; gap:0.5rem; justify-content:center; margin-bottom:1.5rem; }
        .code-box { width:44px; height:52px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; text-align:center; font-size:1.25rem; font-weight:600; color:#fff; outline:none; transition:border-color 0.2s; caret-color:transparent; }
        .code-box:focus { border-color:rgba(200,169,110,0.5); }
        .code-box.filled { border-color:rgba(200,169,110,0.4); background:rgba(200,169,110,0.08); color:#c8a96e; }
        .tfa-error { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); border-radius:8px; padding:0.6rem 1rem; font-size:0.85rem; color:#f87171; margin-bottom:1rem; text-align:left; }
        .tfa-btn { width:100%; background:#c8a96e; color:#0f1117; border:none; border-radius:8px; padding:0.75rem; font-size:0.9rem; font-weight:600; cursor:pointer; transition:opacity 0.2s; letter-spacing:0.02em; margin-bottom:1rem; }
        .tfa-btn:hover:not(:disabled) { opacity:0.88; }
        .tfa-btn:disabled { opacity:0.4; cursor:not-allowed; }
        .tfa-link { background:none; border:none; color:rgba(255,255,255,0.35); font-size:0.8rem; cursor:pointer; transition:color 0.2s; padding:0; font-family:inherit; }
        .tfa-link:hover { color:rgba(255,255,255,0.7); }
        .field { text-align:left; }
        .field-input { width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:0.7rem 1rem; font-size:0.9rem; color:#fff; outline:none; transition:border-color 0.2s; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1.5rem; }
        .field-input:focus { border-color:rgba(200,169,110,0.5); }
        .field-input::placeholder { color:rgba(255,255,255,0.2); text-transform:none; letter-spacing:normal; }
      `}</style>
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
