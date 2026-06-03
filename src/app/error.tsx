"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, background: "#1a1714", color: "#f5f2ee", fontFamily: "system-ui, sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "#c8a96e", letterSpacing: "0.1em", fontSize: "0.85rem", marginBottom: "1rem" }}>500</p>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Etwas ist schiefgelaufen</h1>
          <p style={{ color: "#9c9189", marginBottom: "2rem" }}>Ein unerwarteter Fehler ist aufgetreten.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button onClick={reset} style={{ background: "#c8a96e", color: "#1a1714", padding: "0.85rem 2rem", borderRadius: "4px", border: "none", cursor: "pointer", fontWeight: 600 }}>
              Erneut versuchen
            </button>
            <a href="/de" style={{ background: "transparent", color: "#f5f2ee", padding: "0.85rem 2rem", borderRadius: "4px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>
              Zur Startseite
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
