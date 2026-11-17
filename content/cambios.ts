// Los seis cambios cotidianos que aparecen en el inicio y en /algo-cambio.
// "cambio": lo que se observa. "sostiene": lo que a veces lo mantiene.
// El contenido vive en content/cambios.json y se edita desde el panel /admin.
import datos from "./cambios.json";

export type Cambio = {
  tema: string;
  cambio: string;
  sostiene: string;
};

export const cambios: Cambio[] = datos.items;
