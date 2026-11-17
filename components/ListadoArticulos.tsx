"use client";

import { useState } from "react";
import { TarjetaArticulo } from "@/components/TarjetaArticulo";
import type { Articulo } from "@/lib/articulos";
import { publicos, type Publico } from "@/lib/sitio";

// Listado con filtro por público. Solo muestra los filtros que tienen artículos.
export function ListadoArticulos({ articulos }: { articulos: Articulo[] }) {
  const [filtro, setFiltro] = useState<Publico | "todos">("todos");

  const disponibles = (Object.keys(publicos) as Publico[]).filter((p) =>
    articulos.some((a) => a.publico === p),
  );
  const visibles = filtro === "todos" ? articulos : articulos.filter((a) => a.publico === filtro);

  const estilo = (activo: boolean) =>
    `rounded-[3px] border px-4 py-2 text-sm transition-colors ${
      activo
        ? "border-marino bg-marino text-blanco"
        : "border-niebla bg-blanco text-tenue hover:border-marino hover:text-marino"
    }`;

  return (
    <>
      {disponibles.length > 1 && (
        <div role="group" aria-label="Filtrar por público" className="mb-4 flex flex-wrap gap-2">
          <button type="button" aria-pressed={filtro === "todos"} className={estilo(filtro === "todos")} onClick={() => setFiltro("todos")}>
            Todos
          </button>
          {disponibles.map((p) => (
            <button key={p} type="button" aria-pressed={filtro === p} className={estilo(filtro === p)} onClick={() => setFiltro(p)}>
              {publicos[p]}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-niebla" aria-live="polite">
        {visibles.map((a) => (
          <TarjetaArticulo key={a.slug} articulo={a} />
        ))}
      </div>
    </>
  );
}
