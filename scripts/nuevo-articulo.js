// Crea un artículo nuevo listo para escribir.
// Uso:
//   node scripts/nuevo-articulo.js "Título del artículo"
//   node scripts/nuevo-articulo.js "Título del artículo" 26-35
// El segundo dato es el público: 19-25 (por defecto), 26-35 o padres.
// El archivo se guarda en UTF-8 sin BOM y queda como borrador.

const fs = require("fs");
const path = require("path");

const PUBLICOS = ["19-25", "26-35", "padres"];
const titulo = (process.argv[2] || "").trim();
const publico = (process.argv[3] || "19-25").trim();

if (!titulo) {
  console.log('Falta el título. Ejemplo: node scripts/nuevo-articulo.js "Cancelar planes que antes esperabas"');
  process.exit(1);
}
if (!PUBLICOS.includes(publico)) {
  console.log("El público debe ser uno de: " + PUBLICOS.join(", "));
  process.exit(1);
}

const slug = titulo
  .toLowerCase()
  .normalize("NFD")
  .replace(/[̀-ͯ]/g, "")
  .replace(/ñ/g, "n")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

if (!slug) {
  console.log("El título debe tener al menos una letra o un número.");
  process.exit(1);
}

const carpeta = path.resolve(__dirname, "..", "content", "articulos");
const archivo = path.join(carpeta, slug + ".md");

if (fs.existsSync(archivo)) {
  console.log("Ya existe un artículo con ese nombre: content/articulos/" + slug + ".md");
  process.exit(1);
}

// Fecha de hoy en hora de Colombia, formato AAAA-MM-DD.
const hoy = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date());

const contenido = [
  "---",
  "titulo: " + JSON.stringify(titulo),
  'descripcion: "Escribe aquí una o dos frases (entre 50 y 170 caracteres) que resuman el artículo."',
  "fecha: " + hoy,
  "publico: " + publico,
  "etiquetas:",
  "  - Tema",
  "borrador: true",
  "---",
  "Escribe aquí el artículo (400 a 600 palabras).",
  "",
  "## Un subtítulo",
  "",
  "Más texto.",
  "",
].join("\n");

fs.mkdirSync(carpeta, { recursive: true });
fs.writeFileSync(archivo, contenido, { encoding: "utf8" });

console.log("Artículo creado: content/articulos/" + slug + ".md");
console.log("Quedó como borrador. Cuando esté listo, cambia 'borrador: true' por 'borrador: false'.");
