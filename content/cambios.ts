// Los seis cambios cotidianos que aparecen en el inicio y en /algo-cambio.
// "cambio": lo que se observa. "sostiene": lo que a veces lo mantiene.
// En la fase 3 este contenido pasa a editarse desde el panel.

export type Cambio = {
  tema: string;
  cambio: string;
  sostiene: string;
};

export const cambios: Cambio[] = [
  {
    tema: "Sueño",
    cambio: "Te acuestas cada vez más tarde, aunque el cuerpo pida descanso.",
    sostiene: "La noche es el único rato sin exigencias. Alargarla aplaza el día siguiente.",
  },
  {
    tema: "Planes",
    cambio: "Cancelas planes que antes esperabas.",
    sostiene: "Quedarte en casa alivia, por un momento, el esfuerzo de estar bien frente a otros.",
  },
  {
    tema: "Postergación",
    cambio: "Aplazas lo importante y llenas el día con lo urgente, o con nada.",
    sostiene: "Postergar baja la tensión de enfrentarte a algo que podría salir mal.",
  },
  {
    tema: "Contacto",
    cambio: "Respondes los mensajes cada vez más tarde, o dejas de responder.",
    sostiene: "Contestar implica contar cómo estás, y eso hoy cuesta.",
  },
  {
    tema: "Pantallas",
    cambio: "Pasas horas en el celular sin buscar nada en particular.",
    sostiene: "Llenar cada pausa evita quedarte a solas con lo que sientes.",
  },
  {
    tema: "Consumo",
    cambio: "Bebes, fumas o consumes más que antes para poder relajarte o dormir.",
    sostiene: "Apaga la tensión rápido, y justamente por eso se vuelve a buscar.",
  },
];
