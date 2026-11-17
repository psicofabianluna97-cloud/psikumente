import type { Metadata } from "next";
import { Proximamente } from "@/components/Proximamente";

export const metadata: Metadata = {
  title: "Agendar una cita",
  alternates: { canonical: "/agendar" },
};

// Temporal: en la fase 5 aquí va la agenda de Google Calendar.
export default function Agendar() {
  return (
    <Proximamente
      titulo="Agendar una cita"
      texto="La agenda en línea se habilita en los próximos días. Aquí podrás elegir el horario de tu sesión."
    />
  );
}
