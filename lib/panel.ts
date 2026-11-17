// Estado del panel de contenido.
// En tu equipo siempre está activo. En el sitio publicado solo se activa cuando
// están configuradas las claves de GitHub; sin ellas, el panel no responde.
export function panelActivo(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET &&
      process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
  );
}
