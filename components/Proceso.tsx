// Es una secuencia real, por eso lleva números.
const pasos = [
  {
    titulo: "Agendas la primera sesión",
    texto: "Eliges un horario en la agenda. Te llega la confirmación con el enlace de la videollamada y las instrucciones de pago.",
  },
  {
    titulo: "Hablamos de qué te trae",
    texto: "En la primera sesión revisamos qué ha cambiado, desde cuándo y qué quieres que sea distinto. También es tu momento para decidir si te sientes cómodo con el proceso.",
  },
  {
    titulo: "Trabajamos con objetivos claros",
    texto: "Acordamos la frecuencia y revisamos juntos, cada cierto tiempo, si el proceso te está sirviendo.",
  },
];

export function Proceso() {
  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {pasos.map((paso, i) => (
        <li key={paso.titulo} className="border-t-2 border-marino pt-5">
          <span className="font-titulos text-3xl text-oro">{i + 1}</span>
          <h3 className="mt-2 text-xl text-marino-hondo">{paso.titulo}</h3>
          <p className="mt-2 text-tenue">{paso.texto}</p>
        </li>
      ))}
    </ol>
  );
}
