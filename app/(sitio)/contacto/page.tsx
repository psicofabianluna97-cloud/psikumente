import type { Metadata } from "next";
import { Proximamente } from "@/components/Proximamente";
import { metadatos } from "@/lib/seo";

export const metadata: Metadata = metadatos({
  titulo: "Contacto",
  ruta: "/contacto",
  indexar: false,
});

// Temporal: en la fase 5 aquí va el formulario que llega al Gmail de la consulta.
export default function Contacto() {
  return (
    <Proximamente
      titulo="Escribir una pregunta"
      texto="El formulario de contacto se habilita en los próximos días. Responderé en menos de 24 horas."
    />
  );
}
