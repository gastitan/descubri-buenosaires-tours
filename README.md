# Descubrí Buenos Aires Tours — sitio web

Este archivo tiene dos partes:

1. **Cómo editar el contenido del sitio** (para Vanesa, sin tocar código).
2. **Notas técnicas** (para quien mantenga el proyecto).

---

## 1. Cómo editar el contenido (sin programar)

Todo el texto, los precios, los horarios y los teléfonos del sitio salen de **6 archivos de datos** que están en la carpeta `src/content/`. Son archivos de texto con formato JSON — se pueden editar con cualquier editor de texto (incluso desde el celular), pero hay que respetar el formato: comillas, comas y llaves `{ }` tal como están. Si un archivo queda mal escrito, el sitio **no se va a publicar** hasta que se corrija — es una protección a propósito, para que un error de tipeo no rompa el sitio ya publicado.

Después de editar cualquier archivo, hay que avisar para que se genere una nueva versión del sitio (o, si ya está configurado el publicado automático, alcanza con guardar el cambio en el repositorio).

### `src/content/site.json` — marca, WhatsApp, redes, horario

Este es el archivo más importante: **el número de WhatsApp se edita una sola vez acá** (campo `contacto.whatsapp.numero`, sin el signo `+` ni espacios, ej. `"5491139251624"`) y se actualiza automáticamente en todo el sitio: el botón flotante, el botón de cada tour, el pie de página y la página de contacto.

También vive acá: el lema, el link de Instagram, el link de Facebook (hoy en `null` porque falta), el mail (hoy en `null` porque falta) y el horario de atención.

### `src/content/tours.json` — los siete recorridos

Es una lista con un bloque por recorrido. **Para agregar un octavo recorrido, se copia un bloque entero, se pega al final de la lista (con una coma antes) y se completan sus datos** — no hace falta tocar ninguna otra parte del sitio, la página nueva se genera sola.

Campos que probablemente edites seguido:

- `dia` / `hora`: cuándo se hace el recorrido.
- `puntoEncuentro`: hoy está en `null` en los siete (todavía no hay dato). Cuando lo tengas, reemplazá `null` por el texto entre comillas, ej. `"Puerta de la estación Constitución"`. Mientras esté en `null`, el sitio muestra automáticamente "Punto de encuentro a confirmar al reservar".
- `precio`: mismo criterio que el punto de encuentro. Mientras esté en `null`, se muestra "Consultanos el valor".
- `imagen`: **solo el nombre del archivo de foto**, sin ninguna ruta ni barra — ej. `"la-boca.jpg"`. Ver la sección de fotos más abajo.
- `pendienteRevision`: los textos largos de descripción (`descripcionLarga`) son un borrador que escribí yo sin conocer el recorrido real. Dejé `"pendienteRevision": true` en los siete como recordatorio de que **hay que revisarlos y corregirlos** antes de dar el sitio por terminado. Una vez que los revises, cambiá ese campo a `false`.

### `src/content/servicios.json`, `faq.json`, `politicas.json`, `sobre.json`

Mismo criterio: se edita el texto entre comillas, sin tocar las comillas ni las comas. En `sobre.json`, los dos párrafos que dicen "TODO (Vanesa): ..." son un espacio reservado para que cuentes tu propia historia — reemplazá ese texto por el que quieras publicar.

### Fotos

Todavía no hay ninguna foto real cargada — el sitio muestra un recuadro con rayas y el texto "Foto pendiente" en su lugar, a propósito, para que sea fácil ver dónde falta cada una.

Cuando tengas las fotos:

1. Guardalas en `src/assets/img/` (las de cada recorrido, dentro de `src/assets/img/tours/`).
2. Usá exactamente el mismo nombre de archivo que ya está escrito en el JSON correspondiente (por ejemplo, si `tours.json` dice `"imagen": "la-boca.jpg"`, el archivo tiene que llamarse `la-boca.jpg`).
3. No hace falta cambiar nada más — el recuadro de "Foto pendiente" desaparece solo y aparece la foto real, ya optimizada.

Fotos que faltan: `hero.jpg` (portada), `vanesa.jpg` (Sobre mí) y una por cada uno de los siete recorridos.

### Logo

Todavía no hay logo. Mientras tanto, el sitio muestra el nombre de la marca en texto. Cuando tengas el archivo (PNG con fondo transparente o SVG), pedí que lo incorporen al encabezado.

---

## 2. Notas técnicas

### Stack

- [Astro](https://astro.build) + Tailwind CSS v4, sitio 100% estático, sin backend ni base de datos.
- Contenido validado con [Zod](https://zod.dev) a través de Astro Content Collections (`src/content.config.ts`) — un JSON mal formado rompe `npm run build` con un error legible, no rompe el sitio publicado.
- Cero JavaScript de cliente. Las únicas interacciones (menú mobile, acordeón de FAQ) usan `<details>/<summary>` nativo de HTML, sin scripts. Las únicas etiquetas `<script>` del sitio son bloques `application/ld+json` (datos estructurados para buscadores) — el navegador no las ejecuta como código, así que no cuentan como JavaScript de cliente.
- Fuentes self-hosteadas vía `@fontsource-variable` (Fraunces "soft" para títulos, Public Sans para texto), sin CDN externo.

### Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor local de desarrollo
npm run build     # build de producción en /dist — falla si algún JSON no cumple su schema
npm run preview   # sirve /dist localmente para revisar el build antes de publicar
```

### Deploy en Cloudflare Pages

El sitio es estático: build command `npm run build` (o `astro build`), output directory `dist`. No se necesita ningún adapter de Astro (no hay SSR ni funciones).

Dos formas de conectar el proyecto a Cloudflare Pages:

- **Vía Git**: subir este repositorio a GitHub o GitLab y conectarlo desde el dashboard de Cloudflare Pages (tiene un preset "Astro" que completa los campos de build solo). Cada `git push` genera un deploy nuevo.
- **Vía Wrangler CLI**, sin necesidad de un repo remoto: `npx wrangler pages deploy dist` (requiere iniciar sesión en una cuenta de Cloudflare).

El dominio `descubribuenosairestours.com.ar` se apunta desde el dashboard de Cloudflare Pages una vez que el proyecto esté creado.

### Agregar Web3Forms al formulario de contacto (pendiente, a futuro)

Hoy `/contacto` no tiene formulario — solo WhatsApp, Instagram y Facebook, porque todavía no hay casilla de mail y el sitio no tiene backend propio. Cuando exista un mail:

1. Crear una cuenta gratuita en [web3forms.com](https://web3forms.com) con ese mail y obtener el `access_key`.
2. Agregar un `<form>` al final de `src/pages/contacto.astro` que haga `POST` a `https://api.web3forms.com/submit` con el `access_key` como campo oculto — es HTML puro, no requiere JavaScript ni backend propio.
3. Completar `contacto.email` en `site.json` (hoy está en `null`).

### Preparar inglés/portugués (a futuro, todavía no implementado)

La arquitectura ya está pensada para esto, pero el multiidioma **no** está armado todavía (a propósito, según el brief original). Cuando llegue el momento:

- Duplicar cada JSON de `src/content/` por idioma (`tours.json` → `tours.en.json`, `tours.pt.json`, mismo schema) y activar el [i18n routing nativo de Astro](https://docs.astro.build/en/guides/internationalization/) en `astro.config.mjs`.
- La microcopy fija de la interfaz (labels de botones, menú) ya está centralizada en `src/i18n/es.ts` — agregar `en.ts`/`pt.ts` con las mismas claves es directo, sin tener que rastrear texto suelto en los componentes.

### Testimonios

Todavía no hay ninguno (no se inventaron, a propósito). Hay un comentario en `src/pages/index.astro` marcando dónde iría esa sección. Cuando existan reseñas reales, se agrega una colección `testimonios` con el mismo patrón que `tours` y un componente para mostrarla.

### Cosas marcadas como `TODO`

Buscá la palabra `TODO` en `src/content/*.json` y en este README para encontrar todo lo que falta: mail de contacto, URL de Facebook, punto de encuentro y precio de cada recorrido, fotos, logo, revisión de los textos de los siete recorridos, y la historia de "Sobre mí".
