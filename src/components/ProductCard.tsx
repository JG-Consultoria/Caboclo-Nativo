import Link from "next/link";
import type { Produto } from "@/lib/types";
import { formatarPreco, iconeCategoria } from "@/lib/products";
import Icone from "./Icone";

export default function ProductCard({ produto }: { produto: Produto }) {
  const esgotado = produto.estoque <= 0;
  return (
    <Link
      href={`/produto/${produto.slug}`}
      className="surface produto-card"
      style={{ display: "block", textDecoration: "none", color: "inherit", position: "relative" }}
    >
      {/* imagem ou placeholder com emblema */}
      <div
        style={{
          aspectRatio: "4 / 5",
          background: "var(--carvao)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {produto.imagem ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={produto.imagem} alt={produto.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Icone nome={iconeCategoria(produto.categoria)} variante="selo" size={104} color="rgba(217,169,91,.42)" />)}

        {produto.pecaUnica && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              fontFamily: "var(--lap-sc)",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontSize: ".56rem",
              color: "var(--carvao)",
              background: "var(--ocre)",
              padding: ".3em .7em",
            }}
          >
            Peça única
          </span>
        )}
        {esgotado && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(36,31,27,.55)",
              color: "var(--osso)",
              fontFamily: "var(--lap-sc)",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              fontSize: ".7rem",
            }}
          >
            Esgotado
          </span>
        )}
      </div>

      <div style={{ padding: "1.1rem 1.2rem 1.4rem" }}>
        <h3 className="produto-nome" style={{ fontSize: "1.9rem", marginBottom: ".2rem" }}>
          {produto.nome}
        </h3>
        <p style={{ fontSize: ".95rem", color: "var(--tinta-suave)", margin: "0 0 .9rem", lineHeight: 1.5 }}>
          {produto.resumo}
        </p>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--lap)", fontSize: "1.25rem", color: "var(--barro)" }}>
            {formatarPreco(produto.precoCentavos)}
          </span>
          <span
            style={{
              fontFamily: "var(--lap-sc)",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontSize: ".6rem",
              color: "var(--tinta-suave)",
            }}
          >
            Ver peça →
          </span>
        </div>
      </div>
    </Link>
  );
}
