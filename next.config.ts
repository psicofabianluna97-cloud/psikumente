import type { NextConfig } from "next";

// Cabeceras de seguridad que se envían en todas las páginas.
const cabecerasSeguridad = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

// Política de contenido (CSP): lista exacta de lo que el navegador puede cargar.
// Todo lo que no esté aquí se bloquea, aunque alguien lograra inyectar código.
// En la fase 6 se agregan los dominios de Google Analytics.
const enDesarrollo = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  // Next.js necesita scripts en línea para hidratar la página. Turnstile es el antispam del formulario.
  `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com${enDesarrollo ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${enDesarrollo ? " ws: wss:" : ""}`,
  // Marcos permitidos: la agenda de Google y la comprobación de Turnstile.
  "frame-src https://calendar.google.com https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(enDesarrollo ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // /admin es la dirección fácil de recordar; el panel vive en /keystatic.
  async redirects() {
    return [
      { source: "/admin", destination: "/keystatic", permanent: false },
      // Direcciones del sitio anterior (HTML estático). Redirección permanente
      // para que Google traslade lo que ya tenía indexado.
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/servicios.html", destination: "/como-trabajo", permanent: true },
      { source: "/sobre-mi.html", destination: "/sobre-mi", permanent: true },
      { source: "/bibliografia.html", destination: "/articulos", permanent: true },
      { source: "/empleos.html", destination: "/", permanent: true },
      { source: "/admin.html", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: cabecerasSeguridad },
      // El panel carga recursos de GitHub y tiene su propio control de acceso,
      // así que la política de contenido se aplica a todo menos a él.
      {
        source: "/((?!keystatic|api/keystatic).*)",
        headers: [{ key: "Content-Security-Policy", value: csp }],
      },
    ];
  },
};

export default nextConfig;
