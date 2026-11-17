import type { Metadata } from "next";
import Link from "next/link";
import { ListadoArticulos } from "@/components/ListadoArticulos";
import { LlamadoFinal } from "@/components/LlamadoFinal";
import { obtenerArticulos, obtenerEtiquetas } from "@/lib/articulos";

export const metadata: Metadata = {
  title: "Artículos",
  description:
    "Textos breves sobre cómo cambian los hábitos según lo que sentimos: sueño, postergación, aislamiento, pantallas. Para mirar a tiempo lo cotidiano.",
  alternates: { canonical: "/articulos" },
};

export default function Articulos() {
  const articulos = obtenerArticulos();
  const etiquetas = obtenerEtiquetas();

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
        <h1 className="text-5xl text-marino-hondo sm:text-6xl">Artículos</h1>
        <p className="mt-6 max-w-2xl text-lg text-tenue sm:text-xl">
          Textos breves sobre lo que cambia en la rutina cuando algo nos pesa, y sobre qué hacer con
          eso antes de que crezca.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        {articulos.length === 0 ? (
          <p className="border-t border-niebla pt-8 text-lg text-tenue">
            Todavía no hay artículos publicados. El primero llega pronto.
          </p>
        ) : (
          <ListadoArticulos articulos={articulos} />
        )}

        {etiquetas.length > 0 && (
          <nav aria-label="Temas" className="mt-12">
            <h2 className="text-2xl text-marino-hondo">Temas</h2>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {etiquetas.map((e) => (
                <li key={e.slug} className="texto">
                  <Link href={`/articulos/tema/${e.slug}`}>{e.nombre}</Link>
                  <span className="ml-1 text-sm text-tenue">({e.cantidad})</span>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>

      <LlamadoFinal titulo="Si algo de lo que leíste te sonó familiar, puedes hablarlo en consulta." />
    </>
  );
}
