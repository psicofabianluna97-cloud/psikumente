// Lee los artículos de content/articulos (un archivo .md por artículo) y los valida.
// Si a un artículo le falta un campo o tiene un valor inválido, el build se detiene
// y dice exactamente qué archivo y qué campo corregir.
import fs from "node:fs";
import path from "node:path";
import { load as leerYaml } from "js-yaml";
import { publicos, type Publico } from "@/lib/sitio";
import { slugificar } from "@/lib/texto";

const CARPETA = path.join(process.cwd(), "content", "articulos");

export type Articulo = {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string; // AAAA-MM-DD
  publico: Publico;
  etiquetas: string[];
  borrador: boolean;
  contenido: string; // Markdown, sin el encabezado
  minutosLectura: number;
};

export type Etiqueta = { nombre: string; slug: string; cantidad: number };

function leerArchivo(nombre: string): Articulo {
  const slug = nombre.replace(/\.md$/, "");
  const crudo = fs.readFileSync(path.join(CARPETA, nombre), "utf8");
  const error = (mensaje: string) => new Error(`content/articulos/${nombre}: ${mensaje}`);

  const partes = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(crudo);
  if (!partes) throw error("falta el encabezado entre líneas '---' al inicio del archivo.");

  const datos = (leerYaml(partes[1]) ?? {}) as Record<string, unknown>;
  const contenido = partes[2].trim();

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    throw error("el nombre del archivo solo puede tener minúsculas, números y guiones.");
  }

  const texto = (campo: string): string => {
    const valor = datos[campo];
    if (typeof valor !== "string" || valor.trim() === "") throw error(`falta el campo "${campo}".`);
    return valor.trim();
  };

  // YAML convierte las fechas sin comillas en objetos Date: se aceptan ambas formas.
  const fechaCruda = datos.fecha;
  const fecha =
    fechaCruda instanceof Date ? fechaCruda.toISOString().slice(0, 10) : String(fechaCruda ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || Number.isNaN(Date.parse(fecha))) {
    throw error('el campo "fecha" debe tener el formato AAAA-MM-DD.');
  }

  const publico = String(datos.publico ?? "");
  if (!(publico in publicos)) {
    throw error(`el campo "publico" debe ser uno de: ${Object.keys(publicos).join(", ")}.`);
  }

  const etiquetasCrudas = datos.etiquetas ?? [];
  if (!Array.isArray(etiquetasCrudas)) throw error('el campo "etiquetas" debe ser una lista.');
  const etiquetas = etiquetasCrudas.map((e) => String(e).trim()).filter(Boolean);

  if (contenido === "") throw error("el artículo no tiene contenido.");

  const palabras = contenido.split(/\s+/).length;

  return {
    slug,
    titulo: texto("titulo"),
    descripcion: texto("descripcion"),
    fecha,
    publico: publico as Publico,
    etiquetas,
    borrador: datos.borrador === true,
    contenido,
    minutosLectura: Math.max(1, Math.round(palabras / 200)),
  };
}

// Artículos publicados, del más reciente al más antiguo.
// Los borradores solo se ven al trabajar en tu equipo (npm run dev).
export function obtenerArticulos(): Articulo[] {
  if (!fs.existsSync(CARPETA)) return [];
  const mostrarBorradores = process.env.NODE_ENV === "development";

  return fs
    .readdirSync(CARPETA)
    .filter((nombre) => nombre.endsWith(".md"))
    .map(leerArchivo)
    .filter((a) => mostrarBorradores || !a.borrador)
    .sort((a, b) => (a.fecha < b.fecha ? 1 : a.fecha > b.fecha ? -1 : a.titulo.localeCompare(b.titulo)));
}

export function obtenerArticulo(slug: string): Articulo | null {
  return obtenerArticulos().find((a) => a.slug === slug) ?? null;
}

export function obtenerEtiquetas(): Etiqueta[] {
  const mapa = new Map<string, Etiqueta>();
  for (const articulo of obtenerArticulos()) {
    for (const nombre of articulo.etiquetas) {
      const slug = slugificar(nombre);
      if (!slug) continue;
      const actual = mapa.get(slug);
      if (actual) actual.cantidad += 1;
      else mapa.set(slug, { nombre, slug, cantidad: 1 });
    }
  }
  return [...mapa.values()].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

export function articulosPorEtiqueta(slugEtiqueta: string): Articulo[] {
  return obtenerArticulos().filter((a) => a.etiquetas.some((e) => slugificar(e) === slugEtiqueta));
}
