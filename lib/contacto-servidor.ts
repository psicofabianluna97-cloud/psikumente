// Configuración del formulario que solo existe en el servidor.
// Las claves viven en variables de entorno, nunca en el código.

export function correoConfigurado(): boolean {
  return Boolean(process.env.GMAIL_USUARIO && process.env.GMAIL_CLAVE_APP);
}

export function antispamConfigurado(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_CLAVE_SITIO && process.env.TURNSTILE_CLAVE_SECRETA,
  );
}

// En el sitio publicado, el formulario solo se muestra si puede enviar correos
// y tiene el antispam activo. En tu equipo siempre se muestra, en modo de prueba.
export function formularioActivo(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return correoConfigurado() && antispamConfigurado();
}
