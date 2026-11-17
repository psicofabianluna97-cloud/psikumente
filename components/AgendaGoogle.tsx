"use client";

import { useId, useState } from "react";
import type { Agenda } from "@/lib/agenda";

// La agenda de Google solo se carga después de aceptar el aviso de privacidad.
// Antes de eso, el navegador no hace ninguna conexión con Google.
export function AgendaGoogle({ agenda, correo }: { agenda: NonNullable<Agenda>; correo: string }) {
  const [acepta, setAcepta] = useState(false);
  const id = useId();

  return (
    <div>
      <div className="rounded-[3px] border border-niebla bg-blanco p-6">
        <h2 className="text-2xl text-marino-hondo">Antes de reservar</h2>
        <p className="mt-3 text-tenue">
          La reserva se hace en Google Calendar. Allí escribes tu nombre, tu correo y tu teléfono, y
          esos datos quedan en la cuenta de Google de la consulta, no en este sitio. Los uso solo para
          confirmar y gestionar tu cita. Puedes pedir que los consulte, corrija o elimine escribiendo a{" "}
          <span className="text-tinta">{correo}</span>.
        </p>
        <p className="mt-3 text-tenue">
          Por favor, no escribas detalles de tu situación personal en la reserva. Eso lo hablamos en
          sesión.
        </p>
        <label htmlFor={id} className="mt-5 flex cursor-pointer items-start gap-3 text-tinta">
          <input
            id={id}
            type="checkbox"
            checked={acepta}
            onChange={(e) => setAcepta(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--marino)]"
          />
          <span>Autorizo el tratamiento de mis datos personales para gestionar mi cita.</span>
        </label>
      </div>

      <div className="mt-6" aria-live="polite">
        {!acepta ? (
          <p className="text-tenue">Marca la casilla para ver los horarios disponibles.</p>
        ) : agenda.tipo === "incrustada" ? (
          <iframe
            src={agenda.src}
            title="Agenda de citas en Google Calendar"
            className="h-[720px] w-full rounded-[3px] border border-niebla bg-blanco"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <a
            href={agenda.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-[3px] bg-marino px-5 py-3 font-medium text-blanco hover:bg-marino-hondo"
          >
            Abrir la agenda en una pestaña nueva
          </a>
        )}
      </div>
    </div>
  );
}
