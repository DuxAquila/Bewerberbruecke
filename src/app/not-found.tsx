export default function RootNotFound() {
  return (
    <html lang="de">
      <body style={{ margin: 0, background: "#1a1714", color: "#f5f2ee", fontFamily: "system-ui, sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "#c8a96e", letterSpacing: "0.1em", fontSize: "0.85rem", marginBottom: "1rem" }}>404</p>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Seite nicht gefunden</h1>
          <p style={{ color: "#9c9189", marginBottom: "2rem" }}>
            Die gesuchte Seite existiert nicht.
          </p>
          <a href="/de" style={{ background: "#c8a96e", color: "#1a1714", padding: "0.85rem 2rem", borderRadius: "4px", textDecoration: "none", fontWeight: 600 }}>
            Zur Startseite
          </a>
        </div>
      </body>
    </html>
  );
}
