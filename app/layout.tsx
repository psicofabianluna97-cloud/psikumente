import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Encabezado } from "@/components/Encabezado";
import { Pie } from "@/components/Pie";
import { sitio } from "@/lib/sitio";
import "./globals.css";

// Fuentes alojadas en el propio sitio: el navegador del visitante no
// hace ninguna petición a Google para cargarlas.
const titulos = localFont({
  variable: "--font-titulos",
  display: "swap",
  src: [
    { path: "../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2", style: "normal" },
    { path: "../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-italic.woff2", style: "italic" },
  ],
});

const texto = localFont({
  variable: "--font-texto",
  display: "swap",
  src: [
    { path: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2", style: "normal" },
    { path: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-italic.woff2", style: "italic" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(sitio.dominio),
  title: {
    default: `${sitio.profesional}, ${sitio.titulo.toLowerCase()} · ${sitio.marca}`,
    template: `%s · ${sitio.marca}`,
  },
  description: sitio.descripcion,
  authors: [{ name: sitio.profesional }],
  robots: sitio.indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#12284a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${titulos.variable} ${texto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-blanco focus:px-4 focus:py-2"
        >
          Saltar al contenido
        </a>
        <Encabezado />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Pie />
      </body>
    </html>
  );
}
