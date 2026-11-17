import nodemailer from "nodemailer";
import { unaLinea, validarContacto } from "@/lib/contacto";
import { antispamConfigurado, correoConfigurado } from "@/lib/contacto-servidor";
import { sitio } from "@/lib/sitio";

export const runtime = "nodejs";

const responder = (estado: number, cuerpo: object) => Response.json(cuerpo, { status: estado });

// Límite de envíos por dirección IP. Vive en la memoria del servidor, así que es
// una barrera adicional: la protección principal contra bots es Turnstile.
const VENTANA_MS = 10 * 60 * 1000;
const MAXIMO = 3;
const envios = new Map<string, number[]>();

function superaLimite(ip: string): boolean {
  const ahora = Date.now();
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (recientes.length >= MAXIMO) {
    envios.set(ip, recientes);
    return true;
  }
  recientes.push(ahora);
  envios.set(ip, recientes);
  if (envios.size > 5000) envios.clear();
  return false;
}

async function turnstileValido(token: string, ip: string): Promise<boolean> {
  const cuerpo = new URLSearchParams({
    secret: process.env.TURNSTILE_CLAVE_SECRETA ?? "",
    response: token,
  });
  if (ip !== "desconocida") cuerpo.set("remoteip", ip);
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: cuerpo,
      signal: AbortSignal.timeout(8000),
    });
    const datos = (await r.json()) as { success?: boolean };
    return datos.success === true;
  } catch {
    return false;
  }
}

export async function POST(peticion: Request) {
  const enProduccion = process.env.NODE_ENV === "production";

  // Solo se aceptan envíos hechos desde el propio sitio.
  const origen = peticion.headers.get("origin");
  const anfitrion = peticion.headers.get("x-forwarded-host") ?? peticion.headers.get("host");
  if (!origen || !anfitrion || new URL(origen).host !== anfitrion) {
    return responder(403, { error: "Origen no permitido." });
  }

  const texto = await peticion.text();
  if (texto.length > 6000) return responder(413, { error: "El mensaje es demasiado largo." });

  let crudo: Record<string, unknown>;
  try {
    crudo = JSON.parse(texto);
  } catch {
    return responder(400, { error: "Solicitud no válida." });
  }
  if (typeof crudo !== "object" || crudo === null) return responder(400, { error: "Solicitud no válida." });

  // Campo trampa: las personas no lo ven; los bots lo llenan. Se responde "ok" sin enviar nada.
  if (typeof crudo.sitioWeb === "string" && crudo.sitioWeb !== "") return responder(200, { ok: true });

  const { datos, errores } = validarContacto(crudo);
  if (Object.keys(errores).length > 0) return responder(422, { errores });

  const ip =
    peticion.headers.get("x-nf-client-connection-ip") ??
    peticion.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "desconocida";

  if (superaLimite(ip)) {
    return responder(429, { error: "Ya recibí varios mensajes tuyos. Intenta de nuevo en unos minutos." });
  }

  if (antispamConfigurado()) {
    const token = typeof crudo.token === "string" ? crudo.token : "";
    if (!token || !(await turnstileValido(token, ip))) {
      return responder(400, { error: "No pude comprobar que eres una persona. Recarga la página e intenta de nuevo." });
    }
  } else if (enProduccion) {
    return responder(503, { error: "El formulario no está disponible en este momento." });
  }

  const cuerpo = [
    `Nombre: ${datos.nombre}`,
    `Correo: ${datos.correo}`,
    "",
    datos.mensaje,
    "",
    "--",
    `Enviado desde el formulario de ${sitio.dominio}. Autorizó el tratamiento de datos para recibir respuesta.`,
  ].join("\n");

  if (!correoConfigurado()) {
    if (enProduccion) return responder(503, { error: "El formulario no está disponible en este momento." });
    // En tu equipo, sin claves: el mensaje se muestra en la terminal en lugar de enviarse.
    console.log("\n[contacto] Modo de prueba: este mensaje NO se envió por correo.\n" + cuerpo + "\n");
    return responder(200, { ok: true, prueba: true });
  }

  try {
    const transporte = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: process.env.GMAIL_USUARIO, pass: process.env.GMAIL_CLAVE_APP },
    });
    await transporte.sendMail({
      from: { name: "Web Psiku", address: process.env.GMAIL_USUARIO as string },
      to: process.env.GMAIL_USUARIO,
      replyTo: { name: datos.nombre, address: datos.correo },
      subject: `[Web] Pregunta de ${unaLinea(datos.nombre)}`,
      text: cuerpo, // solo texto plano: nada de lo que escriba la persona se interpreta como HTML
    });
  } catch (e) {
    // No se registra el contenido del mensaje, solo el tipo de fallo.
    console.error("[contacto] No se pudo enviar el correo:", e instanceof Error ? e.message : "error desconocido");
    return responder(502, { error: "No pude enviar tu mensaje. Intenta de nuevo en unos minutos." });
  }

  return responder(200, { ok: true });
}
