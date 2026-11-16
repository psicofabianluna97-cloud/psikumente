import { formatearTarifa, sitio, textoModalidad } from "@/lib/sitio";

export function DatosPracticos() {
  const datos = [
    { termino: "Modalidad", valor: textoModalidad(), nota: "Por videollamada. El enlace llega con la confirmación de la cita." },
    { termino: "Duración", valor: `${sitio.tarifa.duracionMinutos} minutos`, nota: "Semanal o quincenal, según lo que acordemos." },
    { termino: "Valor por sesión", valor: formatearTarifa(), nota: "Pago particular antes de la sesión. Las instrucciones llegan al agendar." },
    { termino: "EPS y prepagadas", valor: "No aplica", nota: "Por ahora atiendo solo de forma particular." },
  ];

  return (
    <dl className="grid gap-px overflow-hidden rounded-[3px] border border-niebla bg-niebla sm:grid-cols-2">
      {datos.map((d) => (
        <div key={d.termino} className="bg-blanco p-6">
          <dt className="text-sm text-tenue">{d.termino}</dt>
          <dd className="mt-1 font-titulos text-2xl text-marino-hondo">{d.valor}</dd>
          <dd className="mt-2 text-sm text-tenue">{d.nota}</dd>
        </div>
      ))}
    </dl>
  );
}
