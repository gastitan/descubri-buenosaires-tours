import type { CollectionEntry } from 'astro:content';
import type { getSiteData } from './content';
import { proximaFecha } from './salidas';

type Site = Awaited<ReturnType<typeof getSiteData>>;
type Tour = CollectionEntry<'tours'>['data'];
type SalidaEspecial = CollectionEntry<'salidasEspeciales'>['data'];

export function buildTouristTripSchema(tour: Tour, site: Site, urlAbsoluta: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.titulo,
    description: tour.descripcionCorta,
    url: urlAbsoluta,
    provider: {
      '@type': 'LocalBusiness',
      name: site.marca.nombre,
      telephone: `+${site.contacto.whatsapp.numero}`,
    },
    ...(tour.precio && {
      offers: { '@type': 'Offer', priceCurrency: 'ARS', description: tour.precio },
    }),
  };
}

export function buildEventoSchema(salida: SalidaEspecial, site: Site, urlAbsoluta: string) {
  const proxima = proximaFecha(salida.fechas);
  if (!proxima) return undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: salida.nombre,
    description: salida.descripcionCorta,
    startDate: proxima.inicio,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: urlAbsoluta,
    organizer: {
      '@type': 'Organization',
      name: site.marca.nombre,
      telephone: `+${site.contacto.whatsapp.numero}`,
    },
  };
}

export function buildBreadcrumbSchema(items: { nombre: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, indice) => ({
      '@type': 'ListItem',
      position: indice + 1,
      name: item.nombre,
      item: item.url,
    })),
  };
}

export function buildFaqPageSchema(preguntas: { pregunta: string; respuesta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
    })),
  };
}

export function buildLocalBusinessSchema(site: Site, logoUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://${site.dominio}/#negocio`,
    name: site.marca.nombre,
    description: site.marca.lema,
    telephone: `+${site.contacto.whatsapp.numero}`,
    url: `https://${site.dominio}/`,
    ...(logoUrl && { logo: logoUrl, image: logoUrl }),
    areaServed: 'Ciudad Autónoma de Buenos Aires, Argentina',
    sameAs: [site.redes.instagram.url, site.redes.facebook.url].filter(Boolean),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: site.horarioAtencion.desde,
      closes: site.horarioAtencion.hasta,
    },
  };
}
