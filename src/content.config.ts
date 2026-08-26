import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const singleton = (id: string) => (text: string) => ({ [id]: JSON.parse(text) });

const NOMBRE_ARCHIVO = /^[a-z0-9-]+\.(jpg|jpeg|png|webp)$/;
const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;

const diaSchema = z.enum(['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']);
const dificultadSchema = z.enum(['fácil', 'moderada', 'difícil']);
const modalidadSchema = z.enum(['vehiculo', 'a-pie', 'mixta']);

const tours = defineCollection({
  loader: file('src/content/tours.json'),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    nombre: z.string().min(1),
    titulo: z.string().min(1),
    dia: diaSchema,
    hora: z.string().regex(HORA),
    duracion: z.string().min(1),
    puntoEncuentro: z.string().min(1).nullable(),
    precio: z.string().min(1).nullable(),
    descripcionCorta: z.string().min(1).max(220),
    descripcionLarga: z.string().min(1),
    destacados: z.array(z.string().min(1)).min(1),
    incluye: z.array(z.string().min(1)).min(1),
    noIncluye: z.array(z.string().min(1)),
    queLlevar: z.array(z.string().min(1)).min(1),
    dificultad: dificultadSchema,
    imagen: z.string().regex(NOMBRE_ARCHIVO),
    imagenAlt: z.string().min(1),
    pendienteRevision: z.boolean().default(false),
  }),
});

const site = defineCollection({
  loader: file('src/content/site.json', { parser: singleton('site') }),
  schema: z.object({
    marca: z.object({
      nombre: z.string().min(1),
      responsable: z.string().min(1),
      lema: z.string().min(1),
    }),
    contacto: z.object({
      whatsapp: z.object({
        numero: z.string().regex(/^\d{10,15}$/),
        numeroVisible: z.string().min(1),
      }),
      email: z.string().email().nullable(),
    }),
    redes: z.object({
      instagram: z.object({ usuario: z.string().min(1), url: z.string().url() }),
      facebook: z.object({ nombre: z.string().min(1), url: z.string().url().nullable() }),
    }),
    horarioAtencion: z.object({
      texto: z.string().min(1),
      desde: z.string().regex(HORA),
      hasta: z.string().regex(HORA),
    }),
    dominio: z.string().min(1),
  }),
});

const sobre = defineCollection({
  loader: file('src/content/sobre.json', { parser: singleton('sobre') }),
  schema: z.object({
    nombre: z.string().min(1),
    credencial: z.string().min(1),
    parrafos: z.array(z.string().min(1)).min(1),
    foto: z.string().regex(NOMBRE_ARCHIVO),
    fotoAlt: z.string().min(1),
    pendienteRevision: z.boolean().default(false),
  }),
});

const politicas = defineCollection({
  loader: file('src/content/politicas.json', { parser: singleton('politicas') }),
  schema: z.object({
    reprogramacion: z.string().min(1),
    clima: z.string().min(1),
    cancelacion: z.string().min(1),
    seguridad: z.string().min(1),
    mediosDePago: z.array(z.string().min(1)).min(1),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq.json', { parser: singleton('faq') }),
  schema: z.object({
    preguntas: z
      .array(
        z.object({
          pregunta: z.string().min(1),
          respuesta: z.string().min(1),
        })
      )
      .min(1),
  }),
});

const servicios = defineCollection({
  loader: file('src/content/servicios.json', { parser: singleton('servicios') }),
  schema: z.object({
    items: z
      .array(
        z.object({
          slug: z.string().regex(/^[a-z0-9-]+$/),
          nombre: z.string().min(1),
          descripcion: z.string().min(1),
        })
      )
      .min(1),
  }),
});

const salidasEspeciales = defineCollection({
  loader: file('src/content/salidas-especiales.json'),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    nombre: z.string().min(1),
    titulo: z.string().min(1),
    modalidad: modalidadSchema,
    // ISO con offset explícito (no z.coerce.date()): el instante queda absoluto
    // sin importar la timezone de la máquina que hace el build (Cloudflare = UTC).
    fechas: z
      .array(
        z.object({
          inicio: z.string().datetime({ offset: true }),
          nota: z.string().min(1).nullable().default(null),
        })
      )
      .min(1),
    duracion: z.string().min(1),
    barrios: z.array(z.string().min(1)).min(1),
    finalizaEn: z.string().min(1).nullable(),
    puntosEncuentro: z.string().min(1).nullable(),
    precio: z.string().min(1).nullable(),
    descripcionCorta: z.string().min(1).max(220),
    descripcionLarga: z.string().min(1),
    destacados: z.array(z.string().min(1)).min(1),
    incluye: z.array(z.string().min(1)).min(1),
    noIncluye: z.array(z.string().min(1)),
    imagen: z.string().regex(NOMBRE_ARCHIVO),
    imagenAlt: z.string().min(1),
    ogImagen: z.string().regex(NOMBRE_ARCHIVO).nullable().default(null),
    flyer: z.string().regex(NOMBRE_ARCHIVO).nullable().default(null),
    pendienteRevision: z.boolean().default(false),
  }),
});

export const collections = { site, sobre, politicas, faq, servicios, tours, salidasEspeciales };
