import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TarjetaArticulo } from "@/components/TarjetaArticulo";
import { articulosPorEtiqueta, obtenerEtiquetas } from "@/lib/articulos";

// Una dirección que no corresponde a un archivo existente responde "no encontrada".
export const dynamicParams = false;

export function generateStaticParams() {
  return obtenerEtiquetas().map((e) => ({ etiqueta: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/articulos/tema/[etiqueta]">): Promise<Metadata> {
  const { etiqueta } = await params;
  const tema = obtenerEtiquetas().find((e) => e.slug === etiqueta);
  if (!tema) return {};
  return {
    title: `Artículos sobre ${tema.nombre}`,
    description: `Textos sobre ${tema.nombre} y cómo se relaciona con lo que sentimos.`,
    alternates: { canonical: `/articulos/tema/${tema.slug}` },
  };
}

export default async function Tema({ params }: PageProps<"/articulos/tema/[etiqueta]">) {
  const { etiqueta } = await params;
  const tema = obtenerEtiquetas().find((e) => e.slug === etiqueta);
  if (!tema) notFound();

  const articulos = articulosPorEtiqueta(tema.slug);

  return (
    <section className="mx-auto max-w-5xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
      <p className="texto text-sm">
        <Link href="/articulos">Artículos</Link>
      </p>
      <h1 className="mt-5 text-4xl text-marino-hondo sm:text-5xl">Tema: {tema.nombre}</h1>
      <div className="mt-10 border-t border-niebla">
        {articulos.map((a) => (
          <TarjetaArticulo key={a.slug} articulo={a} />
        ))}
      </div>
    </section>
  );
}
