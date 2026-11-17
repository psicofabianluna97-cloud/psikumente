// Reglas del formulario de contacto. Se usan en el navegador (para avisar pronto)
// y en el servidor (que es quien decide de verdad).

export const LIMITES = {
  nombreMin: 2,
  nombreMax: 80,
  correoMax: 120,
  mensajeMin: 10,
  mensajeMax: 500,
};

export type DatosContacto = {
  nombre: string;
  correo: string;
  mensaje: string;
};

export type ErroresContacto = Partial<Record<keyof DatosContacto | "consentimiento", string>>;

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Quita saltos de línea y caracteres de control: evita que alguien altere
// el asunto o los encabezados del correo.
export function unaLinea(texto: string): string {
  return texto.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
}

export function validarContacto(
  crudo: { nombre?: unknown; correo?: unknown; mensaje?: unknown; consentimiento?: unknown },
): { datos: DatosContacto; errores: ErroresContacto } {
  const nombre = unaLinea(typeof crudo.nombre === "string" ? crudo.nombre : "");
  const correo = unaLinea(typeof crudo.correo === "string" ? crudo.correo : "").toLowerCase();
  const mensaje = (typeof crudo.mensaje === "string" ? crudo.mensaje : "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim();

  const errores: ErroresContacto = {};

  if (nombre.length < LIMITES.nombreMin) errores.nombre = "Escribe tu nombre.";
  else if (nombre.length > LIMITES.nombreMax) errores.nombre = "El nombre es demasiado largo.";

  if (!CORREO.test(correo) || correo.length > LIMITES.correoMax) {
    errores.correo = "Escribe un correo válido, por ejemplo nombre@correo.com.";
  }

  if (mensaje.length < LIMITES.mensajeMin) errores.mensaje = "Escribe tu pregunta.";
  else if (mensaje.length > LIMITES.mensajeMax) {
    errores.mensaje = `El mensaje puede tener máximo ${LIMITES.mensajeMax} caracteres.`;
  }

  if (crudo.consentimiento !== true) {
    errores.consentimiento = "Necesito tu autorización para poder responderte.";
  }

  return { datos: { nombre, correo, mensaje }, errores };
}
