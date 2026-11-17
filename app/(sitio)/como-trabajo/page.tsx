import type { Metadata } from "next";
import { DatosPracticos } from "@/components/DatosPracticos";
import { LlamadoFinal } from "@/components/LlamadoFinal";
import { Proceso } from "@/components/Proceso";
import { Seccion } from "@/components/Seccion";
import { preguntas } from "@/content/preguntas";
import { metadatos } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { esquemaPreguntas, esquemaServicio } from "@/lib/esquemas";

export const metadata: Metadata = metadatos({
  titulo: "Cómo trabajo",
  descripcion:
    "Terapia psicológica virtual para jóvenes y adultos en Colombia: para quién es, cómo es el proceso, enfoque, valor de la sesión y preguntas frecuentes.",
  ruta: "/como-trabajo",
});

export default function ComoTrabajo() {
  return (
    <>
      <JsonLd datos={[esquemaServicio(), esquemaPreguntas(preguntas)]} />
      <section className="mx-auto max-w-5xl px-4 pb-6 pt-16 sm:px-6 sm:pt-20">
        <h1 className="max-w-3xl text-5xl text-marino-hondo sm:text-6xl">Cómo trabajo</h1>
        <p className="mt-6 max-w-2xl text-lg text-tenue sm:text-xl">
          Un proceso claro, con objetivos que definimos juntos y que revisamos en el camino.
        </p>
      </section>

      <Seccion titulo="Para quién es" id="para-quien" ancho="texto">
        <div className="space-y-4 text-lg">
          <p>
            Trabajo con jóvenes y adultos, sobre todo entre los 19 y los 35 años. Personas que están
            terminando estudios o tomando sus primeras decisiones grandes, y personas que ya están en
            el trabajo, en una relación o comparándose con lo que se supone que deberían haber logrado.
          </p>
          <p>
            No necesitas tener un nombre para lo que te pasa. Muchas personas llegan porque notan que
            algo de su rutina cambió: duermen distinto, cancelan más, postergan lo que importa o se
            sienten lejos de los demás.
          </p>
        </div>
      </Seccion>

      <Seccion titulo="Qué miramos en consulta" id="enfoque" fondo="blanco" ancho="texto">
        <div className="space-y-4 text-lg">
          <p>
            Trabajo desde la Terapia de Aceptación y Compromiso (ACT), un enfoque con respaldo
            científico. Su punto de partida es sencillo: muchas de las cosas que hacemos para no sentir
            malestar funcionan un rato, pero a la larga nos alejan de lo que nos importa.
          </p>
          <p>En sesión miramos tres cosas:</p>
          <ul className="list-disc space-y-2 pl-6 marker:text-oro">
            <li>Qué ha cambiado en tu día a día y desde cuándo.</li>
            <li>Qué estás evitando con esos cambios y qué te está costando.</li>
            <li>Qué es importante para ti y qué pasos concretos te acercan a eso.</li>
          </ul>
          <p>
            No se trata de darte consejos ni de decirte qué hacer, sino de que entiendas cómo funciona
            lo que te pasa y tengas más margen para elegir.
          </p>
        </div>
      </Seccion>

      <Seccion titulo="Cómo es el proceso" id="proceso">
        <Proceso />
      </Seccion>

      <Seccion titulo="Lo práctico" id="practico" fondo="blanco">
        <DatosPracticos />
      </Seccion>

      <Seccion titulo="Confidencialidad" id="confidencialidad" ancho="texto">
        <div className="space-y-4 text-lg">
          <p>
            Lo que hablamos en sesión está protegido por el secreto profesional que establece la Ley
            1090 de 2006.
          </p>
          <p className="text-tenue">
            La ley contempla excepciones: cuando existe un riesgo grave para tu vida o la de otra
            persona, o cuando una autoridad judicial lo ordena. Si alguna vez fuera necesario, lo
            hablaríamos contigo primero siempre que sea posible.
          </p>
        </div>
      </Seccion>

      <Seccion titulo="Preguntas frecuentes" id="preguntas" fondo="blanco" ancho="texto">
        <div className="border-t border-niebla">
          {preguntas.map((p) => (
            <details key={p.pregunta} className="border-b border-niebla">
              <summary className="flex items-start justify-between gap-6 py-5 text-lg text-marino-hondo">
                <span>{p.pregunta}</span>
                <span className="signo font-titulos text-2xl leading-none text-oro" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pb-6 text-tenue">{p.respuesta}</p>
            </details>
          ))}
        </div>
      </Seccion>

      <LlamadoFinal titulo="Si tienes dudas antes de agendar, puedes escribirme." />
    </>
  );
}
