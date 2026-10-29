import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { sitio } from "@/lib/sitio";
import "./globals.css";

// Fuentes alojadas en el propio sitio: el navegador del visitante no
// hace ninguna petición a Google para cargarlas.
const titulos = localFont({
  variable: "--font-titulos",
  display: "swap",
  src: [
    { path: "../node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2", style: "normal" },
    { path: "../node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-italic.woff2", style: "italic" },
  ],
});

const texto = localFont({
  variable: "--font-texto",
  display: "swap",
  src: [
    { path: "../node_modules/@fontsource-variable/public-sans/files/public-sans-latin-wght-normal.woff2", style: "normal" },
    { path: "../node_modules/@fontsource-variable/public-sans/files/public-sans-latin-wght-italic.woff2", style: "italic" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(sitio.dominio),
  title: {
    default: `${sitio.titulo} · ${sitio.marca}`,
    template: `%s · ${sitio.marca}`,
  },
  description: sitio.descripcion,
  authors: [{ name: sitio.profesional }],
  robots: sitio.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${titulos.variable} ${texto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
