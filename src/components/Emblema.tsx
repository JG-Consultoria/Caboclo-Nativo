/**
 * Emblema oficial do Caboclo Nativo.
 * Selo (proteção) · cachimbo (objeto de poder) · fumaça (oração) · losangos (terra).
 * A cor vem de `color` (currentColor). Em fundo escuro use var(--ouro);
 * em fundo claro var(--barro) ou var(--carvao).
 */
export default function Emblema({
  size = 200,
  color,
  className,
  title = "Caboclo Nativo",
}: {
  size?: number;
  color?: string;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
      style={color ? { color } : undefined}
    >
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <g stroke="currentColor" strokeWidth="2" opacity="0.7">
        <line x1="100" y1="18" x2="100" y2="28" />
        <line x1="100" y1="172" x2="100" y2="182" />
        <line x1="18" y1="100" x2="28" y2="100" />
        <line x1="172" y1="100" x2="182" y2="100" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44 124 L150 118" />
        <path d="M137 121 L140 92 Q150 85 160 92 L157 120" />
      </g>
      <circle cx="44" cy="124" r="4.6" fill="currentColor" />
      <path d="M150 84 q-10 -10 1 -20 q10 -9 0 -19" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" opacity="0.9" />
      <path d="M90 138 l5 6 l-5 6 l-5 -6 z" fill="currentColor" opacity="0.8" />
      <path d="M110 138 l4.5 5.5 l-4.5 5.5 l-4.5 -5.5 z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
