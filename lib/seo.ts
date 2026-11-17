// Metadatos de cada página: título, descripción, dirección canónica y
// la tarjeta que se ve al compartir el enlace en WhatsApp, Instagram o X.
import type { Metadata } from "next";
import { sitio } from "@/lib/sitio";

type Datos = {
  titulo?: string; // sin la marca; se omite en el inicio
  descripcion?: string;
  ruta: string; // por ejemplo "/como-trabajo"
  articulo?: { fecha: string; etiquetas: string[] };
  indexar?: boolean; // false para páginas que no deben aparecer en Google
};

export const tituloPorDefecto = `${sitio.profesional}, ${sitio.titulo.toLowerCase()} · ${sitio.marca}`;

// Imagen que acompaña el enlace al compartirlo. La genera app/opengraph-image.tsx.
const imagenSocial = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${sitio.marca}: no hace falta estar muy mal para empezar terapia`,
};

export function metadatos({ titulo, descripcion, ruta, articulo, indexar = true }: Datos): Metadata {
  const descripcionFinal = descripcion ?? sitio.descripcion;
  const tituloSocial = titulo ?? tituloPorDefecto;

  return {
    ...(titulo ? { title: titulo } : {}),
    description: descripcionFinal,
    alternates: { canonical: ruta },
    ...(indexar ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: tituloSocial,
      description: descripcionFinal,
      url: ruta,
      siteName: sitio.marca,
      locale: "es_CO",
      images: [imagenSocial],
      ...(articulo
        ? {
            type: "article" as const,
            publishedTime: articulo.fecha,
            authors: [sitio.profesional],
            tags: articulo.etiquetas,
          }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title: tituloSocial,
      description: descripcionFinal,
      images: [imagenSocial.url],
    },
  };
}
