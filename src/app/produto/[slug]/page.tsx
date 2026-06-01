import Link from "next/link";
import { notFound } from "next/navigation";
import Icone from "@/components/Icone";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import { Divisor } from "@/components/Grafismos";
import {
  PRODUTOS,
  buscarProdutoPorSlug,
  formatarPreco,
  iconeCategoria,
  nomeCategoria,
} from "@/lib/products";

export function generateStaticParams() {
  return PRODUTOS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = buscarProdutoPorSlug(params.slug);
  return { title: p ? `${p.nome} · Caboclo Nativo` : "Peça · Caboclo Nativo" };
}

export default function ProdutoPage({ params }: { params: { slug: string } }) {
  const produto = buscarProdutoPorSlug(params.slug);
  if (!produto) notFound();

  const relacionados = PRODUTOS.filter(
    (p) => p.categoria === produto.categoria && p.id !== produto.id
  ).slice(0, 3);

  return (
    <>
      <section className="wrap" style={{ paddingTop: "2.5rem" }}>
        <nav style={{ fontSize: ".82rem", color: "var(--tinta-suave)", marginBottom: "2rem" }}>
          <Link href="/catalogo">Catálogo</Link>
          <span style={{ margin: "0 .5em", color: "var(--ocre)" }}>·</span>
          <Link href={`/catalogo?categoria=${produto.categoria}`}>{nomeCategoria(produto.categoria)}</Link>
        </nav>

        <div
          className="produto-detalhe"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}
        >
          {/* imagem */}
          <div
            style={{
              aspectRatio: "4 / 5",
              background: "var(--carvao)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {produto.imagem ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={produto.imagem} alt={produto.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Icone nome={iconeCategoria(produto.categoria)} variante="selo" size={170} color="rgba(217,169,91,.42)" />
            )}
            {produto.pecaUnica && (
              <span
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  fontFamily: "var(--lap-sc)",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  fontSize: ".58rem",
                  color: "var(--carvao)",
                  background: "var(--ocre)",
                  padding: ".35em .8em",
                }}
              >
                Peça única
              </span>
            )}
          </div>

          {/* infos */}
          <div>
            <h1 className="produto-nome" style={{ fontSize: "clamp(2.6rem,6vw,3.8rem)", marginBottom: ".4rem" }}>
              {produto.nome}
            </h1>
            <p style={{ fontFamily: "var(--lap)", fontSize: "1.7rem", color: "var(--barro)", margin: "0 0 1.6rem" }}>
              {formatarPreco(produto.precoCentavos)}
            </p>
            <p style={{ fontSize: "1.12rem", color: "var(--tinta)", lineHeight: 1.6, marginBottom: "1.8rem" }}>
              {produto.descricao}
            </p>

            <AddToCart produto={produto} />

            <Divisor className="" />

            <dl style={{ margin: 0 }}>
              {produto.ficha.map((f) => (
                <div
                  key={f.rotulo}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    padding: ".7rem 0",
                    borderTop: "1px solid rgba(43,38,32,.14)",
                  }}
                >
                  <dt style={{ fontFamily: "var(--lap-sc)", letterSpacing: ".18em", textTransform: "uppercase", fontSize: ".66rem", color: "var(--barro)" }}>
                    {f.rotulo}
                  </dt>
                  <dd style={{ margin: 0, color: "var(--tinta)" }}>{f.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="wrap" style={{ paddingTop: "1rem" }}>
          <p className="kicker">Da mesma família</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1.4rem",
              marginTop: "1.5rem",
            }}
          >
            {relacionados.map((p) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
