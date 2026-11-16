import { Boton } from "@/components/Boton";

export default function NoEncontrada() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="text-5xl text-marino-hondo">Esta página no existe</h1>
      <p className="mt-6 text-lg text-tenue">
        Puede que el enlace haya cambiado. Desde aquí puedes volver al inicio o ver cómo trabajo.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Boton href="/">Ir al inicio</Boton>
        <Boton href="/como-trabajo" variante="secundario">
          Ver cómo trabajo
        </Boton>
      </div>
    </section>
  );
}
