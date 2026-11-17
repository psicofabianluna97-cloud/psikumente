import type { ReactNode } from "react";

type Props = {
  titulo?: string;
  id?: string;
  children: ReactNode;
  fondo?: "papel" | "blanco";
  ancho?: "texto" | "amplio";
};

// Contenedor de sección con un solo sistema de espaciado para todo el sitio.
export function Seccion({ titulo, id, children, fondo = "papel", ancho = "amplio" }: Props) {
  // El contenedor siempre mide lo mismo, así todas las secciones comparten el borde izquierdo.
  // "texto" solo limita el ancho de lectura dentro de ese contenedor.
  const interior = ancho === "texto" ? "max-w-3xl" : "";
  return (
    <section
      id={id}
      aria-labelledby={titulo && id ? `${id}-titulo` : undefined}
      className={fondo === "blanco" ? "bg-blanco" : ""}
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className={interior}>
          {titulo && (
            <h2 id={id ? `${id}-titulo` : undefined} className="mb-8 text-3xl text-marino-hondo sm:text-4xl">
              {titulo}
            </h2>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
