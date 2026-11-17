import Link from "next/link";
import type { Articulo } from "@/lib/articulos";
import { formatearFecha } from "@/lib/texto";
import { publicos } from "@/lib/sitio";

export function TarjetaArticulo({ articulo }: { articulo: Articulo }) {
  return (
    <article className="border-b border-niebla py-7">
      <p className="text-sm text-tenue">
        <time dateTime={articulo.fecha}>{formatearFecha(articulo.fecha)}</time>
        <span className="mx-2 text-oro" aria-hidden="true">
          /
        </span>
        {publicos[articulo.publico]}
        {articulo.borrador && <span className="ml-3 bg-niebla px-2 py-0.5 text-tinta">Borrador</span>}
      </p>
      <h3 className="mt-2 text-2xl leading-snug text-marino-hondo sm:text-3xl">
        <Link href={`/articulos/${articulo.slug}`} className="hover:underline hover:decoration-oro">
          {articulo.titulo}
        </Link>
      </h3>
      <p className="mt-2 max-w-2xl text-tenue">{articulo.descripcion}</p>
    </article>
  );
}
