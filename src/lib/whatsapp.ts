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

export function mensajeOtraFecha(): string {
  return 'Hola! Quería consultar por otra fecha u horario para un recorrido.';
}

export function mensajeAMedida(): string {
  return 'Hola! Quería consultar por un recorrido a medida (privado, educativo o para empresas).';
}

export function mensajeSalidaEspecial(nombre: string, fechaLegible: string | null): string {
  return fechaLegible
    ? `Hola! Quería consultar por el ${nombre} del ${fechaLegible}.`
    : `Hola! Quería consultar por el ${nombre} y saber cuándo es la próxima salida.`;
}
