// Datos estructurados (schema.org) que Google usa para entender el sitio.
// Solo se declara lo que es verificable: sin valoraciones, reseñas ni promesas.
import type { Articulo } from "@/lib/articulos";
import type { Pregunta } from "@/content/preguntas";
import { sitio } from "@/lib/sitio";

const url = (ruta: string) => new URL(ruta, sitio.dominio).toString();
const ID_PERSONA = url("/sobre-mi#fabian-luna");
const ID_SERVICIO = url("/#consulta");
const ID_SITIO = url("/#sitio");

const redes = () => Object.values(sitio.redes).filter(Boolean);

export function esquemaPersona() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ID_PERSONA,
    name: sitio.profesional,
    alternateName: sitio.nombreCompleto,
    jobTitle: sitio.titulo,
    url: url("/sobre-mi"),
    ...(sitio.foto ? { image: url(sitio.foto) } : {}),
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad El Bosque" },
    knowsAbout: [
      "Psicología clínica",
      "Terapia de Aceptación y Compromiso",
      "Evitación experiencial",
      "Psicoterapia en línea",
    ],
    knowsLanguage: "es",
    worksFor: { "@id": ID_SERVICIO },
    ...(redes().length ? { sameAs: redes() } : {}),
  };
}

export function esquemaServicio() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ID_SERVICIO,
    name: sitio.marca,
    description: sitio.descripcion,
    url: url("/"),
    founder: { "@id": ID_PERSONA },
    areaServed: { "@type": "Country", name: "Colombia" },
    availableLanguage: "es",
    priceRange: `${sitio.tarifa.valor} ${sitio.tarifa.moneda} por sesión`,
    ...(sitio.modalidad.presencial && sitio.modalidad.ciudad
      ? { address: { "@type": "PostalAddress", addressLocality: sitio.modalidad.ciudad, addressCountry: "CO" } }
      : {}),
    makesOffer: {
      "@type": "Offer",
      price: sitio.tarifa.valor,
      priceCurrency: sitio.tarifa.moneda,
      itemOffered: {
        "@type": "Service",
        name: "Sesión de psicoterapia individual",
        serviceType: "Psicoterapia",
        description: `Sesión individual de ${sitio.tarifa.duracionMinutos} minutos${
          sitio.modalidad.virtual ? ", por videollamada" : ""
        }.`,
        provider: { "@id": ID_PERSONA },
      },
    },
    ...(redes().length ? { sameAs: redes() } : {}),
  };
}

export function esquemaSitio() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ID_SITIO,
    name: sitio.marca,
    url: url("/"),
    inLanguage: "es-CO",
    publisher: { "@id": ID_SERVICIO },
  };
}

export function esquemaPreguntas(preguntas: Pregunta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta },
    })),
  };
}

export function esquemaArticulo(articulo: Articulo) {
  const direccion = url(`/articulos/${articulo.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articulo.titulo,
    description: articulo.descripcion,
    datePublished: articulo.fecha,
    dateModified: articulo.fecha,
    inLanguage: "es-CO",
    mainEntityOfPage: direccion,
    url: direccion,
    keywords: articulo.etiquetas.join(", "),
    author: { "@id": ID_PERSONA, "@type": "Person", name: sitio.profesional, url: url("/sobre-mi") },
    publisher: { "@id": ID_SERVICIO, "@type": "ProfessionalService", name: sitio.marca },
  };
}

export function esquemaMigas(migas: { nombre: string; ruta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nombre,
      item: url(m.ruta),
    })),
  };
}

