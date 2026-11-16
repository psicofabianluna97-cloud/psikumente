// Configuración del panel de contenido (/admin).
// En tu equipo guarda los cambios en los archivos del proyecto.
// En el sitio publicado los guarda en GitHub, y solo puede entrar quien tenga
// permiso de escritura sobre el repositorio.
import { collection, config, fields, singleton } from "@keystatic/core";

const enGithub =
  process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_PANEL_GITHUB === "1";

export default config({
  storage: enGithub
    ? { kind: "github", repo: "psicofabianluna97-cloud/psikumente" }
    : { kind: "local" },

  locale: "es-ES",

  ui: {
    brand: { name: "Psiku · MenteClara" },
    navigation: {
      Contenido: ["articulos"],
      Páginas: ["cambios", "preguntas"],
      Configuración: ["ajustes"],
    },
  },

  collections: {
    articulos: collection({
      label: "Artículos",
      path: "content/articulos/*",
      slugField: "titulo",
      format: { contentField: "contenido" },
      entryLayout: "content",
      columns: ["titulo", "fecha"],
      schema: {
        titulo: fields.slug({
          name: {
            label: "Título",
            validation: { isRequired: true, length: { min: 10, max: 90 } },
          },
          slug: {
            label: "Dirección (slug)",
            description: "Parte final del enlace. Solo minúsculas, números y guiones.",
          },
        }),
        descripcion: fields.text({
          label: "Descripción",
          description: "Una o dos frases. Es lo que muestra Google y la tarjeta del artículo.",
          multiline: true,
          validation: { isRequired: true, length: { min: 50, max: 170 } },
        }),
        fecha: fields.date({
          label: "Fecha de publicación",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        publico: fields.select({
          label: "Público",
          options: [
            { label: "19 a 25 años", value: "19-25" },
            { label: "26 a 35 años", value: "26-35" },
            { label: "Madres y padres", value: "padres" },
          ],
          defaultValue: "19-25",
        }),
        etiquetas: fields.array(fields.text({ label: "Etiqueta" }), {
          label: "Etiquetas",
          description: "Temas del artículo: sueño, postergación, pantallas…",
          itemLabel: (props) => props.value,
        }),
        borrador: fields.checkbox({
          label: "Borrador",
          description: "Si está marcado, el artículo no aparece en el sitio.",
          defaultValue: false,
        }),
        contenido: fields.markdoc({
          label: "Contenido",
          extension: "md",
          options: { image: false },
        }),
      },
    }),
  },

  singletons: {
    cambios: singleton({
      label: "Los seis cambios",
      path: "content/cambios",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            tema: fields.text({ label: "Tema", validation: { isRequired: true } }),
            cambio: fields.text({
              label: "Lo que se observa",
              multiline: true,
              validation: { isRequired: true },
            }),
            sostiene: fields.text({
              label: "Lo que a veces lo sostiene",
              multiline: true,
              validation: { isRequired: true },
            }),
          }),
          { label: "Cambios cotidianos", itemLabel: (props) => props.fields.tema.value },
        ),
      },
    }),

    preguntas: singleton({
      label: "Preguntas frecuentes",
      path: "content/preguntas",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            pregunta: fields.text({ label: "Pregunta", validation: { isRequired: true } }),
            respuesta: fields.text({
              label: "Respuesta",
              multiline: true,
              validation: { isRequired: true },
            }),
          }),
          { label: "Preguntas", itemLabel: (props) => props.fields.pregunta.value },
        ),
      },
    }),

    ajustes: singleton({
      label: "Ajustes del sitio",
      path: "content/ajustes",
      format: { data: "json" },
      schema: {
        tarifaValor: fields.integer({
          label: "Valor de la sesión (COP)",
          validation: { isRequired: true, min: 0 },
        }),
        duracionMinutos: fields.integer({
          label: "Duración de la sesión (minutos)",
          validation: { isRequired: true, min: 10 },
        }),
        virtual: fields.checkbox({ label: "Atención virtual", defaultValue: true }),
        presencial: fields.checkbox({ label: "Atención presencial", defaultValue: false }),
        ciudad: fields.text({
          label: "Ciudad de atención presencial",
          description: "Solo se muestra si la atención presencial está activa.",
        }),
        tarjetaProfesional: fields.text({
          label: "Número de tarjeta profesional",
          description: "Déjalo vacío para no mostrarlo.",
        }),
        foto: fields.text({
          label: "Foto de «Sobre mí»",
          description: "Ruta de la imagen dentro de la carpeta public, por ejemplo /fabian-luna.jpg.",
        }),
        instagram: fields.url({ label: "Instagram (enlace completo)" }),
        tiktok: fields.url({ label: "TikTok (enlace completo)" }),
        youtube: fields.url({ label: "YouTube (enlace completo)" }),
        agendaUrl: fields.url({ label: "Enlace de la agenda de Google Calendar" }),
      },
    }),
  },
});
