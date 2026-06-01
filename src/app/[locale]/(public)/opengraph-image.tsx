import { ImageResponse } from "next/og";

export const runtime = "edge";
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
        <div style={{ color: "#a0a0b0", fontSize: 28 }}>
          bewerberbruecke.com
        </div>
      </div>
    ),
    size
  );
}

