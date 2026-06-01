import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { FaixaLosangos } from "@/components/Grafismos";
import { CATEGORIAS, listarProdutos, nomeCategoria } from "@/lib/products";

export const metadata = { title: "Catálogo · Caboclo Nativo" };

export default function CatalogoPage({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
  const ativa = searchParams.categoria ?? "todos";
  const produtos = listarProdutos(ativa);

  const filtros = [{ slug: "todos", nome: "Todos" }, ...CATEGORIAS];

  return (
    <section className="wrap" style={{ paddingTop: "3.5rem" }}>
      <span className="sec-num">Catálogo</span>
      <h1 className="title">
        {ativa === "todos" ? "Todas as peças" : nomeCategoria(ativa)}
      </h1>
      <p className="lead">
        {ativa === "todos"
          ? "Cada item é feito à mão. Peças marcadas como únicas não se repetem."
          : CATEGORIAS.find((c) => c.slug === ativa)?.descricao}
      </p>

      {/* filtros */}
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".6rem",
          margin: "2.2rem 0 2.6rem",
        }}
      >
        {filtros.map((f) => {
          const ativo = f.slug === ativa;
          return (
            <Link
              key={f.slug}
              href={f.slug === "todos" ? "/catalogo" : `/catalogo?categoria=${f.slug}`}
              style={{
                fontFamily: "var(--lap-sc)",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                fontSize: ".68rem",
                padding: ".6em 1.1em",
                border: `1px solid ${ativo ? "var(--barro)" : "rgba(43,38,32,.22)"}`,
                background: ativo ? "var(--barro)" : "transparent",
                color: ativo ? "var(--osso)" : "var(--tinta-suave)",
              }}
            >
              {f.nome}
            </Link>
          );
        })}
      </nav>

      {produtos.length === 0 ? (
        <p style={{ color: "var(--tinta-suave)" }}>Nenhuma peça nesta categoria por enquanto.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.4rem",
          }}
        >
          {produtos.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      )}

      <div style={{ marginTop: "4rem", color: "var(--ocre)" }}>
        <FaixaLosangos className="band" />
      </div>
    </section>
  );
}
