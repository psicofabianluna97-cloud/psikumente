import type { Cambio } from "@/content/cambios";

// El elemento distintivo del sitio: lo que se observa a la izquierda,
// lo que a veces lo sostiene a la derecha. No es una secuencia, así que no lleva números.
export function ListaCambios({ items }: { items: Cambio[] }) {
  return (
    <dl className="border-t border-niebla">
      {items.map((item) => (
        <div
          key={item.tema}
          className="grid gap-2 border-b border-niebla py-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-10"
        >
          <dt>
            <span className="block text-sm text-oro">{item.tema}</span>
            <span className="mt-1 block font-titulos text-2xl leading-snug text-marino-hondo">
              {item.cambio}
            </span>
          </dt>
          <dd className="self-end text-tenue md:pb-1">{item.sostiene}</dd>
        </div>
      ))}
    </dl>
  );
}
