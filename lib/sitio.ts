// Fuente única de datos del sitio.
// Lo que cambia con frecuencia (tarifa, modalidad, redes, agenda, foto) vive en
// content/ajustes.json y se edita desde el panel /admin, en "Ajustes del sitio".
// Lo demás (marca, correo, líneas de crisis, trayectoria) se edita en este archivo.
import ajustesCrudos from "@/content/ajustes.json";

// El panel omite del archivo los campos que quedan vacíos, así que todos son opcionales
// y cada uno tiene un valor por defecto.
type Ajustes = {
  tarifaValor?: number;
  duracionMinutos?: number;
  virtual?: boolean;
  presencial?: boolean;
  ciudad?: string;
  tarjetaProfesional?: string;
  foto?: string;
  instagram?: string | null;
  tiktok?: string | null;
  youtube?: string | null;
  agendaUrl?: string | null;
  googleVerificacion?: string;
};

const ajustes: Ajustes = ajustesCrudos;

const texto = (v: string | null | undefined): string => (v ?? "").trim();
const vacioANull = (v: string | null | undefined): string | null => texto(v) || null;

export type Modalidad = {
  virtual: boolean;
  presencial: boolean;
  ciudad: string | null; // null mientras la atención sea solo virtual
};

// Públicos a los que se dirige cada artículo. La clave es lo que se guarda en el archivo.
export const publicos = {
  "19-25": "19 a 25 años",
  "26-35": "26 a 35 años",
  padres: "Madres y padres",
} as const;

export type Publico = keyof typeof publicos;

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
    valor: ajustes.tarifaValor ?? 80000,
    moneda: "COP",
    duracionMinutos: ajustes.duracionMinutos ?? 50,
  },

  modalidad: {
    virtual: ajustes.virtual ?? true,
    presencial: ajustes.presencial ?? false,
    ciudad: vacioANull(ajustes.ciudad),
  } as Modalidad,

  // Ruta dentro de /public, por ejemplo "/fabian-luna.jpg". Vacío: se muestra el monograma.
  foto: vacioANull(ajustes.foto),
  tarjetaProfesional: vacioANull(ajustes.tarjetaProfesional),

  redes: {
    instagram: texto(ajustes.instagram),
    tiktok: texto(ajustes.tiktok),
    youtube: texto(ajustes.youtube),
  },

  // Se configura en la fase 5 (página de citas de Google Calendar).
  agendaUrl: texto(ajustes.agendaUrl),

  // Código de verificación de Google Search Console (solo el código, sin la etiqueta).
  googleVerificacion: texto(ajustes.googleVerificacion),

  // Mientras sea false, el sitio le pide a Google que NO lo indexe y el sitemap queda vacío.
  // Se cambia a true el día en que psikumente.com apunte al sitio nuevo (ver README, fase 4).
  indexable: false,
};

export const navegacion = [
  { href: "/articulos", texto: "Artículos" },
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
