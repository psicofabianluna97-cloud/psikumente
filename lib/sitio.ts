// Fuente única de datos del sitio.
// Todo lo que cambia (tarifa, modalidad, redes, enlaces) se edita SOLO aquí.
// En la fase 3 varios de estos campos pasarán a editarse desde el panel /admin.

export type Modalidad = {
  virtual: boolean;
  presencial: boolean;
  ciudad: string | null; // null mientras la atención sea solo virtual
};

export const sitio = {
  marca: "Psiku · MenteClara",
  profesional: "Fabián Luna",
  nombreCompleto: "Carlos Fabián Luna Africano",
  titulo: "Psicólogo clínico",
  dominio: "https://psikumente.com",
  correo: "psicofabianluna97@gmail.com",
  descripcion:
    "Psicología clínica virtual para jóvenes y adultos en Colombia. No hace falta estar muy mal para empezar terapia.",

  tarifa: {
    valor: 80000,
    moneda: "COP",
    duracionMinutos: 50,
  },

  modalidad: {
    virtual: true,
    presencial: false,
    ciudad: null,
  } as Modalidad,

  // Se completan cuando tengas los usuarios definitivos.
  redes: {
    instagram: "",
    tiktok: "",
    youtube: "",
  },

  // Se configura en la fase 5 (página de citas de Google Calendar).
  agendaUrl: "",

  // Mientras sea false, el sitio le pide a Google que NO lo indexe.
  // Se cambia a true en la fase 4, cuando el sitio esté listo y apunte a psikumente.com.
  indexable: false,
};

export function formatearTarifa(valor: number = sitio.tarifa.valor): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: sitio.tarifa.moneda,
    maximumFractionDigits: 0,
  }).format(valor);
}

export function textoModalidad(m: Modalidad = sitio.modalidad): string {
  if (m.virtual && m.presencial && m.ciudad) return `Virtual en todo Colombia y presencial en ${m.ciudad}`;
  if (m.presencial && m.ciudad) return `Presencial en ${m.ciudad}`;
  return "Atención virtual en todo Colombia";
}
