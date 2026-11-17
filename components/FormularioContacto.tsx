"use client";

import { useEffect, useRef, useState } from "react";
import { LIMITES, validarContacto, type ErroresContacto } from "@/lib/contacto";

type Estado = "inicial" | "enviando" | "enviado" | "error";

type Turnstile = {
  render: (el: HTMLElement, opciones: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const campo =
  "mt-2 block w-full rounded-[3px] border border-tenue/50 bg-blanco px-4 py-3 text-tinta placeholder:text-tenue/60 focus:border-marino";

export function FormularioContacto({ claveSitio }: { claveSitio: string | null }) {
  const [estado, setEstado] = useState<Estado>("inicial");
  const [errores, setErrores] = useState<ErroresContacto>({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [largo, setLargo] = useState(0);
  const [token, setToken] = useState("");
  const cajaTurnstile = useRef<HTMLDivElement>(null);
  const idWidget = useRef<string | null>(null);
  const confirmacion = useRef<HTMLDivElement>(null);

  // Carga el antispam de Cloudflare solo en esta página y solo si está configurado.
  useEffect(() => {
    if (!claveSitio || !cajaTurnstile.current) return;
    const caja = cajaTurnstile.current;

    const pintar = () => {
      if (!window.turnstile || idWidget.current) return;
      idWidget.current = window.turnstile.render(caja, {
        sitekey: claveSitio,
        language: "es",
        callback: (t: string) => setToken(t),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    };

    if (window.turnstile) {
      pintar();
      return;
    }
    const guion = document.createElement("script");
    guion.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    guion.async = true;
    guion.onload = pintar;
    document.head.appendChild(guion);
  }, [claveSitio]);

  useEffect(() => {
    if (estado === "enviado") confirmacion.current?.focus();
  }, [estado]);

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formulario = new FormData(evento.currentTarget);
    const crudo = {
      nombre: formulario.get("nombre"),
      correo: formulario.get("correo"),
      mensaje: formulario.get("mensaje"),
      consentimiento: formulario.get("consentimiento") === "on",
    };

    const revision = validarContacto(crudo);
    setErrores(revision.errores);
    setErrorGeneral("");
    if (Object.keys(revision.errores).length > 0) return;

    if (claveSitio && !token) {
      setErrorGeneral("Espera un momento a que termine la comprobación de seguridad e intenta de nuevo.");
      return;
    }

    setEstado("enviando");
    try {
      const respuesta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...crudo, sitioWeb: formulario.get("sitioWeb") ?? "", token }),
      });
      const datos = (await respuesta.json().catch(() => ({}))) as {
        errores?: ErroresContacto;
        error?: string;
      };

      if (respuesta.ok) {
        setEstado("enviado");
        return;
      }
      if (datos.errores) setErrores(datos.errores);
      setErrorGeneral(datos.error ?? "Revisa los campos marcados e intenta de nuevo.");
    } catch {
      setErrorGeneral("No pude enviar tu mensaje. Revisa tu conexión e intenta de nuevo.");
    }
    setEstado("error");
    setToken("");
    if (idWidget.current) window.turnstile?.reset(idWidget.current);
  }

  if (estado === "enviado") {
    return (
      <div
        ref={confirmacion}
        tabIndex={-1}
        role="status"
        className="rounded-[3px] border border-niebla bg-blanco p-6"
      >
        <h2 className="text-2xl text-marino-hondo">Mensaje enviado</h2>
        <p className="mt-3 text-tenue">
          Gracias por escribir. Te respondo al correo que dejaste en menos de 24 horas.
        </p>
      </div>
    );
  }

  const describe = (nombre: keyof ErroresContacto) => (errores[nombre] ? `error-${nombre}` : undefined);
  const mensajeError = (nombre: keyof ErroresContacto) =>
    errores[nombre] && (
      <p id={`error-${nombre}`} className="mt-2 text-sm text-[#a3271f]">
        {errores[nombre]}
      </p>
    );

  return (
    <form onSubmit={enviar} noValidate className="space-y-6">
      <div>
        <label htmlFor="nombre" className="text-tinta">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          maxLength={LIMITES.nombreMax}
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={describe("nombre")}
          className={campo}
        />
        {mensajeError("nombre")}
      </div>

      <div>
        <label htmlFor="correo" className="text-tinta">
          Correo
        </label>
        <input
          id="correo"
          name="correo"
          type="email"
          autoComplete="email"
          inputMode="email"
          maxLength={LIMITES.correoMax}
          aria-invalid={Boolean(errores.correo)}
          aria-describedby={describe("correo")}
          className={campo}
        />
        {mensajeError("correo")}
      </div>

      <div>
        <label htmlFor="mensaje" className="text-tinta">
          Tu pregunta
        </label>
        <p id="ayuda-mensaje" className="mt-1 text-sm text-tenue">
          Sobre horarios, pagos o cómo funciona la terapia. No incluyas detalles de tu situación
          personal: eso lo hablamos en la primera sesión.
        </p>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          maxLength={LIMITES.mensajeMax}
          onChange={(e) => setLargo(e.target.value.length)}
          aria-invalid={Boolean(errores.mensaje)}
          aria-describedby={["ayuda-mensaje", describe("mensaje")].filter(Boolean).join(" ")}
          className={campo}
        />
        <p className="mt-1 text-right text-sm text-tenue">
          {largo} de {LIMITES.mensajeMax}
        </p>
        {mensajeError("mensaje")}
      </div>

      {/* Campo trampa para bots: oculto para personas y lectores de pantalla. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="sitioWeb">No llenes este campo</label>
        <input id="sitioWeb" name="sitioWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="consentimiento" className="flex cursor-pointer items-start gap-3 text-tinta">
          <input
            id="consentimiento"
            name="consentimiento"
            type="checkbox"
            aria-invalid={Boolean(errores.consentimiento)}
            aria-describedby={describe("consentimiento")}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--marino)]"
          />
          <span>
            Autorizo el uso de mi nombre y mi correo únicamente para responder esta pregunta. El
            mensaje llega al correo de la consulta y este sitio no lo guarda.
          </span>
        </label>
        {mensajeError("consentimiento")}
      </div>

      {claveSitio && <div ref={cajaTurnstile} />}

      {errorGeneral && (
        <p role="alert" className="rounded-[3px] border border-[#a3271f]/40 bg-blanco p-4 text-[#a3271f]">
          {errorGeneral}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="inline-flex rounded-[3px] bg-marino px-5 py-3 font-medium text-blanco hover:bg-marino-hondo disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar pregunta"}
      </button>
    </form>
  );
}
