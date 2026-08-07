import { getCollection, getEntry } from 'astro:content';

export const getSiteData = async () => (await getEntry('site', 'site'))!.data;
export const getSobreData = async () => (await getEntry('sobre', 'sobre'))!.data;
export const getPoliticasData = async () => (await getEntry('politicas', 'politicas'))!.data;
export const getFaqData = async () => (await getEntry('faq', 'faq'))!.data.preguntas;
export const getServiciosData = async () => (await getEntry('servicios', 'servicios'))!.data.items;

const ORDEN_DIAS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

export async function getToursOrdenados() {
  const tours = await getCollection('tours');
  return tours.sort(
    (a, b) =>
      ORDEN_DIAS.indexOf(a.data.dia) - ORDEN_DIAS.indexOf(b.data.dia) ||
      a.data.hora.localeCompare(b.data.hora)
  );
}
