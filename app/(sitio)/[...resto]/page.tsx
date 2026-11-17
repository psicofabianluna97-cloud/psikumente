import { notFound } from "next/navigation";

// Cualquier dirección que no exista muestra la página "no encontrada" del sitio.
export default function Resto() {
  notFound();
}
