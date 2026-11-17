import Link from "next/link";

export function LlamadoFinal({ titulo }: { titulo: string }) {
  return (
    <section className="bg-marino text-blanco">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="max-w-3xl text-3xl sm:text-4xl">{titulo}</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/agendar"
            className="inline-flex rounded-[3px] bg-blanco px-5 py-3 font-medium text-marino-hondo hover:bg-niebla"
          >
            Agendar una cita
          </Link>
          <Link
            href="/contacto"
            className="inline-flex rounded-[3px] border border-white/40 px-5 py-3 font-medium hover:border-white"
          >
            Escribir una pregunta
          </Link>
        </div>
      </div>
    </section>
  );
}
