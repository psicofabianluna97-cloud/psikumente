import type { Metadata } from "next";
import { panelActivo } from "@/lib/panel";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Panel · Psiku",
  robots: { index: false, follow: false },
};

// El panel tiene su propio diseño, separado del sitio público.
export default function PanelLayout() {
  if (!panelActivo()) {
    return (
      <html lang="es-CO">
        <body style={{ fontFamily: "system-ui, sans-serif", padding: "3rem 1.5rem", maxWidth: "40rem", margin: "0 auto" }}>
          <h1>El panel todavía no está activado</h1>
          <p>Faltan las claves de GitHub en Netlify. Los pasos están en el README, sección «Activar el panel».</p>
        </body>
      </html>
    );
  }
  return (
    <html lang="es-CO">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
