# psikumente.com — Psiku · MenteClara

Sitio de la consulta de psicología clínica de Fabián Luna.
Next.js + TypeScript + Tailwind, desplegado en Netlify desde GitHub.

> Este README crece en cada fase. Para publicar un artículo, ve a la sección **Fase 3**.

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

---

## Fase 2 — Páginas principales

| Ruta | Archivo |
|---|---|
| `/` | `app/page.tsx` |
| `/algo-cambio` (enlace de la bio) | `app/algo-cambio/page.tsx` |
| `/como-trabajo` | `app/como-trabajo/page.tsx` |
| `/sobre-mi` | `app/sobre-mi/page.tsx` |
| `/agendar` y `/contacto` | Temporales hasta la fase 5 |

Textos que se editan sin tocar las páginas:

- `content/cambios.ts`: los seis cambios cotidianos.
- `content/preguntas.ts`: preguntas frecuentes.
- `lib/sitio.ts`: tarifa, modalidad, trayectoria, líneas de crisis, foto y tarjeta profesional.

Para agregar la foto: guárdala en `public/` (por ejemplo `public/fabian-luna.jpg`) y en `lib/sitio.ts`
cambia `foto: null` por `foto: "/fabian-luna.jpg"`.

---

## Fase 3 — Artículos y panel de contenido

### Publicar un artículo en menos de 5 minutos

**Opción A: desde la terminal (funciona siempre)**

```powershell
node scripts/nuevo-articulo.js "Título del artículo" 19-25
```

El último dato es el público: `19-25`, `26-35` o `padres`. Se crea el archivo
`content/articulos/titulo-del-articulo.md`, en UTF-8 sin BOM y como borrador.

1. Abre el archivo en VS Code y completa la descripción, las etiquetas y el texto.
2. Revísalo en http://localhost:3000/articulos (`npm run dev`). Los borradores solo se ven en tu equipo.
3. Cuando esté listo, cambia `borrador: true` por `borrador: false`.
4. Publica:

```powershell
git add --all
git commit -m "Artículo: título del artículo"
git push
```

**Opción B: desde el panel**

- En tu equipo: `npm run dev` y abre http://localhost:3000/admin. Guarda en los archivos del
  proyecto; después publicas con `git add --all`, `git commit` y `git push`.
- En el sitio publicado (después de activarlo, ver abajo): entra a `/admin` desde cualquier
  navegador, escribe y pulsa **Guardar**. El cambio se publica solo en uno o dos minutos.

### Campos de cada artículo

| Campo | Qué es |
|---|---|
| `titulo` | Título visible. Entre 10 y 90 caracteres. |
| `descripcion` | Una o dos frases. La muestran Google y el listado. |
| `fecha` | Formato `AAAA-MM-DD`. |
| `publico` | `19-25`, `26-35` o `padres`. |
| `etiquetas` | Lista de temas. Cada uno genera una página en `/articulos/tema/...`. |
| `borrador` | `true`: no se publica. `false`: se publica. |

El nombre del archivo es la dirección del artículo (el *slug*).
Si falta un campo o tiene un valor inválido, `npm run build` se detiene y dice qué archivo corregir.

### Qué se edita desde el panel

- **Artículos**
- **Los seis cambios** (`content/cambios.json`)
- **Preguntas frecuentes** (`content/preguntas.json`)
- **Ajustes del sitio** (`content/ajustes.json`): tarifa, duración, modalidad y ciudad,
  tarjeta profesional, foto, redes y enlace de la agenda.

### Activar el panel en el sitio publicado (una sola vez)

Mientras no hagas estos pasos, `/admin` en el sitio publicado muestra "El panel todavía no
está activado" y no acepta ninguna conexión.

1. En la terminal, detén el sitio si está corriendo y ejecuta:

   ```powershell
   npm run panel:configurar
   ```

2. Abre http://localhost:3000/keystatic. El panel te guía para **crear una GitHub App**.
   - Inicia sesión con la cuenta **psicofabianluna97-cloud**.
   - Cuando pida la dirección del sitio publicado, escribe la de Netlify
     (por ejemplo `https://papaya-liger-2975d0.netlify.app`).
   - Al final, instala la app **solo en el repositorio `psikumente`**.
3. Se crea un archivo `.env` en la carpeta del proyecto con cuatro claves. **No lo subas ni lo
   compartas**: git ya lo ignora.
4. En Netlify: **Project configuration → Environment variables → Add a variable**. Copia las
   cuatro, con el mismo nombre y valor que tienen en `.env`:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
5. En Netlify: **Deploys → Trigger deploy → Deploy project**.
6. Detén la terminal (`Ctrl + C`) y entra a `/admin` en el sitio publicado.

Solo puede entrar al panel quien tenga permiso de escritura en el repositorio de GitHub.
Hoy eres solo tú, con verificación en dos pasos.

Cuando el sitio pase a psikumente.com (fase 4), hay que agregar la nueva dirección en la
GitHub App: *GitHub → Settings → Developer settings → GitHub Apps → la app → Callback URL*,
añadiendo `https://psikumente.com/api/keystatic/github/oauth/callback`.
