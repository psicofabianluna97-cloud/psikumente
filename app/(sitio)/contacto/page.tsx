import type { Metadata } from "next";
import Link from "next/link";
import { FormularioContacto } from "@/components/FormularioContacto";
import { formularioActivo } from "@/lib/contacto-servidor";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Contacto",
  descripcion:
    "Escríbeme si tienes una pregunta sobre horarios, pagos o cómo funciona la terapia. Respondo en menos de 24 horas.",
  ruta: "/contacto",
});

export default function Contacto() {
  const activo = formularioActivo();
  const claveSitio = process.env.NEXT_PUBLIC_TURNSTILE_CLAVE_SITIO || null;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20">
      <div className="max-w-2xl">
        <h1 className="text-5xl text-marino-hondo sm:text-6xl">Escribir una pregunta</h1>
        <p className="mt-6 text-lg text-tenue sm:text-xl">
          Si tienes dudas antes de agendar, escríbeme. Respondo en menos de 24 horas.
        </p>
        <p className="texto mt-3 text-tenue">
          Si ya sabes que quieres empezar, puedes <Link href="/agendar">agendar directamente</Link>.
        </p>

        <div className="mt-10">
          {activo ? (
            <FormularioContacto claveSitio={claveSitio} />
          ) : (
            <div className="texto rounded-[3px] border border-niebla bg-blanco p-6">
              <h2 className="text-2xl text-marino-hondo">El formulario se habilita pronto</h2>
              <p className="mt-3 text-tenue">
                Mientras tanto, puedes <Link href="/agendar">agendar tu cita</Link> directamente.
              </p>
            </div>
          )}
        </div>

        <p className="mt-10 text-sm text-tenue">
          Este formulario no es para urgencias. Si estás en crisis, usa las líneas que aparecen al
          final de la página.
        </p>
      </div>
    </section>
  );
}
