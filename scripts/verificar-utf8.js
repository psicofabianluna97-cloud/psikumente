// Revisa que los archivos de texto del proyecto estén en UTF-8 sin BOM.
// Uso:
//   node scripts/verificar-utf8.js          -> solo revisa (falla si encuentra problemas)
//   node scripts/verificar-utf8.js --arreglar -> quita el BOM automáticamente
// Se ejecuta solo antes de cada build, así un archivo dañado nunca llega a publicarse.

const fs = require("fs");
const path = require("path");

const RAIZ = path.resolve(__dirname, "..");
const IGNORAR = new Set(["node_modules", ".next", ".git", ".netlify", "out"]);
const EXTENSIONES = new Set([
  ".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".css",
  ".md", ".mdx", ".yaml", ".yml", ".toml", ".txt", ".svg",
]);
const BOM = Buffer.from([0xef, 0xbb, 0xbf]);
const arreglar = process.argv.includes("--arreglar");

function recorrer(dir, encontrados = []) {
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORAR.has(entrada.name)) continue;
    const ruta = path.join(dir, entrada.name);
    if (entrada.isDirectory()) recorrer(ruta, encontrados);
    else if (EXTENSIONES.has(path.extname(entrada.name).toLowerCase())) encontrados.push(ruta);
  }
  return encontrados;
}

const conBom = [];
const invalidos = [];
const decodificador = new TextDecoder("utf-8", { fatal: true });

for (const archivo of recorrer(RAIZ)) {
  const datos = fs.readFileSync(archivo);
  const relativo = path.relative(RAIZ, archivo);

  if (datos.subarray(0, 3).equals(BOM)) {
    conBom.push(relativo);
    if (arreglar) fs.writeFileSync(archivo, datos.subarray(3));
  }

  try {
    decodificador.decode(datos);
  } catch {
    invalidos.push(relativo);
  }
}

if (conBom.length) {
  console.log(arreglar ? "BOM eliminado en:" : "Archivos con BOM:");
  conBom.forEach((f) => console.log("  - " + f));
}
if (invalidos.length) {
  console.log("Archivos que NO son UTF-8 válido (tildes o ñ dañadas, revísalos a mano):");
  invalidos.forEach((f) => console.log("  - " + f));
}

const hayError = invalidos.length > 0 || (conBom.length > 0 && !arreglar);
if (hayError) {
  if (conBom.length && !arreglar) {
    console.log("\nPara quitar el BOM ejecuta: node scripts/verificar-utf8.js --arreglar");
  }
  process.exit(1);
}
console.log("Codificación correcta: todos los archivos están en UTF-8 sin BOM.");
