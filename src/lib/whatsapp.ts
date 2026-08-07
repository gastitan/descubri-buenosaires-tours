export function whatsappLink(numero: string, mensaje?: string): string {
  const base = `https://wa.me/${numero}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

export function mensajeGenerico(marca: string): string {
  return `Hola! Quería más información sobre los recorridos de ${marca}.`;
}

export function mensajeTour(tour: { nombre: string; dia: string }): string {
  return `Hola! Quería consultar por la visita guiada de ${tour.nombre} del día ${tour.dia}.`;
}
