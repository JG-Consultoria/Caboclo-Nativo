"use client";

import Link from "next/link";
import Emblema from "@/components/Emblema";
import { useCart } from "@/lib/cart";
import { formatarPreco } from "@/lib/products";

export default function CarrinhoPage() {
  const { itens, totalCentavos, alterarQtd, remover } = useCart();

  if (itens.length === 0) {
    return (
      <section className="wrap" style={{ minHeight: "60vh", textAlign: "center", paddingTop: "5rem" }}>
        <Emblema size={90} color="rgba(156,74,46,.4)" />
        <h1 className="title" style={{ marginTop: "1.5rem" }}>Seu carrinho está vazio</h1>
        <p className="lead" style={{ margin: "0 auto 2rem" }}>Ainda não há peças aqui. Que tal começar pelo catálogo?</p>
        <Link href="/catalogo" className="btn">Ver o catálogo</Link>
      </section>
    );
  }

  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <span className="sec-num">Carrinho</span>
      <h1 className="title">Suas peças</h1>

      <div className="carrinho-layout" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "2.5rem", marginTop: "2rem" }}>
        <div>
          {itens.map((i) => (
            <div
              key={i.produtoId}
              style={{
                display: "grid",
                gridTemplateColumns: "84px 1fr auto",
                gap: "1.2rem",
                alignItems: "center",
                padding: "1.2rem 0",
                borderTop: "1px solid rgba(43,38,32,.14)",
              }}
            >
              <Link href={`/produto/${i.slug}`} style={{ aspectRatio: "1", background: "var(--carvao)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Emblema size={44} color="rgba(217,169,91,.4)" />
              </Link>
              <div>
                <Link href={`/produto/${i.slug}`} className="produto-nome" style={{ fontSize: "1.6rem", display: "block" }}>
                  {i.nome}
                </Link>
                <span style={{ color: "var(--barro)", fontFamily: "var(--lap)" }}>{formatarPreco(i.precoCentavos)}</span>
                <button
                  onClick={() => remover(i.produtoId)}
                  style={{ display: "block", marginTop: ".4rem", background: "none", border: "none", cursor: "pointer", color: "var(--tinta-suave)", fontSize: ".82rem", padding: 0, textDecoration: "underline" }}
                >
                  remover
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(43,38,32,.22)" }}>
                  <button onClick={() => alterarQtd(i.produtoId, i.quantidade - 1)} style={qtdBtn} aria-label="Diminuir">−</button>
                  <span style={{ minWidth: 36, textAlign: "center", fontFamily: "var(--lap)" }}>{i.quantidade}</span>
                  <button onClick={() => alterarQtd(i.produtoId, i.quantidade + 1)} style={qtdBtn} aria-label="Aumentar">+</button>
                </div>
                <span style={{ fontFamily: "var(--lap)", minWidth: 90, textAlign: "right" }}>
                  {formatarPreco(i.precoCentavos * i.quantidade)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* resumo */}
        <aside className="surface" style={{ padding: "1.8rem", alignSelf: "start", position: "sticky", top: "calc(var(--header-h) + 1rem)" }}>
          <h2 style={{ fontFamily: "var(--lap)", fontSize: "1.4rem", marginBottom: "1.2rem" }}>Resumo</h2>
          <Linha rotulo="Subtotal" valor={formatarPreco(totalCentavos)} />
          <Linha rotulo="Frete" valor="calculado no checkout" suave />
          <div style={{ borderTop: "1px solid rgba(43,38,32,.18)", margin: "1rem 0", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--lap-sc)", letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".74rem" }}>Total</span>
            <strong style={{ fontFamily: "var(--lap)", fontSize: "1.5rem", color: "var(--barro)" }}>{formatarPreco(totalCentavos)}</strong>
          </div>
          <Link href="/checkout" className="btn" style={{ width: "100%", justifyContent: "center" }}>
            Finalizar compra
          </Link>
          <Link href="/catalogo" style={{ display: "block", textAlign: "center", marginTop: "1rem", fontSize: ".85rem", color: "var(--tinta-suave)", textDecoration: "underline" }}>
            continuar comprando
          </Link>
        </aside>
      </div>
    </section>
  );
}

function Linha({ rotulo, valor, suave }: { rotulo: string; valor: string; suave?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: ".4rem 0", color: suave ? "var(--tinta-suave)" : "var(--tinta)", fontSize: suave ? ".9rem" : "1rem" }}>
      <span>{rotulo}</span>
      <span>{valor}</span>
    </div>
  );
}

const qtdBtn: React.CSSProperties = {
  width: 34, height: 34, background: "transparent", border: "none",
  cursor: "pointer", fontSize: "1.1rem", color: "var(--barro)", fontFamily: "var(--lap)",
};
