import Link from "next/link";
import { Marca } from "@/components/Marca";
import { navegacion } from "@/lib/sitio";

// El menú móvil usa <details>: funciona sin JavaScript y con teclado.
export function Encabezado() {
  return (
    <header className="border-b border-niebla bg-papel/95">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Marca />

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {navegacion.map((item) => (
            <Link key={item.href} href={item.href} className="text-tenue hover:text-marino">
              {item.texto}
            </Link>
          ))}
          <Link
            href="/agendar"
            className="rounded-[3px] bg-marino px-4 py-2 text-blanco hover:bg-marino-hondo"
          >
            Agendar
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary className="rounded-[3px] border border-niebla px-3 py-2 text-sm text-marino">
            Menú
          </summary>
          <nav
            aria-label="Principal"
            className="absolute right-0 z-20 mt-2 flex w-56 flex-col border border-niebla bg-blanco p-2 shadow-sm"
          >
            {navegacion.map((item) => (
              <Link key={item.href} href={item.href} className="px-3 py-2 text-tinta hover:bg-papel">
                {item.texto}
              </Link>
            ))}
            <Link href="/agendar" className="mt-1 bg-marino px-3 py-2 text-blanco">
              Agendar una cita
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
