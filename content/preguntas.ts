// Preguntas frecuentes de /como-trabajo.
// El contenido vive en content/preguntas.json y se edita desde el panel /admin.
// En la fase 4 se publican también como datos estructurados para Google (FAQPage).
import datos from "./preguntas.json";

export type Pregunta = { pregunta: string; respuesta: string };

export const preguntas: Pregunta[] = datos.items;
