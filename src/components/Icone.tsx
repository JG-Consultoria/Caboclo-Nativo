/**
 * Ícones da marca Caboclo Nativo — linha gravada dentro (ou não) do selo.
 * Todos usam currentColor: a cor vem do `color` do elemento pai.
 *   fundo escuro  → var(--ouro)
 *   fundo claro   → var(--barro) ou var(--carvao)
 *
 * variante "selo" = com o anel de proteção · "linha" = só o desenho.
 */

export type MotivoNome =
  | "caboclo"
  | "cachimbo"
  | "perereca"
  | "jiboia"
  | "abanico"
  | "cesto"
  | "pantera"
  | "oca";

const DESENHOS: Record<MotivoNome, JSX.Element> = {
  cachimbo: (
    <g fill="none" stroke="currentColor" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M46 102 L150 96" />
      <path d="M137 99 L140 74 Q149 67 158 74 L155 98" />
      <circle cx="46" cy="102" r="4.6" fill="currentColor" stroke="none" />
      <path d="M96 98 l-2 8" strokeWidth="2.6" />
      <path d="M103 98 l-2 8" strokeWidth="2.6" />
      <path d="M97 104 C 84 116, 84 138, 93 148 C 102 138, 102 116, 97 104 Z" strokeWidth="2.8" />
      <path d="M93 146 L97 110" strokeWidth="1.8" />
      <path d="M115 100 C 105 110, 105 130, 113 138 C 121 130, 121 110, 115 100 Z" strokeWidth="2.8" />
      <path d="M113 136 L116 106" strokeWidth="1.8" />
    </g>
  ),
  perereca: (
    <g fill="none" stroke="currentColor" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="80" cy="72" r="12" />
      <circle cx="120" cy="72" r="12" />
      <circle cx="80" cy="73" r="3.4" fill="currentColor" stroke="none" />
      <circle cx="120" cy="73" r="3.4" fill="currentColor" stroke="none" />
      <path d="M69 78 Q57 110 80 130 Q100 142 120 130 Q143 110 131 78" />
      <path d="M85 114 Q100 126 115 114" strokeWidth="3" />
      <path d="M82 130 l-8 11 M82 130 l-1 13 M82 130 l7 12" strokeWidth="3" />
      <path d="M118 130 l8 11 M118 130 l1 13 M118 130 l-7 12" strokeWidth="3" />
    </g>
  ),
  jiboia: (
    <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M68 144 C 40 124, 96 118, 84 96 C 74 78, 122 76, 106 56" />
      <path d="M106 56 q11 -5 16 4 q3 7 -4 11" strokeWidth="3.4" />
      <path d="M120 52 l8 -6 M120 52 l9 -1 M120 52 l5 5" strokeWidth="2.4" />
      <circle cx="111" cy="62" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="78" cy="128" r="3" fill="currentColor" stroke="none" />
      <circle cx="90" cy="106" r="3" fill="currentColor" stroke="none" />
      <circle cx="93" cy="84" r="3" fill="currentColor" stroke="none" />
    </g>
  ),
  abanico: (
    <g fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M100 152 L100 130" />
      <path d="M89 132 q11 -7 22 0" strokeWidth="3" />
      <path d="M89 139 q11 -7 22 0" strokeWidth="3" />
      <path d="M100 130 L100 58" />
      <circle cx="100" cy="58" r="7.5" strokeWidth="3" />
      <circle cx="100" cy="58" r="2.6" fill="currentColor" stroke="none" />
      <path d="M100 130 Q86 98 74 64" />
      <path d="M100 132 Q78 110 60 88" />
      <path d="M100 130 Q114 98 126 64" />
      <path d="M100 132 Q122 110 140 88" />
    </g>
  ),
  cesto: (
    <g fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M112 104 C 104 88, 108 68, 117 58 C 126 68, 124 88, 117 104" strokeWidth="2.8" />
      <path d="M117 104 L117 62" strokeWidth="1.8" />
      <path d="M86 104 L80 64" strokeWidth="3" />
      <circle cx="80" cy="59" r="7.5" strokeWidth="3" />
      <path d="M100 104 L101 70" strokeWidth="3" />
      <path d="M58 110 Q100 100 142 110" />
      <path d="M58 110 Q100 120 142 110" strokeWidth="2.4" opacity="0.55" />
      <path d="M63 112 L73 150 Q100 158 127 150 L137 112" />
      <path d="M82 116 L86 150 M100 117 L100 154 M118 116 L114 150" strokeWidth="2" opacity="0.7" />
      <path d="M67 126 Q100 134 133 126 M71 140 Q100 147 129 140" strokeWidth="2" opacity="0.7" />
    </g>
  ),
  pantera: (
    <g fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M74 64 Q66 42 86 52" />
      <path d="M126 64 Q134 42 114 52" />
      <path d="M72 62 Q58 92 82 118 Q100 134 118 118 Q142 92 128 62" />
      <path d="M100 62 l5.5 7 l-5.5 7 l-5.5 -7 z" strokeWidth="2.6" />
      <path d="M77 88 Q86 81 95 88 Q86 94 77 88 Z" strokeWidth="2.8" />
      <path d="M105 88 Q114 81 123 88 Q114 94 105 88 Z" strokeWidth="2.8" />
      <circle cx="86" cy="88" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="114" cy="88" r="1.7" fill="currentColor" stroke="none" />
      <path d="M93 104 L107 104 L100 112 Z" strokeWidth="2.8" />
      <path d="M100 112 L100 120 M100 120 Q90 124 84 117 M100 120 Q110 124 116 117" strokeWidth="2.8" />
    </g>
  ),
  oca: (
    <g fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M56 150 L144 150" strokeWidth="2.6" />
      <path d="M62 126 L100 70 L138 126" />
      <path d="M100 70 L100 126 M82 100 L82 126 M118 100 L118 126" strokeWidth="2" opacity="0.7" />
      <path d="M73 112 L127 112 M68 126 L132 126" strokeWidth="2" opacity="0.55" />
      <path d="M73 126 L73 150 M127 126 L127 150" />
      <path d="M90 150 L90 132 Q100 125 110 132 L110 150" strokeWidth="3" />
      <path d="M100 68 q-9 -10 1 -19 q9 -8 0 -17" strokeWidth="2.6" opacity="0.85" />
    </g>
  ),
  caboclo: (
    <g transform="translate(4,6)" fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M88 66 C 98 67, 100 78, 96 86 L110 99 L96 103 Q101 108 95 113 Q98 119 96 123 Q95 131 84 132" />
      <path d="M88 66 C 73 68, 69 94, 72 112 C 74 125, 78 131, 84 132" />
      <circle cx="92" cy="88" r="2.3" fill="currentColor" stroke="none" />
      <path d="M80 74 L98 80" strokeWidth="3" />
      <circle cx="89" cy="77" r="1.9" fill="currentColor" stroke="none" />
      <path d="M82 68 Q75 48 74 32" strokeWidth="3" />
      <path d="M74 32 q-4 5 -1 11 q5 -3 4 -10" strokeWidth="2" />
      <path d="M88 64 Q85 46 86 28" strokeWidth="3" />
      <path d="M86 28 q-4 5 -1 11 q5 -3 3 -10" strokeWidth="2" />
      <path d="M94 64 Q95 46 101 31" strokeWidth="3" />
      <path d="M101 31 q1 6 5 9 q3 -5 -1 -11" strokeWidth="2" />
      <path d="M82 99 l6 3 M82 105 l6 -3" strokeWidth="2" />
    </g>
  ),
};

/** Anel de proteção (idêntico ao emblema da marca). */
function Selo() {
  return (
    <>
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <g stroke="currentColor" strokeWidth="2" opacity="0.65">
        <line x1="100" y1="16" x2="100" y2="26" />
        <line x1="100" y1="174" x2="100" y2="184" />
        <line x1="16" y1="100" x2="26" y2="100" />
        <line x1="174" y1="100" x2="184" y2="100" />
      </g>
    </>
  );
}

export default function Icone({
  nome,
  variante = "selo",
  size = 64,
  color,
  className,
  titulo,
}: {
  nome: MotivoNome;
  variante?: "selo" | "linha";
  size?: number;
  color?: string;
  className?: string;
  titulo?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={titulo ?? `${nome} — Caboclo Nativo`}
      className={className}
      style={color ? { color } : undefined}
    >
      {variante === "selo" && <Selo />}
      {DESENHOS[nome]}
    </svg>
  );
}
