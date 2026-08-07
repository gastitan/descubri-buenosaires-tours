# Brief: sitio web de Descubrí Buenos Aires Tours

> **Cómo usar este archivo:** guardalo como `BRIEF.md` en la raíz del repo vacío y arrancá Claude Code ahí con algo como:
> *"Leé BRIEF.md y armá el sitio completo siguiendo todo lo que dice. Antes de escribir código, mostrame el plan de diseño (paleta, tipografías, layout) y la estructura de archivos para que la valide."*
>
> Todo lo que está marcado con `TODO` son datos que todavía no tengo. Dejalos como placeholders visibles, no los inventes.

---

## 1. Contexto

Vanesa Gercehegushian es Licenciada en Turismo y guía local en la Ciudad de Buenos Aires. Trabaja sola, bajo el nombre comercial **Descubrí Buenos Aires Tours**. Hoy toda su operación pasa por WhatsApp e Instagram; este es su primer sitio web.

Ofrece **siete visitas guiadas a pie con agenda fija semanal** más servicios a medida (privados, educativos, empresas, city tours).

**El trabajo que tiene que hacer el sitio, en orden:**

1. Que un turista entienda en 10 segundos qué se ofrece y confíe en que es real.
2. Que abra WhatsApp con un mensaje ya escrito.
3. Que si no está listo para escribir, se lleve la agenda semanal en la cabeza o siga la cuenta de Instagram.

Todo lo demás es secundario. **La métrica única es el clic a WhatsApp.**

**El público:** turistas nacionales e internacionales de habla hispana, mayormente en el celular, muchos ya estando en Buenos Aires con poco tiempo para decidir. También instituciones educativas y empresas, pero ese es un canal minoritario.

---

## 2. Stack y restricciones — no negociables

- **Astro** con **Tailwind CSS**. Sitio 100% estático.
- **Cero JavaScript en el cliente** salvo que sea imprescindible. Sin framework de UI, sin React, sin hidratación. Si algo se puede resolver con CSS, se resuelve con CSS.
- **Sin CMS, sin base de datos, sin backend.**
- Deploy en **Cloudflare Pages** desde el repo de Git. Incluí la configuración necesaria.
- Español rioplatense únicamente. El sitio se va a traducir a inglés y portugués más adelante: **estructurá los textos para que agregar idiomas después no obligue a rehacer nada**, pero no armes el multiidioma ahora.
- Sin dependencias innecesarias. Cada paquete que agregues tiene que justificarse.
- El dominio es `descubribuenosairestours.com.ar` y ya está comprado.

---

## 3. Arquitectura de contenido — la parte más importante

Este es el requisito central del proyecto. **Ningún texto, precio, horario, teléfono ni URL puede estar hardcodeado en un componente.** El dueño del sitio no soy yo ni es Vanesa: es un puñado de archivos de datos que un no-programador podría casi leer.

Estructura esperada:

```
src/content/
  site.json          # marca, lema, contacto, redes, horarios de atención
  tours.json         # los 7 recorridos de agenda fija
  servicios.json     # privados, educativos, empresas, city tours
  faq.json           # preguntas frecuentes
  politicas.json     # cancelación, lluvia, seguridad, medios de pago
  sobre.json         # texto de "sobre mí"
```

Reglas:

- El número de WhatsApp aparece en muchos lugares del sitio. **Se declara una sola vez en `site.json`** y todo lo demás lo deriva.
- Agregar un tour nuevo = agregar un objeto a `tours.json`. Nada más. Ninguna página nueva, ningún componente nuevo, ninguna ruta que registrar.
- Cambiar un horario = editar un campo.
- Usá **Astro Content Collections con schemas de Zod** para que un JSON mal escrito rompa el build en vez de romper el sitio en producción. Esto importa: los edito yo, desde el celular, apurado.
- Las páginas de cada tour se generan dinámicamente desde `tours.json` con `getStaticPaths`.

Schema de cada tour:

```json
{
  "slug": "la-boca",
  "nombre": "La Boca",
  "titulo": "...",
  "dia": "miércoles",
  "hora": "11:00",
  "duracion": "1h 30min a 2h",
  "puntoEncuentro": null,
  "precio": null,
  "descripcionCorta": "...",
  "descripcionLarga": "...",
  "destacados": ["...", "..."],
  "incluye": [...],
  "noIncluye": [...],
  "queLlevar": [...],
  "dificultad": "fácil",
  "imagen": "/img/tours/la-boca.jpg",
  "imagenAlt": "..."
}
```

Cuando `puntoEncuentro` o `precio` sean `null`, la UI tiene que resolverlo con elegancia: "Punto de encuentro a confirmar al reservar", "Consultanos el valor". No dejes campos vacíos ni renderices `null`.

---

## 4. Dirección de diseño

**Paleta base pedida por la clienta: azul, amarillo y blanco.**

Una advertencia concreta: azul y amarillo saturados, juntos, en un sitio que habla de La Boca, se leen como los colores de Boca Juniors. Eso no es lo que queremos. Resolvelo eligiendo azules y amarillos que no sean los del club: un azul profundo tirando a tinta o noche antes que un azul primario, y un amarillo cálido, apagado, tipo ocre o mostaza claro, no un amarillo señal. Definí 4–6 hex nombrados y justificá cada uno.

**Referencias que le gustan** (según sus propias palabras): Free Tour Buenos Aires por la navegación simple y la confianza que transmite; Turismo Buenos Aires por la calidad de las fotos; Civitatis por lo bien organizada que está la información de cada actividad.

**Qué NO quiere:** páginas recargadas, mucha información amontonada en una sola pantalla, tipografías chicas, exceso de texto.

**Tres palabras que eligió para la sensación:** cercanía, confianza, calidez.

**Y el pedido explícito:** *"una página donde las imágenes sean protagonistas"*.

Notas de dirección:

- La foto manda. Diseñá alrededor de las imágenes, no las metas en huecos que sobraron.
- Trabajá la tipografía con intención: una display con carácter usada con moderación y una de texto que aguante párrafos en mobile. Nada de la misma pareja de fuentes que usarías en cualquier landing.
- Buscá un elemento distintivo del que el sitio se acuerde — algo que salga del mundo de la caminata urbana porteña. Una sola cosa memorable, todo lo demás disciplinado y callado.
- Evitá los defaults de sitio generado: fondo crema con serif de alto contraste y acento terracota, gradientes decorativos, tarjetas con sombra genérica, numeritos 01/02/03 sobre contenido que no es una secuencia.
- Movimiento: poco y con criterio. Un reveal suave al scroll está bien. Nada que llame la atención sobre sí mismo.
- **Mobile primero, de verdad.** La mayoría del tráfico va a ser gente parada en la calle con una mano ocupada.

Antes de codear, presentá el plan de diseño y esperá aprobación.

---

## 5. Estructura del sitio

**Home** (`/`)
- Hero con la foto más fuerte, el nombre de la marca y el lema *"Cada rincón tiene una historia"*. CTA de WhatsApp visible sin scrollear.
- **Agenda de la semana**: los 7 tours en formato calendario semanal. Esta es la sección diferencial del sitio y tiene que sentirse así — casi ningún guía independiente publica una grilla fija. Que se lea de un vistazo qué se puede hacer hoy y qué mañana.
- Grilla de los 7 recorridos con foto y descripción breve, enlazando a cada detalle.
- Bloque corto de "Sobre Vanesa" con foto real y su credencial de Licenciada en Turismo, enlazando a la página completa.
- Servicios a medida: privados, educativos, empresas, personalizados.
- FAQ (puede ser un extracto con enlace a la página completa).
- Footer con contacto, redes y horario de atención.

**Detalle de cada tour** (`/tours/[slug]`) — 7 páginas generadas
- Foto grande, día y horario destacados, duración, dificultad, qué incluye y qué no, qué llevar, punto de encuentro, CTA de WhatsApp con el nombre del tour precargado en el mensaje.
- Enlaces a los otros recorridos al pie.

**Sobre mí** (`/sobre-mi`) — historia, formación, por qué hace esto.

**Servicios a medida** (`/servicios`) — privados, educativos para escuelas y universidades, empresas, city tours, experiencias personalizadas.

**Preguntas frecuentes** (`/preguntas-frecuentes`) — las 10 preguntas completas más las políticas.

**Contacto** (`/contacto`) — WhatsApp primero y grande, Instagram y Facebook después, formulario al final. El orden importa: es la prioridad que ella misma definió.

Sin blog por ahora. **Dejá la estructura preparada** para agregar `/blog` después sin refactorizar.

---

## 6. WhatsApp: cómo tiene que funcionar

Es el canal principal. Tratalo como tal.

- Botón flotante persistente en mobile, siempre accesible.
- Todo enlace usa `https://wa.me/5491139251624?text=` con un mensaje **precargado y contextual**: desde la página de San Telmo, algo como *"Hola! Quería consultar por la visita guiada de San Telmo del sábado"*. Desde la home, un mensaje genérico.
- El mensaje precargado se arma desde los datos del tour, no se escribe a mano en cada página.
- Al lado del botón, el horario de atención (9:00 a 20:00, todos los días) para que nadie se frustre escribiendo a las 2 AM.

---

## 7. Contenido real

### Marca y contacto

| Campo | Valor |
|---|---|
| Nombre comercial | Descubrí Buenos Aires Tours |
| Responsable | Vanesa Gercehegushian, Licenciada en Turismo |
| Lema | Cada rincón tiene una historia |
| WhatsApp | +54 9 11 3925-1624 |
| Instagram | @descubribuenosaires.tours |
| Facebook | Descubrí Buenos Aires Tours |
| Mail | `TODO` |
| Horario de atención | Todos los días, 9:00 a 20:00 |
| Dominio | descubribuenosairestours.com.ar |

### Los siete recorridos

Todos comparten: duración 1h30–2h, grupos reducidos, disponibles todo el año, dificultad fácil, aptos para todas las edades. Punto de encuentro y precio: `TODO`.

| Slug | Nombre | Día | Hora |
|---|---|---|---|
| `la-boca` | La Boca | Miércoles | 11:00 |
| `puerto-madero` | Puerto Madero | Miércoles | 14:00 |
| `obelisco` | Obelisco y alrededores | Jueves | 14:00 |
| `palermo` | Palermo | Viernes | 11:00 |
| `recoleta` | Recoleta | Viernes | 14:00 |
| `san-telmo` | San Telmo | Sábado | 11:00 |
| `plaza-de-mayo` | Plaza de Mayo | Sábado | 14:00 |

**Sobre los textos de cada tour:** el material original que entregó la clienta describe los siete recorridos con prácticamente el mismo texto. Copiado así, Google los lee como contenido duplicado y ninguno posiciona. **Escribí una descripción propia y distinta para cada barrio**, de 2 a 4 párrafos, apoyándote en estos anclajes:

- **La Boca** — Caminito, la inmigración genovesa, los conventillos y las chapas pintadas, la Vuelta de Rocha y el Riachuelo.
- **Puerto Madero** — los docks de ladrillo reciclados, las grúas conservadas, el Puente de la Mujer, la Fragata Sarmiento, el contraste con la Reserva Ecológica.
- **Obelisco y alrededores** — la 9 de Julio, la avenida Corrientes y sus teatros, el eje cívico del centro, la vida nocturna del microcentro.
- **Palermo** — los Bosques y el Rosedal, Palermo Soho y Hollywood, el arte urbano, las casas bajas y los patios.
- **Recoleta** — el cementerio y sus bóvedas, la Basílica del Pilar, la arquitectura afrancesada, la Floralis Genérica.
- **San Telmo** — el empedrado, el Mercado, Plaza Dorrego, los anticuarios, el tango en la calle.
- **Plaza de Mayo** — la Casa Rosada, el Cabildo, la Catedral Metropolitana, los pañuelos pintados en el piso, doscientos años de historia política en una manzana.

Escribí en un registro cálido y concreto, sin adjetivos de folleto. Nada de "experiencia inolvidable" ni "sumergite en la magia de".

**Importante: estos textos son un borrador para que Vanesa revise.** Marcá con un comentario en el JSON que requieren su validación antes de publicar — ella conoce el recorrido real y yo no.

### Voz

Ella escribió todo el cuestionario en plural corporativo ("nuestros recorridos", "creemos"), pero trabaja sola y las palabras que eligió son cercanía y calidez. El plural las contradice.

**Resolución:** primera persona en la home y en "Sobre mí" (*"Soy Vanesa..."*). Plural solamente en las secciones dirigidas a empresas e instituciones educativas, donde el registro institucional tiene sentido. Mantené la consistencia dentro de cada página.

### Preguntas frecuentes

Estas son textuales de la clienta. Podés corregir puntuación y errores de tipeo, pero no reescribirlas ni cambiar lo que dicen.

1. **¿Cómo puedo reservar un recorrido?** Podés reservar escribiéndonos por WhatsApp o a través del formulario de contacto. Te responderemos a la brevedad para confirmar disponibilidad y brindarte toda la información necesaria.
2. **¿Es necesario reservar con anticipación?** Sí. Recomendamos reservar con anticipación para asegurar tu lugar, especialmente en fines de semana, feriados o fechas de alta demanda.
3. **¿Los recorridos se suspenden por lluvia?** Solo se suspenden o reprograman cuando las condiciones climáticas impiden realizar el recorrido de manera segura o cómoda. En ese caso nos comunicamos con todos los participantes para ofrecer una nueva fecha.
4. **¿Los recorridos son aptos para todas las edades?** Sí. Están pensados para que puedan disfrutarlos personas de todas las edades. Si algún participante tiene una necesidad especial, pedimos que nos lo informe al momento de la reserva.
5. **¿Cuánto duran las visitas guiadas?** Entre 1 hora y 30 minutos y 2 horas, dependiendo del ritmo del grupo y de las consultas que surjan durante la experiencia.
6. **¿Dónde comienza cada recorrido?** Cada visita tiene un punto de encuentro específico que se informa al confirmar la reserva. Elegimos lugares de fácil acceso y bien identificables.
7. **¿Qué incluye el recorrido?** La visita guiada, el acompañamiento de una guía local, explicaciones históricas, curiosidades, recomendaciones y la posibilidad de preguntar durante todo el recorrido.
8. **¿Qué no está incluido?** Traslados, comidas, bebidas y entradas a museos o espacios con costo adicional, salvo que se indique expresamente en un recorrido especial.
9. **¿Se pueden contratar recorridos privados?** Sí. Organizamos recorridos privados para parejas, familias, grupos de amigos, empresas, instituciones educativas y contingentes. También diseñamos experiencias personalizadas.
10. **¿Cómo puedo pagar?** Aceptamos efectivo, transferencia bancaria y Mercado Pago. Si necesitás otra modalidad, consultanos.

### Políticas

- **Reprogramación:** las reservas pueden reprogramarse avisando con al menos 24 horas de anticipación.
- **Clima:** ante lluvia intensa, alertas meteorológicas o condiciones que afecten el normal desarrollo de la actividad, el recorrido puede reprogramarse sin costo adicional.
- **Cancelación:** si la cancelación es del pasajero fuera del plazo establecido, la seña puede no reintegrarse. Cada situación se evalúa buscando la mejor solución para ambas partes.
- **Seguridad:** los recorridos respetan las normas de seguridad y circulación de la Ciudad. Se pide a cada participante seguir las indicaciones de la guía y avisar previamente cualquier condición física o necesidad especial.
- **Medios de pago:** efectivo en pesos, transferencia bancaria y Mercado Pago. En algunos casos dólares, coordinándolo previamente.

---

## 8. Imágenes

**Todavía no hay ninguna foto real.** Armá el sitio con placeholders que dejen los huecos bien visibles — quiero que se note dónde falta material.

- Convención: `/public/img/tours/[slug].jpg`, `/public/img/vanesa.jpg`, `/public/img/hero.jpg`.
- Usá el componente `<Image>` de Astro con formatos modernos, `lazy` en todo lo que esté bajo el pliegue y dimensiones explícitas para que no haya saltos de layout.
- Cada imagen necesita `alt` descriptivo real, tomado del campo `imagenAlt` de los datos.
- No generes imágenes ni uses fotos de stock de bancos gratuitos: son recorridos reales, van fotos reales.

---

## 9. SEO y performance

- Metadatos por página desde los datos, no repetidos a mano.
- **Schema.org**: `TouristTrip` para cada recorrido, `LocalBusiness` para la marca. Esto importa de verdad para un negocio local.
- Open Graph y Twitter Card, para que compartir por WhatsApp muestre foto y título.
- `sitemap.xml` y `robots.txt`.
- URLs en español, sin mayúsculas ni caracteres raros.
- Objetivo: Lighthouse arriba de 95 en las cuatro categorías en mobile. Con Astro estático y cero JS es alcanzable; si no llega, algo se hizo mal.
- Fuentes locales o con `font-display: swap`. Nada que bloquee el render.

---

## 10. Accesibilidad

- Contraste AA como piso, verificado — cuidado especial con el amarillo sobre blanco.
- Foco de teclado visible en todos los elementos interactivos.
- `prefers-reduced-motion` respetado.
- HTML semántico, jerarquía de encabezados correcta, navegación operable con teclado.
- Tipografía cómoda: ella pidió explícitamente que no sea chica.

---

## 11. Qué NO hacer

- **No inventes testimonios, reseñas, cantidad de clientes, años de experiencia ni ratings.** Todavía no hay ninguno. Dejá la sección preparada en el código, comentada o vacía, lista para cuando lleguen.
- No agregues carrito, reservas online ni pasarela de pago. Se decidió explícitamente que no.
- No pongas contadores de visitas, chat widgets de terceros, popups de newsletter al entrar, ni banners de cookies si no hay cookies.
- No metas Google Analytics. Si hace falta medir, Cloudflare Web Analytics, que no usa cookies.
- No inventes direcciones, precios ni puntos de encuentro. Si el dato no está, mostrá el fallback.
- No uses librerías de componentes ni templates de terceros.

---

## 12. Criterios de aceptación

- [ ] Agregar un tour nuevo se resuelve editando únicamente `tours.json`.
- [ ] Cambiar el número de WhatsApp se hace en un solo lugar y se propaga a todo el sitio.
- [ ] Un JSON con un campo faltante rompe el build con un mensaje claro, no en producción.
- [ ] Cero JavaScript en el cliente, salvo justificación escrita en el README.
- [ ] Lighthouse mobile > 95 en las cuatro categorías.
- [ ] El sitio se ve y funciona bien en un teléfono de 360px de ancho.
- [ ] Los siete tours tienen textos genuinamente distintos entre sí.
- [ ] Los placeholders de imagen y los campos `TODO` son visibles, no disimulados.
- [ ] `README.md` con instrucciones para editar contenido escritas para alguien que no programa.

---

## 13. Pendientes conocidos

Estos datos no existen todavía. Dejalos como `TODO` visible:

- Fotos reales de los siete barrios, de Vanesa guiando y de grupos.
- Logo en PNG con fondo transparente o SVG.
- Casilla de mail.
- Punto de encuentro de cada recorrido.
- Precios, aunque sea un "desde".
- Testimonios de clientes.
