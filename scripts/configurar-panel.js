// Arranca el sitio en tu equipo con el panel conectado a GitHub.
// Se usa UNA sola vez, para crear la conexión entre el panel y tu repositorio.
// Uso: npm run panel:configurar   (luego abre http://localhost:3000/keystatic)

const { spawn } = require("child_process");
const path = require("path");

const next = path.resolve(__dirname, "..", "node_modules", "next", "dist", "bin", "next");

const proceso = spawn(process.execPath, [next, "dev"], {
  stdio: "inherit",
  env: Object.assign({}, process.env, { NEXT_PUBLIC_PANEL_GITHUB: "1" }),
});

proceso.on("exit", (codigo) => process.exit(codigo == null ? 0 : codigo));
