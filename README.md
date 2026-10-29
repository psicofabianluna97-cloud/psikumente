# psikumente.com — Psiku · MenteClara

Sitio de la consulta de psicología clínica de Fabián Luna.
Next.js + TypeScript + Tailwind, desplegado en Netlify desde GitHub.

> Este README crece en cada fase. Al final incluirá cómo publicar un artículo en menos de 5 minutos.

---

## Fase 1 — Instalación y primer despliegue

Todos los comandos son para **PowerShell 5** en Windows. Ejecuta una línea a la vez.

### 1. Programas (una sola vez)

1. **Node.js 22 LTS**: descárgalo de https://nodejs.org (botón "LTS") e instálalo con las opciones por defecto.
2. **Git para Windows**: https://git-scm.com/download/win. Opciones por defecto; en "Line ending conversions" elige **"Checkout as-is, commit as-is"**.
3. **VS Code** (recomendado): https://code.visualstudio.com

Cierra y vuelve a abrir PowerShell, y comprueba:

```powershell
node -v
git --version
```

Debe aparecer `v22.x.x` y una versión de git.

### 2. Cuenta de GitHub

1. Crea la cuenta en https://github.com/signup con **psicofabianluna97@gmail.com**.
2. Activa la verificación en dos pasos: *Settings → Password and authentication → Two-factor authentication*.
3. Crea un repositorio nuevo: botón **New** → nombre `psikumente` → **Private** → **sin** README, sin .gitignore y sin licencia → *Create repository*.

### 3. Identidad de git (una sola vez)

```powershell
git config --global user.name "Fabián Luna"
git config --global user.email "psicofabianluna97@gmail.com"
git config --global core.autocrlf false
git config --global init.defaultBranch main
```

### 4. Descomprimir e instalar el proyecto

Si el zip quedó en Descargas:

```powershell
New-Item -ItemType Directory -Force -Path C:\Proyectos
Expand-Archive -Path "$HOME\Downloads\psikumente-fase1.zip" -DestinationPath C:\Proyectos
cd C:\Proyectos\psikumente
npm install
```

Pruébalo en tu equipo:

```powershell
npm run dev
```

Abre http://localhost:3000. Para detenerlo: `Ctrl + C`.

Comprueba que compila como lo hará Netlify:

```powershell
npm run build
```

### 5. Subir a GitHub

Cambia `TU_USUARIO` por tu usuario de GitHub:

```powershell
git init
git add --all
git commit -m "Fase 1: base del proyecto"
git remote add origin https://github.com/TU_USUARIO/psikumente.git
git push -u origin main
```

La primera vez se abrirá el navegador para iniciar sesión en GitHub. Acepta.

### 6. Desplegar en Netlify

1. Entra a https://app.netlify.com/signup y elige **Sign up with GitHub**.
2. *Add new project → Import an existing project → GitHub*.
3. Autoriza a Netlify solo sobre el repositorio `psikumente` (opción *Only select repositories*).
4. Netlify lee `netlify.toml` y llena la configuración solo. Pulsa **Deploy**.
5. Cuando termine, en *Project configuration → Change project name* ponle `psikumente`.
   El sitio quedará en `https://psikumente.netlify.app`.

**No cambies todavía el DNS en Hostinger.** El sitio actual sigue funcionando en psikumente.com
hasta la fase 4. Mientras tanto, el nuevo sitio le pide a Google que no lo indexe
(`indexable: false` en `lib/sitio.ts`).

---

## Cómo se guardan los cambios (para todas las fases)

```powershell
cd C:\Proyectos\psikumente
git add --all
git commit -m "Describe aquí el cambio"
git push
```

Netlify publica solo cada vez que haces `git push`.

## Codificación UTF-8

- `.editorconfig` y `.vscode/settings.json` hacen que el editor guarde siempre en UTF-8 sin BOM.
- `npm run build` revisa la codificación antes de compilar y se detiene si encuentra un archivo dañado.
- Para revisar a mano: `npm run verificar`
- Para quitar un BOM: `node scripts/verificar-utf8.js --arreglar`

## Dónde está cada cosa

| Ruta | Qué contiene |
|---|---|
| `lib/sitio.ts` | Datos del sitio: tarifa, modalidad, correo, redes, agenda |
| `app/` | Páginas |
| `scripts/` | Utilidades de mantenimiento |
| `next.config.ts` | Cabeceras de seguridad y, desde la fase 4, redirecciones |
| `netlify.toml` | Configuración de despliegue |
