import type { ImageMetadata } from 'astro';

const modulos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/img/**/*.{jpg,jpeg,png,webp}',
  { eager: true }
);

/**
 * Traduce el nombre de archivo declarado en el contenido (ej. "la-boca.jpg")
 * al asset real optimizable, según la carpeta que le corresponda.
 */
export function resolveImage(nombreArchivo: string, carpeta: 'tours' | 'salidas' | ''): ImageMetadata | undefined {
  const clave = carpeta
    ? `/src/assets/img/${carpeta}/${nombreArchivo}`
    : `/src/assets/img/${nombreArchivo}`;
  return modulos[clave]?.default;
}
