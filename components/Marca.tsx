import Link from "next/link";

// Monograma PK: círculo marino con aro dorado, igual que el logo original.
export function Monograma({ tamano = 36 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="32" fill="var(--marino)" />
      <circle cx="32" cy="32" r="28.5" fill="none" stroke="var(--oro)" strokeWidth="1.6" />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontFamily="var(--font-titulos), Georgia, serif"
        fontWeight="700"
        fontSize="24"
        fill="#ffffff"
        letterSpacing="0.5"
      >
        PK
      </text>
    </svg>
  );
}

export function Marca() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Psiku · MenteClara, ir al inicio">
      <Monograma />
      <span className="flex flex-col leading-tight">
        <span className="font-titulos text-lg text-marino-hondo">Psiku</span>
        <span className="text-xs text-tenue">MenteClara</span>
      </span>
    </Link>
  );
}
