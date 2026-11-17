import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContenidoArticulo } from "@/components/ContenidoArticulo";
import { LlamadoFinal } from "@/components/LlamadoFinal";
import { obtenerArticulo, obtenerArticulos } from "@/lib/articulos";
import { formatearFecha, slugificar } from "@/lib/texto";
import { JsonLd } from "@/components/JsonLd";
import { esquemaArticulo, esquemaMigas } from "@/lib/esquemas";
import { metadatos } from "@/lib/seo";
import { publicos, sitio } from "@/lib/sitio";

// Cada artículo se genera como página estática al publicar.
// Una dirección que no corresponde a un archivo existente responde "no encontrada".
export const dynamicParams = false;

export function generateStaticParams() {
  return obtenerArticulos().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/articulos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const articulo = obtenerArticulo(slug);
  if (!articulo) return {};
  return metadatos({
    titulo: articulo.titulo,
    descripcion: articulo.descripcion,
    ruta: `/articulos/${articulo.slug}`,
    articulo: { fecha: articulo.fecha, etiquetas: articulo.etiquetas },
  });
}

export default async function PaginaArticulo({ params }: PageProps<"/articulos/[slug]">) {
  const { slug } = await params;
  const articulo = obtenerArticulo(slug);
  if (!articulo) notFound();

  return (
    <>
      <JsonLd
        datos={[
          esquemaArticulo(articulo),
          esquemaMigas([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Artículos", ruta: "/articulos" },
            { nombre: articulo.titulo, ruta: `/articulos/${articulo.slug}` },
          ]),
        ]}
      />
      <article className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        <div className="max-w-3xl">
          <p className="texto text-sm">
            <Link href="/articulos">Artículos</Link>
          </p>
          <h1 className="mt-5 text-4xl text-marino-hondo sm:text-5xl">{articulo.titulo}</h1>
          <p className="mt-5 text-sm text-tenue">
            <time dateTime={articulo.fecha}>{formatearFecha(articulo.fecha)}</time>
            <span className="mx-2 text-oro" aria-hidden="true">
              /
            </span>
            {articulo.minutosLectura} min de lectura
            <span className="mx-2 text-oro" aria-hidden="true">
              /
            </span>
            {publicos[articulo.publico]}
          </p>
          <div className="mt-8 h-0.5 w-16 bg-oro" aria-hidden="true" />

          <div className="mt-10">
            <ContenidoArticulo markdown={articulo.contenido} />
          </div>

          <footer className="mt-12 border-t border-niebla pt-6">
            <p className="text-sm text-tenue">
              Escrito por {sitio.profesional}, psicólogo clínico. Este texto es informativo y no
              reemplaza una valoración profesional.
            </p>
            {articulo.etiquetas.length > 0 && (
              <ul className="texto mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Temas del artículo">
                {articulo.etiquetas.map((e) => (
                  <li key={e}>
                    <Link href={`/articulos/tema/${slugificar(e)}`}>{e}</Link>
                  </li>
                ))}
              </ul>
            )}
          </footer>
        </div>
      </article>

      <LlamadoFinal titulo="Si te viste en este texto, hay tiempo para mirarlo con calma." />
    </>
  );
}
