/** Grafismos da marca: faixa de losangos, divisor à mão, e overlay de grão. */

export function FaixaLosangos({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1000 30" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        <path d="M0 15 H1000" />
      </g>
      <g fill="currentColor">
        <path d="M120 6 l8 9 l-8 9 l-8 -9 z" />
        <path d="M260 6 l8 9 l-8 9 l-8 -9 z" />
        <path d="M400 6 l8 9 l-8 9 l-8 -9 z" />
        <path d="M500 3 l10 12 l-10 12 l-10 -12 z" />
        <path d="M600 6 l8 9 l-8 9 l-8 -9 z" />
        <path d="M740 6 l8 9 l-8 9 l-8 -9 z" />
        <path d="M880 6 l8 9 l-8 9 l-8 -9 z" />
      </g>
    </svg>
  );
}

export function Divisor({ className }: { className?: string }) {
  return (
    <svg className={`rule ${className ?? ""}`} viewBox="0 0 1000 14" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 7 H440 M560 7 H1000" stroke="currentColor" strokeWidth="1.4" />
      <path d="M500 0 l8 7 l-8 7 l-8 -7 z" fill="currentColor" />
    </svg>
  );
}

export function Grain() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  );
}

/** Pequenos motivos (losango/flecha/fumaça) usados como acentos pontuais. */
export function Motivo({
  tipo,
  size = 64,
  className,
}: {
  tipo: "losango" | "flecha" | "fumaca";
  size?: number;
  className?: string;
}) {
  const common = { viewBox: "0 0 96 96", width: size, height: size, "aria-hidden": true, className };
  if (tipo === "losango")
    return (
      <svg {...common}>
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
          <path d="M48 12 L84 48 L48 84 L12 48 Z" />
          <path d="M48 30 L66 48 L48 66 L30 48 Z" fill="currentColor" />
        </g>
      </svg>
    );
  if (tipo === "flecha")
    return (
      <svg {...common}>
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 48 L82 48" />
          <path d="M70 36 L84 48 L70 60" />
          <path d="M22 38 L30 48 L22 58" />
        </g>
      </svg>
    );
  return (
    <svg {...common}>
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <path d="M48 86 q-14 -16 2 -30 q16 -14 2 -30 q-12 -12 4 -24" />
      </g>
    </svg>
  );
}
