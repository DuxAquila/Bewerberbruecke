import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1a2e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ color: "#c8a96e", fontSize: 20, letterSpacing: 4, marginBottom: 24 }}>
          SOCIAL RECRUITING · PFLEGE & SOZIALES
        </div>
        <div style={{ color: "white", fontSize: 64, fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Planbare Sichtbarkeit und Mitarbeitergewinnung.
        </div>
        <div style={{ color: "#a0a0b0", fontSize: 28, marginBottom: 40 }}>
          bewerberbruecke.com
        </div>
        <div
          style={{
            marginTop: 8,
            background: "#c8a96e",
            color: "#1a1a2e",
            padding: "12px 28px",
            borderRadius: 6,
            fontSize: 20,
            fontWeight: 700,
            display: "flex",
            alignSelf: "flex-start",
          }}
        >
          Jetzt Erstgespräch anfragen →
        </div>
      </div>
    ),
    size
  );
}
