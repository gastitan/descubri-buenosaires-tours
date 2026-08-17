/**
 * Microcopy fija de la interfaz (no es contenido de negocio: precios, textos de
 * tour, políticas, etc. viven en src/content/). Se centraliza acá para que agregar
 * en.ts/pt.ts el día de mañana sea aditivo, sin tener que rastrear literales
 * dispersos por los componentes.
 */
export const ui = {
  nav: {
    agenda: 'Agenda',
    tours: 'Recorridos',
    sobreMi: 'Sobre mí',
    servicios: 'Servicios',
    faq: 'FAQ',
    contacto: 'Contacto',
  },
  whatsapp: {
    ctaGenerico: 'Escribinos por WhatsApp',
    ctaTour: 'Reservar por WhatsApp',
    ctaReservar: 'Reservar por WhatsApp',
    abrirWhatsapp: 'Abrir WhatsApp',
    horarioPrefijo: 'Atendemos',
  },
  tours: {
    agendaSemanal: 'Agenda de la semana',
    proximasSalidas: 'Próximas salidas',
    porSemana: 'por semana',
    cadaUna: 'cada una',
    pedirOtraFecha: 'Pedir otra fecha →',
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
    eyebrowHome: 'Los siete recorridos',
    tituloHome: 'Uno por barrio, siempre el mismo día',
    subtituloHome: 'Todos a pie, en grupos chicos, con guía habilitada.',
    otroBarrioTitulo: '¿Otro día u otro barrio?',
    otroBarrioTexto: 'Armamos recorridos privados, educativos y para empresas.',
    pedirAMedida: 'Pedir a medida →',
  },
  servicios: {
    titulo: 'Servicios a medida',
  },
  faq: {
    titulo: 'Preguntas frecuentes',
    verTodas: 'Ver todas las preguntas',
    ctaTitulo: 'Escribinos y confirmamos tu lugar hoy',
  },
  sobreMi: {
    titulo: 'Sobre mí',
    eyebrowHome: 'Quién te guía',
    citaHome: 'Cada rincón tiene una historia, y me gusta contarla caminando.',
    linkHome: 'Sobre mí →',
  },
  hero: {
    eyebrow: 'Agenda fija · salidas todas las semanas',
    titulo: 'Elegí el día. Nos vemos en la esquina.',
    subtitulo: 'Siete recorridos a pie por Buenos Aires con guía habilitada, siempre el mismo día y horario. Cada rincón tiene una historia.',
    verRecorridos: 'Ver los recorridos',
    confianza: ['+800 recorridos realizados', 'Grupos chicos', 'Español e inglés'],
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
