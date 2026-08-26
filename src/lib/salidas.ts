import type { CollectionEntry } from 'astro:content';

type Fecha = CollectionEntry<'salidasEspeciales'>['data']['fechas'][number];
type SalidaEspecial = CollectionEntry<'salidasEspeciales'>['data'];

export function proximasFechas(fechas: Fecha[]): Fecha[] {
  const ahora = new Date();
  return fechas
    .filter((f) => new Date(f.inicio) > ahora)
    .sort((a, b) => new Date(a.inicio).getTime() - new Date(b.inicio).getTime());
}

export function proximaFecha(fechas: Fecha[]): Fecha | null {
  return proximasFechas(fechas)[0] ?? null;
}

export function formatearFecha(inicio: string, opts: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    ...opts,
  }).format(new Date(inicio));
}

export function hayProximaSalida(salida: SalidaEspecial): boolean {
  return proximasFechas(salida.fechas).length > 0;
}
