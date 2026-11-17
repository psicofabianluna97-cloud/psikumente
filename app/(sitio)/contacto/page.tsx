import type { Metadata } from "next";
import { Proximamente } from "@/components/Proximamente";

export const metadata: Metadata = {
  title: "Contacto",
  alternates: { canonical: "/contacto" },
};

// Temporal: en la fase 5 aquí va el formulario que llega al Gmail de la consulta.
export default function Contacto() {
  return (
    <Proximamente
      titulo="Escribir una pregunta"
      texto="El formulario de contacto se habilita en los próximos días. Responderé en menos de 24 horas."
    />
  );
}
