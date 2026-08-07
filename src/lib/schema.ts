import type { CollectionEntry } from 'astro:content';
import type { getSiteData } from './content';

type Site = Awaited<ReturnType<typeof getSiteData>>;
type Tour = CollectionEntry<'tours'>['data'];

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

export function buildLocalBusinessSchema(site: Site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://${site.dominio}/#negocio`,
    name: site.marca.nombre,
    description: site.marca.lema,
    telephone: `+${site.contacto.whatsapp.numero}`,
    url: `https://${site.dominio}/`,
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
