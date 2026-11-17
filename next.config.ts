import type { NextConfig } from "next";

// Cabeceras de seguridad base. La política de contenido (CSP) se añade en las
// fases 5 y 6, cuando estén definidos Google Calendar, Analytics y Turnstile.
const cabecerasSeguridad = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

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
    return [{ source: "/:path*", headers: cabecerasSeguridad }];
  },
};

export default nextConfig;
