import type { Metadata } from "next";
import Link from "next/link";
import { Boton } from "@/components/Boton";
import { DatosPracticos } from "@/components/DatosPracticos";
import { ListaCambios } from "@/components/ListaCambios";
import { LlamadoFinal } from "@/components/LlamadoFinal";
import { Proceso } from "@/components/Proceso";
import { Seccion } from "@/components/Seccion";
import { cambios } from "@/content/cambios";
import { sitio, textoModalidad } from "@/lib/sitio";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Inicio() {
  return (
    <>
      {/* Portada: la frase central es el elemento principal */}
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
        <h1 className="max-w-4xl text-[2.6rem] text-marino-hondo sm:text-6xl lg:text-7xl">
          No hace falta estar muy mal para empezar terapia.
        </h1>
        <div className="mt-8 h-0.5 w-16 bg-oro" aria-hidden="true" />
        <p className="mt-8 max-w-2xl text-lg text-tenue sm:text-xl">
          Acompaño a jóvenes y adultos a entender qué está cambiando en su rutina y qué lo sostiene,
          antes de que se vuelva algo mayor. {textoModalidad()}.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Boton href="/agendar">Agendar una cita</Boton>
          <Boton href="/como-trabajo" variante="secundario">
            Ver cómo trabajo
          </Boton>
        </div>
      </section>

      <Seccion titulo="Lo cotidiano cambia primero" id="cambios" fondo="blanco">
        <p className="mb-10 max-w-2xl text-tenue">
          Antes de que algo se vuelva grande, casi siempre cambia lo de todos los días. Ninguno de
          estos cambios es un diagnóstico. Son señales de que algo está pidiendo atención.
        </p>
        <ListaCambios items={cambios.slice(0, 3)} />
        <p className="texto mt-8">
          <Link href="/algo-cambio">Ver los seis cambios que vale la pena mirar</Link>
        </p>
      </Seccion>

      <Seccion titulo="Cómo es el proceso" id="proceso">
        <Proceso />
      </Seccion>

      <Seccion titulo="Quién te va a acompañar" id="quien" fondo="blanco" ancho="texto">
        <div className="texto space-y-4 text-lg">
          <p>
            Soy {sitio.profesional}, psicólogo clínico egresado de la Universidad El Bosque. Trabajo
            en consulta clínica desde {sitio.ejercicioDesde} y hoy atiendo de forma virtual a personas
            de todo el país.
          </p>
          <p>
            Mi trabajo se basa en la Terapia de Aceptación y Compromiso: en lugar de pelear con lo que
            sientes, miramos qué haces para no sentirlo y qué te está costando.
          </p>
          <p>
            <Link href="/sobre-mi">Conocer mi formación y mi enfoque</Link>
          </p>
        </div>
      </Seccion>

      <Seccion titulo="Lo práctico" id="practico">
        <DatosPracticos />
      </Seccion>

      <LlamadoFinal titulo="Si algo de tu rutina cambió y no sabes bien por qué, es un buen momento para hablarlo." />
    </>
  );
}
