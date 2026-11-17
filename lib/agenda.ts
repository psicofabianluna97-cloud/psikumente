// Interpreta el enlace de la agenda de Google Calendar guardado en "Ajustes del sitio".
// Solo se aceptan direcciones de Google: así el sitio nunca incrusta una página ajena.

export type Agenda =
  | { tipo: "incrustada"; src: string } // se muestra dentro de la página
  | { tipo: "enlace"; href: string } // se abre en una pestaña nueva
  | null; // todavía no configurada

export function interpretarAgenda(valor: string): Agenda {
  let url: URL;
  try {
    url = new URL(valor.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;

  // Enlace largo ("Insertar en sitio web"): se puede mostrar dentro de la página.
  if (url.hostname === "calendar.google.com" && url.pathname.startsWith("/calendar/appointments/")) {
    url.searchParams.set("gv", "true");
    return { tipo: "incrustada", src: url.toString() };
  }

  // Enlace corto ("Compartir"): Google no permite incrustarlo, se abre aparte.
  if (url.hostname === "calendar.app.google" || url.hostname === "calendar.google.com") {
    return { tipo: "enlace", href: url.toString() };
  }

  return null;
}
