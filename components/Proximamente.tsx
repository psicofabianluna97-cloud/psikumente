import { Boton } from "@/components/Boton";

// Página temporal mientras se construyen la agenda y el formulario (fase 5).
export function Proximamente({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="text-5xl text-marino-hondo">{titulo}</h1>
      <p className="mt-6 text-lg text-tenue">{texto}</p>
      <div className="mt-10">
        <Boton href="/" variante="secundario">
          Volver al inicio
        </Boton>
      </div>
    </section>
  );
}
