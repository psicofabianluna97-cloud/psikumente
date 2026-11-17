import Link from "next/link";
import { Monograma } from "@/components/Marca";
import { lineasCrisis, navegacion, sitio, textoModalidad } from "@/lib/sitio";

export function Pie() {
  // El sitio es estático: el año se fija en cada publicación.
  const anio = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-marino-hondo text-niebla">
      {/* Líneas de crisis: visibles y marcables desde el celular */}
      <section aria-labelledby="crisis" className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <h2 id="crisis" className="text-2xl text-blanco">
            Si estás en crisis ahora
          </h2>
          <p className="mt-2 max-w-2xl text-niebla/80">
            Esta consulta no atiende urgencias. Si sientes que puedes hacerte daño o que alguien corre
            peligro, llama a una de estas líneas o ve a urgencias del hospital más cercano.
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {lineasCrisis.map((linea) => (
              <li key={linea.numero}>
                <a
                  href={`tel:${linea.numero}`}
                  className="group flex items-baseline gap-3"
                  aria-label={`Llamar a ${linea.nombre}, ${linea.numero}`}
                >
                  <span className="font-titulos text-2xl text-oro group-hover:text-blanco">
                    {linea.numero}
                  </span>
                  <span>
                    <span className="block text-blanco group-hover:underline">{linea.nombre}</span>
                    <span className="block text-sm text-niebla/70">{linea.detalle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-[1fr_auto] sm:px-6">
        <div className="flex gap-4">
          <Monograma tamano={44} />
          <div className="text-sm">
            <p className="text-blanco">
              {sitio.profesional}, {sitio.titulo.toLowerCase()}
            </p>
            <p className="text-niebla/70">{textoModalidad()}</p>
            {sitio.tarjetaProfesional && (
              <p className="text-niebla/70">Tarjeta profesional {sitio.tarjetaProfesional}</p>
            )}
          </div>
        </div>

        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/" className="hover:text-blanco">
            Inicio
          </Link>
          {navegacion.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-blanco">
              {item.texto}
            </Link>
          ))}
          <Link href="/agendar" className="hover:text-blanco">
            Agendar
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-5xl px-4 py-5 text-xs text-niebla/60 sm:px-6">
          © {anio} {sitio.marca}. Ejercicio profesional regido por la Ley 1090 de 2006.
        </p>
      </div>
    </footer>
  );
}
