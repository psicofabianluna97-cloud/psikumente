import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { sitio, textoModalidad } from "@/lib/sitio";

// Imagen que aparece al compartir cualquier página del sitio.
// Se genera una sola vez al publicar.
export const alt = `${sitio.marca}: no hace falta estar muy mal para empezar terapia`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Imagen() {
  const fuente = await readFile(
    path.join(
      process.cwd(),
      "node_modules/@fontsource/playfair-display/files/playfair-display-latin-500-normal.woff",
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#12284a",
          color: "#ffffff",
          fontFamily: "Playfair",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              background: "#1b3a66",
              border: "3px solid #b08d57",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            PK
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#e3e9f1" }}>{sitio.marca}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, lineHeight: 1.12, maxWidth: 980 }}>
            No hace falta estar muy mal para empezar terapia.
          </div>
          <div style={{ display: "flex", width: 96, height: 4, background: "#b08d57", marginTop: 40 }} />
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#e3e9f1" }}>
          {sitio.profesional}, {sitio.titulo.toLowerCase()}. {textoModalidad()}.
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Playfair", data: fuente, weight: 500, style: "normal" }] },
  );
}
