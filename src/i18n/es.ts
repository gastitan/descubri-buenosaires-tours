/**
 * Microcopy fija de la interfaz (no es contenido de negocio: precios, textos de
 * tour, políticas, etc. viven en src/content/). Se centraliza acá para que agregar
 * en.ts/pt.ts el día de mañana sea aditivo, sin tener que rastrear literales
 * dispersos por los componentes.
 */
/** Primera letra en mayúscula, sin tocar el resto — para labels aislados (día, fecha), nunca CSS `capitalize`. */
export const capitalizar = (texto: string): string => `${texto.charAt(0).toUpperCase()}${texto.slice(1)}`;

/** Hora tal como se guarda ("HH:MM"): único punto de cambio si el criterio cambia o se suma inglés. */
export const formatHora = (hora: string): string => hora;

/** Arma "2 h", "1 h 30 min" o "1 h 30 min a 2 h" a partir de minutos. */
export function formatDuracion(min: number, max?: number): string {
  const texto = (totalMin: number) => {
    const horas = Math.floor(totalMin / 60);
    const minutos = totalMin % 60;
    if (horas === 0) return `${minutos} min`;
    if (minutos === 0) return `${horas} h`;
    return `${horas} h ${minutos} min`;
  };
  return max !== undefined && max !== min ? `${texto(min)} a ${texto(max)}` : texto(min);
}

/** "Miércoles · 11:00": día capitalizado como label aislado, separador centralizado acá. */
export function formatDiaHora(dia: string, hora: string): string {
  return `${capitalizar(dia)} · ${formatHora(hora)}`;
}

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
  salidas: {
    eyebrow: 'Próxima salida especial',
    tituloSeccionHome: 'Salida especial',
    inicioDelTour: 'Inicio del tour',
    sinProximaFecha: 'Estamos definiendo la próxima salida — escribinos y te avisamos.',
    sobreElRecorrido: 'Sobre este recorrido',
    destacados: 'Destacados',
    recorrido: 'Recorrido',
    finalizamosEn: 'Finalizamos en',
    duracion: 'Duración',
    modalidad: 'Modalidad',
    modalidadValores: {
      vehiculo: 'En vehículo',
      'a-pie': 'A pie',
      mixta: 'A pie y en vehículo',
    },
    puntoDeEncuentro: 'Punto de encuentro',
    puntoAConfirmar: 'Los puntos de encuentro se confirman al reservar.',
    precio: 'Precio',
    incluye: 'Incluye',
    noIncluye: 'No incluye',
    proximasFechasTitulo: 'Próximas fechas',
    ctaFinalTexto: 'Escribinos y coordinamos los detalles.',
    descargarFlyer: 'Descargar el flyer',
    verDetalle: 'Ver el recorrido completo →',
  },
  error404: {
    titulo: 'No encontramos esta página',
    volver: 'Volver al inicio',
  },
} as const;
