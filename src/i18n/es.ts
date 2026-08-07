/**
 * Microcopy fija de la interfaz (no es contenido de negocio: precios, textos de
 * tour, políticas, etc. viven en src/content/). Se centraliza acá para que agregar
 * en.ts/pt.ts el día de mañana sea aditivo, sin tener que rastrear literales
 * dispersos por los componentes.
 */
export const ui = {
  nav: {
    inicio: 'Inicio',
    tours: 'Recorridos',
    sobreMi: 'Sobre mí',
    servicios: 'Servicios',
    faq: 'Preguntas frecuentes',
    contacto: 'Contacto',
  },
  whatsapp: {
    ctaGenerico: 'Escribinos por WhatsApp',
    ctaTour: 'Reservar por WhatsApp',
    abrirWhatsapp: 'Abrir WhatsApp',
    horarioPrefijo: 'Atendemos',
  },
  tours: {
    agendaSemanal: 'Agenda de la semana',
    verRecorrido: 'Ver recorrido',
    volverARecorridos: 'Ver los demás recorridos',
    destacados: 'Destacados',
    incluye: 'Incluye',
    noIncluye: 'No incluye',
    queLlevar: 'Qué llevar',
    duracion: 'Duración',
    dificultad: 'Dificultad',
    puntoDeEncuentro: 'Punto de encuentro',
    precio: 'Precio',
  },
  servicios: {
    titulo: 'Servicios a medida',
  },
  faq: {
    titulo: 'Preguntas frecuentes',
    verTodas: 'Ver todas las preguntas',
  },
  sobreMi: {
    titulo: 'Sobre mí',
  },
  contacto: {
    titulo: 'Contacto',
    redes: 'Seguime en redes',
  },
  footer: {
    instagram: 'Seguinos en Instagram',
    facebook: 'Encontranos en Facebook',
  },
  media: {
    fotoPendiente: 'Foto pendiente',
  },
  error404: {
    titulo: 'No encontramos esta página',
    volver: 'Volver al inicio',
  },
} as const;
