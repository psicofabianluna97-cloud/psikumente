import type { Metadata } from "next";
import Link from "next/link";
import { AgendaGoogle } from "@/components/AgendaGoogle";
import { interpretarAgenda } from "@/lib/agenda";
import { metadatos } from "@/lib/seo";
import { formatearTarifa, sitio, textoModalidad } from "@/lib/sitio";

export const metadata: Metadata = metadatos({
  titulo: "Agendar una cita",
  descripcion:
    "Reserva tu sesión de psicología en línea: elige el horario, recibe la confirmación por correo y paga antes de la sesión.",
  ruta: "/agendar",
});

// Es una secuencia real, por eso lleva números.
const pasos = [
  {
    titulo: "Eliges el horario",
    texto: "Reservas en la agenda con tu nombre, correo y teléfono.",
  },
  {
    titulo: "Recibes la confirmación",
    texto: "Te llega un correo con el enlace de la videollamada y las instrucciones de pago.",
  },
  {
    titulo: "Pagas antes de la sesión",
    texto: "Haces el pago por el medio indicado y envías el comprobante. Con eso la cita queda en firme.",
  },
];

export default function Agendar() {
  const agenda = interpretarAgenda(sitio.agendaUrl);

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
        <h1 className="text-5xl text-marino-hondo sm:text-6xl">Agendar una cita</h1>
        <p className="mt-6 max-w-2xl text-lg text-tenue sm:text-xl">
          {textoModalidad()}. Sesiones de {sitio.tarifa.duracionMinutos} minutos por {formatearTarifa()}.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <ol className="grid gap-8 md:grid-cols-3">
          {pasos.map((paso, i) => (
            <li key={paso.titulo} className="border-t-2 border-marino pt-5">
              <span className="font-titulos text-3xl text-oro">{i + 1}</span>
              <h2 className="mt-2 text-xl text-marino-hondo">{paso.titulo}</h2>
              <p className="mt-2 text-tenue">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        {agenda ? (
          <AgendaGoogle agenda={agenda} correo={sitio.correo} />
        ) : (
          <div className="texto rounded-[3px] border border-niebla bg-blanco p-6">
            <h2 className="text-2xl text-marino-hondo">La agenda en línea se habilita pronto</h2>
            <p className="mt-3 text-tenue">
              Mientras tanto, puedes <Link href="/contacto">escribirme</Link> y coordinamos el horario
              por correo.
            </p>
          </div>
        )}

        <p className="mt-10 max-w-2xl text-sm text-tenue">
          Si necesitas cambiar o cancelar la cita, hazlo desde el correo de confirmación con al menos
          24 horas de anticipación. Esta consulta no atiende urgencias: las líneas de crisis están al
          final de la página.
        </p>
      </section>
    </>
  );
}
