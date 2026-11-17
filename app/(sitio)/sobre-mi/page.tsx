import type { Metadata } from "next";
import Image from "next/image";
import { LlamadoFinal } from "@/components/LlamadoFinal";
import { Monograma } from "@/components/Marca";
import { Seccion } from "@/components/Seccion";
import { sitio, trayectoria } from "@/lib/sitio";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { esquemaPersona } from "@/lib/esquemas";

export const metadata: Metadata = metadatos({
  titulo: "Sobre mí",
  descripcion:
    "Fabián Luna, psicólogo clínico egresado de la Universidad El Bosque. Terapia de Aceptación y Compromiso con jóvenes y adultos, en modalidad virtual.",
  ruta: "/sobre-mi",
});

export default function SobreMi() {
  return (
    <>
      <JsonLd datos={esquemaPersona()} />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 pb-6 pt-16 sm:px-6 sm:pt-20 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h1 className="text-5xl text-marino-hondo sm:text-6xl">{sitio.profesional}</h1>
          <p className="mt-4 text-xl text-tenue">
            Psicólogo clínico
            {sitio.tarjetaProfesional ? `. Tarjeta profesional ${sitio.tarjetaProfesional}` : ""}
          </p>
        </div>
        {sitio.foto ? (
          <Image
            src={sitio.foto}
            alt={`Retrato de ${sitio.profesional}`}
            width={220}
            height={275}
            className="h-auto w-44 rounded-[3px] object-cover md:w-56"
            priority
          />
        ) : (
          <div className="hidden md:block" aria-hidden="true">
            <Monograma tamano={120} />
          </div>
        )}
      </section>

      <Seccion ancho="texto">
        <div className="space-y-4 text-lg">
          <p>
            Acompaño a jóvenes y adultos que notan que algo en su vida cambió y no terminan de entender
            por qué: duermen distinto, aplazan lo que importa, se alejan de las personas o sienten que se
            quedaron atrás frente a los demás.
          </p>
          <p>
            Me interesa especialmente ese momento previo, cuando todavía no hay una crisis pero la
            rutina ya está mostrando que algo pide atención. Creo que la terapia no debería ser el último
            recurso.
          </p>
        </div>
      </Seccion>

      <Seccion titulo="Mi enfoque" id="enfoque" fondo="blanco" ancho="texto">
        <div className="space-y-4 text-lg">
          <p>
            Trabajo desde la Terapia de Aceptación y Compromiso (ACT) y el análisis de la conducta. En
            palabras sencillas: en lugar de luchar contra lo que sientes, miramos qué haces para no
            sentirlo, cuánto te está costando y qué te importa de verdad.
          </p>
          <p>
            Cada proceso se ajusta a la persona. No uso fórmulas fijas ni te voy a decir qué hacer con tu
            vida; mi trabajo es ayudarte a ver con más claridad y a dar pasos concretos.
          </p>
        </div>
      </Seccion>

      <Seccion titulo="Trayectoria" id="trayectoria" ancho="texto">
        <ol className="border-l-2 border-niebla">
          {trayectoria.map((t) => (
            <li key={`${t.anio}-${t.cargo}`} className="relative pb-8 pl-6 last:pb-0">
              <span
                className="absolute -left-[7px] top-2 h-3 w-3 rounded-full border-2 border-oro bg-papel"
                aria-hidden="true"
              />
              <p className="text-sm text-oro">{t.anio}</p>
              <p className="font-titulos text-xl text-marino-hondo">{t.cargo}</p>
              <p className="text-tenue">{t.lugar}</p>
            </li>
          ))}
        </ol>
      </Seccion>

      <Seccion titulo="Cómo cuido el proceso" id="etica" fondo="blanco" ancho="texto">
        <ul className="list-disc space-y-3 pl-6 text-lg marker:text-oro">
          <li>Ejerzo bajo el Código Deontológico y Bioético del Psicólogo (Ley 1090 de 2006).</li>
          <li>Lo que hablamos está protegido por el secreto profesional, con las excepciones que fija la ley.</li>
          <li>No prometo resultados: cada proceso depende de muchos factores y lo revisamos juntos.</li>
          <li>Atiendo con respeto a personas de toda identidad, orientación, origen y creencia.</li>
        </ul>
      </Seccion>

      <LlamadoFinal titulo="Si quieres empezar, el primer paso es una sesión para conocernos." />
    </>
  );
}
