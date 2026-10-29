import { sitio, formatearTarifa, textoModalidad } from "@/lib/sitio";

// Página temporal de la fase 1: solo confirma que el despliegue funciona.
// En la fase 2 se reemplaza por el inicio definitivo.
export default function Inicio() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-16">
      <p className="text-sm uppercase tracking-widest text-tenue">{sitio.marca}</p>
      <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
        No hace falta estar muy mal para empezar terapia.
      </h1>
      <p className="mt-6 text-lg text-tenue">
        {sitio.profesional} · {sitio.titulo}. {textoModalidad()}.
      </p>
      <p className="mt-2 text-tenue">Sesión: {formatearTarifa()}</p>
      <p className="mt-10 border-t border-linea pt-6 text-sm text-tenue">
        Sitio en construcción.
      </p>
    </main>
  );
}
