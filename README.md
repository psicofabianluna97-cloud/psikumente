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

---

## Fase 4 — SEO y redirecciones

### Qué quedó automático

| Elemento | Dónde | Qué hace |
|---|---|---|
| `sitemap.xml` | `app/sitemap.ts` | Lista las páginas, los artículos publicados y los temas. Se actualiza en cada publicación. |
| `robots.txt` | `app/robots.ts` | Permite el sitio y bloquea el panel. |
| Título, descripción y canónica | `lib/seo.ts` | Una función (`metadatos`) que usa cada página. |
| Tarjeta al compartir | `app/opengraph-image.tsx` | Imagen con la marca para WhatsApp, Instagram y X. |
| Datos estructurados | `lib/esquemas.ts` | Profesional, servicio, preguntas frecuentes y artículos, en formato schema.org. |
| Redirecciones 301 | `next.config.ts` | De las direcciones `.html` viejas a las nuevas. |

Las redirecciones:

| Dirección anterior | Dirección nueva |
|---|---|
| `/index.html` | `/` |
| `/servicios.html` | `/como-trabajo` |
| `/sobre-mi.html` | `/sobre-mi` |
| `/bibliografia.html` | `/articulos` |
| `/empleos.html` | `/` |
| `/admin.html` | `/` |

### El interruptor de indexación

En `lib/sitio.ts` está la línea `indexable: false`. Mientras siga en `false`:

- todas las páginas le dicen a Google que no las indexe,
- `robots.txt` bloquea el sitio completo,
- `sitemap.xml` sale vacío.

Así el sitio de prueba en Netlify no compite con psikumente.com. **Se cambia a `true` el mismo
día en que el dominio apunte al sitio nuevo**, no antes.

### El día del cambio de dominio (después de la fase 5)

1. **Netlify → Domain management → Add a domain** y escribe `psikumente.com`. Netlify muestra
   los registros DNS que necesita. Usa exactamente los valores que te muestre.
2. **Hostinger → Dominios → psikumente.com → DNS**: reemplaza el registro `A` de `@` y el
   `CNAME` de `www` por los de Netlify. **No toques los registros `MX` ni `TXT`**: son del correo.
3. Espera a que Netlify marque el dominio como verificado y emita el certificado HTTPS
   (de minutos a unas horas).
4. En `lib/sitio.ts` cambia `indexable: false` por `indexable: true`. Luego:

   ```powershell
   npm run build
   git add --all
   git commit -m "Activa la indexación"
   git push
   ```

5. Comprueba en el navegador: `https://psikumente.com/servicios.html` debe llevarte a
   `/como-trabajo`, y `https://psikumente.com/sitemap.xml` debe listar las páginas.
6. Agrega la nueva dirección en la GitHub App del panel (ver fase 3).
7. Cuando todo funcione, cancela el plan de alojamiento de Hostinger (no el dominio) y elimina
   el proyecto de Firebase y la cuenta de EmailJS del sitio anterior.

### Registrar el sitio en Google Search Console

Se hace después del paso 4 anterior.

1. Entra a https://search.google.com/search-console con **psicofabianluna97@gmail.com**.
2. **Agregar propiedad → Dominio** y escribe `psikumente.com`.
3. Google entrega un registro `TXT`. Cópialo en **Hostinger → DNS → Agregar registro**
   (tipo `TXT`, nombre `@`). Vuelve a Search Console y pulsa **Verificar**.
   - Alternativa sin DNS: elige "Prefijo de la URL", método "Etiqueta HTML", copia solo el
     código (lo que va dentro de `content="..."`) y pégalo en el panel, en
     **Ajustes del sitio → Código de verificación de Google Search Console**.
4. En el menú **Sitemaps**, escribe `sitemap.xml` y pulsa **Enviar**.
5. En **Inspección de URLs**, pega `https://psikumente.com/` y pulsa **Solicitar indexación**.
   Repite con `/algo-cambio` y `/como-trabajo`.

Google tarda entre unos días y unas semanas en reflejar los cambios. En **Páginas** verás cuáles
indexó y cuáles no, con el motivo.

### Revisar cómo se ve un enlace al compartirlo

Con el sitio corriendo (`npm run dev`), abre http://localhost:3000/opengraph-image para ver la
imagen. Para validar los datos estructurados de una página ya publicada:
https://search.google.com/test/rich-results

---

## Fase 5 — Agenda y formulario de contacto

El sitio no guarda datos de ninguna persona. Las reservas quedan en Google Calendar y los
mensajes del formulario llegan al Gmail de la consulta.

### 1. Crear la agenda de citas

1. Entra a https://calendar.google.com con **psicofabianluna97@gmail.com**.
2. **Crear → Agenda de citas**. Configura:
   - Título: por ejemplo, "Sesión de psicología en línea".
   - Duración: 50 minutos.
   - Tu disponibilidad semanal y el tiempo mínimo de anticipación para reservar.
   - En **Formulario de reserva**, agrega el **teléfono** como campo obligatorio.
   - En **Descripción**, escribe las instrucciones de pago: medio (Bold, Nequi o
     transferencia), valor, plazo antes de la sesión y a dónde enviar el comprobante.
     Agrega también: "Por favor, no escribas detalles de tu situación personal en la reserva".
3. Guarda. Luego pulsa **Compartir → Insertar en sitio web**. Google muestra un código que
   empieza por `<iframe src="https://calendar.google.com/calendar/appointments/schedules/...`.
   **Copia solo la dirección** que está entre las comillas de `src`.
4. Pégala en el panel: **Ajustes del sitio → Enlace de la agenda de Google Calendar**. Guarda
   y publica (`git add --all`, `git commit`, `git push`).

Con esa dirección, la agenda aparece dentro de `/agendar`. Si pegas el enlace corto
(`https://calendar.app.google/...`), también funciona, pero se abre en una pestaña nueva.
El sitio solo acepta direcciones de Google Calendar; cualquier otra se ignora.

La persona debe aceptar el aviso de privacidad antes de ver los horarios. Hasta ese momento,
su navegador no se conecta con Google.

### 2. Activar el formulario de contacto

En tu equipo (`npm run dev`) el formulario funciona en **modo de prueba**: no envía correos y
muestra el mensaje en la terminal. En el sitio publicado aparece "El formulario se habilita
pronto" hasta que configures las cuatro claves siguientes.

**a) Contraseña de aplicación de Gmail** (para que el sitio pueda enviarte el correo)

1. Entra a https://myaccount.google.com/security con la cuenta de la consulta.
2. Activa la **Verificación en dos pasos** si aún no lo está. Es obligatoria para el paso siguiente.
3. Abre https://myaccount.google.com/apppasswords, escribe el nombre "Web Psiku" y pulsa **Crear**.
4. Google muestra una clave de 16 letras. Cópiala: no se vuelve a mostrar.

Esa clave solo permite enviar correo. Si algún día sospechas que se filtró, la borras en esa
misma página y creas otra, sin cambiar tu contraseña de Google.

**b) Antispam Turnstile de Cloudflare** (gratuito)

1. Crea una cuenta en https://dash.cloudflare.com/sign-up con el correo de la consulta.
2. En el menú, entra a **Turnstile → Add widget**.
3. Nombre: "Psiku contacto". En **Hostnames** agrega la dirección de Netlify
   (por ejemplo `papaya-liger-2975d0.netlify.app`) y `psikumente.com`. Modo: **Managed**.
4. Al crear, Cloudflare entrega dos claves: **Site key** y **Secret key**.

**c) Guardar las claves en Netlify**

**Project configuration → Environment variables → Add a variable**, una por una:

| Nombre | Valor |
|---|---|
| `GMAIL_USUARIO` | `psicofabianluna97@gmail.com` |
| `GMAIL_CLAVE_APP` | La clave de 16 letras, sin espacios |
| `NEXT_PUBLIC_TURNSTILE_CLAVE_SITIO` | La *Site key* de Turnstile |
| `TURNSTILE_CLAVE_SECRETA` | La *Secret key* de Turnstile |

Luego: **Deploys → Trigger deploy → Deploy project**.

Estas claves no van en el código ni en GitHub. No las envíes por chat ni por correo.

**d) Probar**

Entra a `/contacto` en el sitio publicado, envía un mensaje de prueba y revisa que llegue a tu
Gmail con el asunto `[Web] Pregunta de ...`. Al pulsar **Responder**, la respuesta va directo
al correo de la persona.

**e) Etiqueta "Web" en Gmail (opcional)**

En Gmail: **Configuración → Filtros → Crear filtro**. En *Asunto* escribe `[Web]`, pulsa
**Crear filtro** y marca **Aplicar la etiqueta → Nueva etiqueta → Web**.

### Qué protege al formulario

- Solo acepta envíos hechos desde el propio sitio.
- Turnstile comprueba que quien escribe es una persona.
- Un campo trampa invisible descarta bots sencillos.
- Máximo 3 mensajes cada 10 minutos por dirección IP.
- El servidor valida cada campo; el mensaje tiene máximo 500 caracteres.
- El correo se envía como texto plano: nada de lo que escriba la persona se ejecuta.
- El sitio no guarda el mensaje ni lo escribe en sus registros.

### Política de contenido (CSP)

`next.config.ts` define qué puede cargar el navegador: el propio sitio, la agenda de Google y
Turnstile. Todo lo demás se bloquea. Si más adelante incrustas otro servicio, hay que
agregarlo ahí.
