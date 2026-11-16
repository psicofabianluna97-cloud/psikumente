import type { Metadata } from "next";
import Link from "next/link";
import { Boton } from "@/components/Boton";
import { ListaCambios } from "@/components/ListaCambios";
import { LlamadoFinal } from "@/components/LlamadoFinal";
import { Seccion } from "@/components/Seccion";
import { cambios } from "@/content/cambios";
import { formatearTarifa, sitio, textoModalidad } from "@/lib/sitio";

// Página de entrada desde Instagram y TikTok (enlace de la bio).
export const metadata: Metadata = {
  title: "Algo cambió en tu rutina",
  description:
    "Seis cambios cotidianos que vale la pena mirar antes de que se vuelvan algo mayor. No hace falta estar muy mal para empezar terapia.",
  alternates: { canonical: "/algo-cambio" },
};

export default function AlgoCambio() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-16 sm:px-6 sm:pt-24">
        <h1 className="max-w-4xl text-[2.4rem] text-marino-hondo sm:text-6xl">
          No hace falta estar muy mal para empezar terapia.
        </h1>
        <div className="mt-8 h-0.5 w-16 bg-oro" aria-hidden="true" />
        <p className="mt-8 max-w-2xl text-lg text-tenue sm:text-xl">
          Casi nunca hay un día en que todo se rompe. Lo que hay es una rutina que se va moviendo de a
          poco. Estos son seis cambios que vale la pena mirar.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Boton href="/agendar">Agendar una cita</Boton>
          <Boton href="/contacto" variante="secundario">
            Escribir una pregunta
          </Boton>
        </div>
      </section>

      <Seccion titulo="Seis cambios cotidianos" id="seis" fondo="blanco">
        <ListaCambios items={cambios} />
      </Seccion>

      <Seccion titulo="Lo que tienen en común" id="comun" ancho="texto">
        <div className="space-y-4 text-lg">
          <p>
            Todos alivian algo en el momento. Dormir tarde, cancelar o mirar el celular bajan un poco
            la incomodidad de ese día.
          </p>
          <p>
            El problema es que, con el tiempo, lo que evitas se vuelve más grande y la vida se va
            haciendo más pequeña. Reconocer el cambio a tiempo es más fácil que desarmarlo cuando ya
            ocupa todo.
          </p>
          <p className="text-tenue">
            Si te viste en uno o dos, no significa que tengas un trastorno. Significa que puede valer
            la pena hablarlo con alguien.
          </p>
        </div>
      </Seccion>

      <Seccion titulo="Quién soy y cómo trabajo" id="quien" fondo="blanco" ancho="texto">
        <div className="texto space-y-4 text-lg">
          <p>
            Soy {sitio.profesional}, psicólogo clínico. Trabajo con jóvenes y adultos desde la Terapia
            de Aceptación y Compromiso: miramos qué estás evitando, qué te está costando y qué es
            importante para ti, para que puedas moverte en esa dirección aunque no todo se sienta bien.
          </p>
          <p>
            {textoModalidad()}. Sesiones de {sitio.tarifa.duracionMinutos} minutos por{" "}
            {formatearTarifa()}.
          </p>
          <p>
            <Link href="/como-trabajo">Ver cómo es el proceso</Link>
          </p>
        </div>
      </Seccion>

      <LlamadoFinal titulo="Si algo de esto te sonó familiar, hay tiempo para mirarlo con calma." />
    </>
  );
}
