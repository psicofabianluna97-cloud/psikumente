// Preguntas frecuentes de /como-trabajo.
// En la fase 4 se publican también como datos estructurados para Google (FAQPage).

export type Pregunta = { pregunta: string; respuesta: string };

export const preguntas: Pregunta[] = [
  {
    pregunta: "¿Tengo que estar muy mal para ir a terapia?",
    respuesta:
      "No. La terapia también sirve cuando notas que algo de tu rutina cambió y quieres entender por qué. Mirarlo a tiempo suele ser más sencillo que esperar a que ocupe todo.",
  },
  {
    pregunta: "¿Necesito un diagnóstico para empezar?",
    respuesta:
      "No. Puedes llegar sin saber cómo nombrar lo que te pasa. En la primera sesión lo vamos entendiendo juntos.",
  },
  {
    pregunta: "¿La terapia virtual funciona igual que la presencial?",
    respuesta:
      "Para la mayoría de motivos de consulta, la evidencia muestra resultados comparables. Solo necesitas un lugar privado, buena conexión y audífonos.",
  },
  {
    pregunta: "¿Cuánto dura el proceso?",
    respuesta:
      "Depende de lo que te trae y de tus objetivos. Lo definimos al inicio y lo revisamos en el camino; no hay un número fijo de sesiones.",
  },
  {
    pregunta: "¿El psicólogo me puede formular medicamentos?",
    respuesta:
      "No. La formulación de medicamentos corresponde a psiquiatría o medicina. Si en algún momento lo considero útil, te lo diré y podemos coordinar con quien te atienda.",
  },
  {
    pregunta: "¿Qué pasa si no me siento cómodo después de algunas sesiones?",
    respuesta:
      "Es válido decirlo. La relación terapéutica es parte importante del proceso. Lo hablamos, y si no es el espacio adecuado para ti, te oriento sobre otras opciones.",
  },
  {
    pregunta: "¿Atiendes urgencias?",
    respuesta:
      "No. Si estás en crisis o sientes que puedes hacerte daño, llama a la línea 192 opción 4 o al 123, o acude a urgencias. Los números están al final de cada página.",
  },
];
