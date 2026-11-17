import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variante?: "principal" | "secundario";
};

// Un solo componente de botón para todo el sitio.
// En la fase 6 aquí se registra el clic en Analytics (clic_agendar).
export function Boton({ href, children, variante = "principal" }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-[3px] px-5 py-3 text-base font-medium transition-colors";
  const estilos =
    variante === "principal"
      ? "bg-marino text-blanco hover:bg-marino-hondo"
      : "border border-marino/30 text-marino hover:border-marino hover:bg-blanco";

  return (
    <Link href={href} className={`${base} ${estilos}`}>
      {children}
    </Link>
  );
}
