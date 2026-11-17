import type { MetadataRoute } from "next";
import { obtenerArticulos, obtenerEtiquetas } from "@/lib/articulos";
import { sitio } from "@/lib/sitio";

// Se genera solo en cada publicación e incluye los artículos y los temas.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!sitio.indexable) return [];

  const url = (ruta: string) => `${sitio.dominio}${ruta}`;
  const articulos = obtenerArticulos();
  const ultimaFecha = articulos[0]?.fecha;

  const paginas: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/algo-cambio"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/como-trabajo"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/sobre-mi"), changeFrequency: "yearly", priority: 0.7 },
    // /agendar y /contacto se agregan en la fase 5, cuando dejen de ser páginas temporales.
    {
      url: url("/articulos"),
      changeFrequency: "weekly",
      priority: 0.8,
      ...(ultimaFecha ? { lastModified: ultimaFecha } : {}),
    },
  ];

  return [
    ...paginas,
    ...articulos.map((a) => ({
      url: url(`/articulos/${a.slug}`),
      lastModified: a.fecha,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...obtenerEtiquetas().map((e) => ({
      url: url(`/articulos/tema/${e.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
