import type { MetadataRoute } from "next";
import { sitio } from "@/lib/sitio";

// Mientras el sitio no sea indexable, se le pide a todos los buscadores que no lo recorran.
export default function robots(): MetadataRoute.Robots {
  if (!sitio.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/", "/admin"] },
    sitemap: `${sitio.dominio}/sitemap.xml`,
    host: sitio.dominio,
  };
}
