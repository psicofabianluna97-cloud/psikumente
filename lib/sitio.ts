// Fuente única de datos del sitio.
// Todo lo que cambia (tarifa, modalidad, redes, enlaces) se edita SOLO aquí.
// En la fase 3 varios de estos campos pasarán a editarse desde el panel /admin.

export type Modalidad = {
  virtual: boolean;
  presencial: boolean;
  ciudad: string | null; // null mientras la atención sea solo virtual
};

export type LineaCrisis = {
  numero: string; // lo que se marca
  nombre: string;
  detalle: string;
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
  ejercicioDesde: 2021,

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

  // Pendientes: se agregan cuando los tengas.
  foto: null as string | null, // ruta dentro de /public, ej. "/fabian-luna.jpg"
  tarjetaProfesional: null as string | null,

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

export const navegacion = [
  { href: "/como-trabajo", texto: "Cómo trabajo" },
  { href: "/sobre-mi", texto: "Sobre mí" },
  { href: "/contacto", texto: "Contacto" },
];

// Verificar los números cada cierto tiempo: las entidades los cambian.
export const lineasCrisis: LineaCrisis[] = [
  { numero: "192", nombre: "Línea nacional de salud mental", detalle: "Marca 192 y luego la opción 4." },
  { numero: "123", nombre: "Emergencias", detalle: "Si hay riesgo inmediato para tu vida o la de alguien más." },
  { numero: "155", nombre: "Orientación a mujeres", detalle: "Violencias contra las mujeres. Gratuita, todo el país." },
  { numero: "141", nombre: "ICBF", detalle: "Protección de niñas, niños y adolescentes." },
  { numero: "106", nombre: "Línea 106 (Bogotá)", detalle: "Apoyo emocional, sobre todo para niñas, niños y adolescentes." },
];

export const trayectoria = [
  { anio: "2021", cargo: "Psicólogo", lugar: "Universidad El Bosque, Bogotá" },
  { anio: "2022", cargo: "Terapeuta líder", lugar: "IPS Horizontes" },
  { anio: "2024", cargo: "Psicólogo clínico", lugar: "Liga Contra el Cáncer, seccional Meta" },
  { anio: "2025", cargo: "Psicólogo clínico", lugar: "IPS Fases" },
  { anio: "2025", cargo: "Consulta clínica independiente", lugar: "Atención virtual" },
  { anio: "En curso", cargo: "Máster en Terapias de Tercera Generación", lugar: "Instituto Superior Europeo de Barcelona" },
];

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
